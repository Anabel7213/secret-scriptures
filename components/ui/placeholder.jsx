"use client"

import { db } from "@/firebaseConfig";
import axios from "axios";
import { collection, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Placeholder() {
  const [ user, setUser ] = useState()
  const [ numberOfEntries, setNumberOfEntries ] = useState(0)
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await axios.get("/api/user")
      setUser(response.data.data)
      const querySnapshot = await getDocs(collection(db, "entries"), where("user", "==", user?.id))
      const entries = querySnapshot.docs.map((doc) => doc.data())
      setNumberOfEntries(entries.length)
    }
    fetchEntries()
  }, [])
  return (
    <>
      <div className="flex gap-4 flex-wrap">
      {[...Array(numberOfEntries)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4 w-full h-[236px] md:w-[324px] border border-brown rounded-[16px] p-4">
            <div className="h-[16px] animate-pulse bg-brown/20 w-[40%] rounded-full"></div>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[24px] animate-pulse bg-brown/20 w-full rounded-full"
              ></div>
            ))}
            <div className="h-[16px] animate-pulse bg-brown/20 w-[20%] rounded-full self-end"></div>
          </div>
      ))}
      </div>
    </>
  );
}
