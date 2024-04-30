"use client";
import { useState } from "react";
import Auth from "@/components/auth/auth";
export default function Authentication() {
  const [selectSignUpMethod, setSelectSignUpMethod] = useState(0);
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center bg-[url('/cover.webp')] bg-no-repeat bg-cover">
        <Auth setSelectSignUpMethod={setSelectSignUpMethod} />
      </div>
    </>
  );
}
