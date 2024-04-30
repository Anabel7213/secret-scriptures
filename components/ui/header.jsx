"use client";

import { useRouter } from "next/navigation";
import { MenuIcon } from "./button";
import { DoorOpen, Menu, NotebookText } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.status === 200) {
        toast.success("See you!", {
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
        setTimeout(() => router.push("/auth"), 1000);
      }
    } catch (err) {
      console.error("Error logging out:" + err);
    }
  };
  return (
    <>
      <div className="">
        <Image
          onClick={() => router.push("/")}
          src="/logo.svg"
          alt="Logo"
          width={64}
          height={64}
          className="absolute z-10 top-4 left-4 cursor-pointer"
        />
        <div className="absolute w-fit z-10 top-4 right-4 flex flex-col items-end gap-4 group">
          <div className="flex gap-4">
            <MenuIcon
              onClick={() => router.push("/my-scriptures")}
              icon={<NotebookText />}
              display="group-hover:block hidden"
            />
            <MenuIcon onClick={() => {}} icon={<Menu />} />
          </div>
          <MenuIcon
            onClick={handleLogout}
            icon={<DoorOpen />}
            display="group-hover:block hidden"
          />
        </div>
      </div>
    </>
  );
}