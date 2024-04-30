import { NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, name, email, password } = body;
    //look up if the entered email already exists in the db
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 400 }
      );
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user
    const createdUser = await addDoc(collection(db, "users"), {
      id: id,
      name: name,
      email: email,
      password: hashedPassword,
    });
    const newUserDoc = await getDoc(createdUser);
    console.log("User data:" + newUserDoc.data())
    if (newUserDoc.exists()) {
      return NextResponse.json(
        {
          message: "User created successfully",
          success: true,
          data: newUserDoc.data(),
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
