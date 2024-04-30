"use client";

import Button from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Brain, LocateFixed, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid"

export default function Home() {
  const buttons = [
    {
      id: "contemplate",
      cta: "Contemplate",
      onClick: () => {},
      bg: "bg-beige",
      icon: <Brain />,
    },
    {
      id: "reflect",
      cta: "Reflect",
      onClick: () => {},
      bg: "bg-lightBrown",
      icon: <PencilLine />,
    },
    {
      id: "explore",
      cta: "Explore",
      onClick: () => {},
      bg: "bg-peachy",
      icon: <LocateFixed />,
    },
  ];
  const router = useRouter();
  const [ user, setUser ] = useState()
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("/api/user")
      setUser(response.data.data)
    }
    getUser()
  }, [])
  return (
    <>
      {/* <button onClick={() => console.log(user.name)}>test</button> */}
      <div className="flex h-screen flex-col bg-[url('/home-cover.webp')] bg-no-repeat bg-cover">
        <Header />
        <div className="flex flex-col w-[364px] justify-center mx-auto h-screen gap-4 items-center text-brown">
          <span>Hello, {user?.name}</span>
          <h1 className="text-[48px] font-spicy-rice text-center">
            What would <br /> your like to do?
          </h1>
          {buttons.map((button, i) => (
            <Button
              position="justify-between"
              key={i}
              cta={button.cta}
              onClick={() => router.push(`/new-scripture/${button.id}/${uuid()}`)}
              bg={button.bg}
              icon={button.icon}
            />
          ))}
        </div>
      </div>
    </>
  );
}
