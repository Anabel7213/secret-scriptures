"use client";

import Header from "@/components/ui/header";
import Placeholder from "@/components/ui/placeholder";
import Popup from "@/components/ui/popup";
import { db } from "@/firebaseConfig";
import axios from "axios";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { BookOpen, Eraser } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyScriptures() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data.data);

        if (response.data.data) {
          const querySnapshot = await getDocs(
            query(
              collection(db, "entries"),
              where("user", "==", response.data.data.id)
            )
          );

          const entries = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          setEntries(entries);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const handleDeleteEntry = async (uid) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "entries"), where("uid", "==", uid))
      );
      if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(docToDelete.ref);
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
        console.log("Document deleted with uid:", uid);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        console.log("No document found with uid:", uid);
      }
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
  };
  return (
    <>
      <div className="text-brown">
        <Header />
        <div className="inset-0 flex flex-col gap-4 justify-center mx-4 my-16 pb-16">
          <h1 className="text-[48px] leading-none font-spicy-rice">My Scriptures</h1>
          {!entries.length > 0 && (
            <>
            <p className="opacity-50">Your journal entries will appear here.</p>
            <Placeholder />
            </>
          )}
          {isLoading ? (
            <Placeholder />
          ) : (
            <div className="flex gap-4 flex-wrap">
              {entries?.map((entry) => (
                <div
                  key={entry.uid}
                  className="flex flex-col w-full md:w-[324px]"
                >
                  <Image
                    priority
                    src={`/${entry.pathname}.webp`}
                    alt="Cover image"
                    width={324}
                    height={200}
                    className="w-full h-[124px] object-cover rounded-t-[16px] border border-brown"
                  />
                  <div className="border p-4 rounded-b-[16px] border-brown">
                    <h1 className="text-lg">
                      {entry.title.length > 24
                        ? entry.title.slice(0, 24) + "..."
                        : entry.title}
                    </h1>
                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-brown/50">
                        {entry.date}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/new-scripture/${entry.pathname}/${entry.uid}`
                            )
                          }
                        >
                          <BookOpen />
                        </button>
                        <button
                          onClick={() => (setOpen(true), setId(entry.uid))}
                        >
                          <Eraser />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {open && (
        <Popup
          onCancel={() => setOpen(false)}
          onConfirm={() => handleDeleteEntry(id)}
          onClose={() => setOpen(false)}
          title="Are you sure?"
          desc="Once you delete it it's gone forever."
        />
      )}
    </>
  );
}
