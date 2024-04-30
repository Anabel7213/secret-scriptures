import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/firebaseConfig";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    //check if the user exists
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery)
    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }
    const userDoc = querySnapshot.docs[0]
    //check if the passwords match
    const isValid = await bcrypt.compare(password, userDoc.data().password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    //create a JWT token
    const tokenData = {
      id: userDoc.data().id,
      name: userDoc.data().name,
      email: userDoc.data().email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "30d",
    });
    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
