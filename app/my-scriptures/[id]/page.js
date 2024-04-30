"use client"

import { MenuIcon } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { db } from "@/firebaseConfig";
import axios from "axios";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { Disc3, Lightbulb, Save } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyScripture() {
    const pathname = usePathname()
    const [ title, setTitle ] = useState()
    const [ body, setBody ] = useState()
    const date = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    const insertRandomPrompt = () => {
        setTyped(false);
        const random = Math.floor(Math.random() * categoryFilteredPrompts.length);
        const randomPrompt = categoryFilteredPrompts.find(
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
      const [user, setUser] = useState();
      useEffect(() => {
        const getUser = async () => {
          const response = await axios.get("/api/user");
          setUser(response.data.data);
        };
        getUser();
      }, []);
    return (
        <>
        <Header />
        <button onClick={() => console.log(user)}>test</button>
        <div className="relative text-brown">
          <Image
            priority
            src={""}
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
        <div className="flex flex-col mt-10 mx-[16px] md:mx-[48px] lg:mx-[20%] text-brown">
          <span className="opacity-50 font-spicy-rice">{date}</span>
          <form id="entry" onSubmit={() => {}} className="w-full h-screen mb-4">
            <input
              value={title}
              onChange={() => {}}
              name="title"
              type="text"
              placeholder="What's on your mind today?"
              className="font-spicy-rice text-[32px] md:text-[48px] lg:text-[64px] bg-transparent outline-none placeholder:text-brown/30 w-full"
            />
            <textarea
              onChange={(e) => setBody(e.target.value)}
              placeholder="Play some ambient sounds and just let your mind wander. Feeling Stuck? Hit the button to generate a prompt..."
              className="resize-none bg-transparent outline-none h-full placeholder:text-brown/30 w-full"
            />
          </form>
        </div>
        </>
    )
}