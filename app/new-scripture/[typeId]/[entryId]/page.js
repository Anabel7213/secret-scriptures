"use client";

import { prompts } from "@/public/prompts/prompts";
import { MenuIcon } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { db } from "@/firebaseConfig";
import axios from "axios";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Disc3, Lightbulb, Save } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NewEntry() {
  const pathname = usePathname();
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("/api/user");
      setUser(response.data.data);
    };
    getUser();
  }, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  //create or update
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user: user.id,
      uid: pathname.split("/")[3],
      pathname: pathname.split("/")[2],
      date: date,
      title: title,
      body: body,
    };
    try {
      const q = query(
        collection(db, "entries"),
        where("uid", "==", pathname.split("/")[3])
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(collection(db, "entries"), data);
        toast.success("Saved!", {
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
        console.log("Successfully added");
      } else {
        await updateDoc(querySnapshot.docs[0].ref, data);
        toast.success("Updated!", {
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
        console.log("Successfully updated");
      }
    } catch (err) {
      toast.error("Oops...Try again!", {
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
      console.log("Error saving the document:", err);
    }
  };
  const [isTyped, setTyped] = useState(true);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTyped(true);
  };
  const [currentEntry, setCurrentEntry] = useState(null);
  //fetch
  useEffect(() => {
    const fetchCurrentEntry = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "entries"),
            where("uid", "==", pathname.split("/")[3])
          )
        );

        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map((doc) => doc.data());
          setCurrentEntry(docs[0]);
        } else {
          console.log("Document does not exist");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };

    fetchCurrentEntry();
  }, [pathname]);
  const categoryFilteredPrompts = prompts?.filter(
    (prompt) => prompt.category === pathname.split("/")[2]
  );
  //generate a prompt
  const insertRandomPrompt = () => {
    setTyped(false);
    const random = Math.floor(Math.random() * categoryFilteredPrompts?.length);
    const randomPrompt = categoryFilteredPrompts?.find(
      (prompt) => prompt.id === random
    );
    if (!isTyped) {
      setTitle(randomPrompt?.prompt);
    }
  };
  const actionButtons = [
    {
      icon: <Disc3 />,
      onClick: () => {},
    },
    {
      icon: <Lightbulb />,
      onClick: insertRandomPrompt,
    },
    {
      icon: <Save />,
      type: "submit",
      form: "entry",
    },
  ];
  return (
    <>
      <div className="text-brown">
        <Header />
        <div className="relative">
          <Image
            priority
            src={`/${pathname.split("/")[2]}.webp`}
            alt="Cover"
            height={300}
            width={1900}
            className="border-b border-brown"
          />
          <div className="flex gap-4 absolute bottom-[-22px] left-[16px] md:left-[48px] lg:left-[20%]">
            {actionButtons.map((button, i) => (
              <MenuIcon
                form={button.form}
                type={button.type}
                key={i}
                onClick={button.onClick}
                icon={button.icon}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-10 mx-[16px] md:mx-[48px] lg:mx-[20%]">
          <span className="opacity-50 font-spicy-rice">{date}</span>
          <form id="entry" onSubmit={onSubmit} className="w-full h-screen mb-4">
            <input
              value={title || currentEntry?.title}
              onChange={handleTitleChange}
              name="title"
              type="text"
              placeholder="What's on your mind today?"
              className="font-spicy-rice text-[32px] md:text-[48px] lg:text-[64px] bg-transparent outline-none placeholder:text-brown/30 w-full"
            />
            <textarea
              value={body || currentEntry?.body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Play some ambient sounds and just let your mind wander. Feeling Stuck? Hit the button to generate a prompt..."
              className="resize-none bg-transparent outline-none h-full placeholder:text-brown/30 w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
}
