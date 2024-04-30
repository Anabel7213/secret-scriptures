"use client";

import Header from "@/components/ui/header";
import { db } from "@/firebaseConfig";
import axios from "axios";
import { collection, deleteDoc, doc, getDocs, where } from "firebase/firestore";
import { BookOpen, Eraser } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyScriptures() {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("/api/user");
      setUser(response.data.data);
    };
    getUser();
  }, []);
  const [entries, setEntries] = useState();
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "entries"), where("user", "==", user?.id))
        const entries = querySnapshot.docs.map((doc) => ({
            ...doc.data()
        }))
        setEntries(entries)
      } catch (err) {
        console.log(err);
      }
    };
    fetchEntries()
  }, [user?.id]);
  const router = useRouter()
  const handleDeleteEntry = async (id) => {
    try {
        await deleteDoc(doc(db, "entries", id))
        console.log(id)
        toast.success("Deleted!", {
            style: {
              border: "1px solid #8D674F",
              padding: "16px",
              color: "#8D674F",
              backgroundColor: "#F0D0B7",
            },
            iconTheme: {
              primary: "#8D674F",
              secondary: "#F0D0B7",
            },
          });
        console.log("Document successfully deleted")
    } catch(err) {
        console.log("Failed to delete document", err)
    }
  }
  return (
    <>
      <div className="text-brown">
        <Header />
        <div className="inset-0 flex flex-col gap-4 justify-center md:items-center h-screen mx-4">
          <h1 className="text-[48px] font-spicy-rice md:text-center">
            My Scriptures
          </h1>
          <div className="flex gap-4 flex-wrap">
          {entries?.map((entry) => (
            <div key={entry.id} className="flex flex-col w-full md:w-[324px]">
                <Image priority src={`/${entry.pathname}.webp`} alt="Cover image" width={324} height={200} className="w-full h-[124px] object-cover rounded-t-[16px] border border-brown"/>
                <div className="border p-4 rounded-b-[16px] border-brown">
                    <h1 className="text-lg">{entry.title}</h1>
                    <div className="flex justify-between gap-4">
                        <span className="text-sm text-brown/50">{entry.date}</span>
                        <div className="flex gap-2">
                            <button onClick={() => router.push(`/new-scripture/${entry.pathname}/${entry.id}`)}><BookOpen /></button>
                            <button onClick={() => handleDeleteEntry(entry.id)}><Eraser /></button>
                        </div>
                    </div>
                </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
