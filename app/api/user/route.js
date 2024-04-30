import { db } from "@/firebaseConfig";
import { getTokenData } from "@/helpers/getTokenData";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userID = await getTokenData(req);
    const userQuery = query(collection(db, "users"), where("id", "==", userID));
    const querySnapshot = await getDocs(userQuery);
    const userDocRef = querySnapshot.docs[0].ref;
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
    return NextResponse.json({ message: "User found", data: userData });
  } catch (err) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}