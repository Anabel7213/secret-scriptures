"use client";

import { useRouter } from "next/navigation";
import Button, { SubtleButton } from "../ui/button";

export default function Auth() {
  const router = useRouter()
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const buttons = [
    {
      cta: "Sign up",
      onClick: () => router.push("/auth/signup"),
      bg: "bg-beige",
    },
    {
      cta: "Log in",
      onClick: () => router.push("/auth/login"),
      bg: "bg-lightBrown",
    },
    // {
    //   cta: "Sign up w/ Google",
    //   onClick: () => {},
    //   bg: "bg-lightBrown",
    // },
  ];
  return (
    <>
      <div className="flex flex-col gap-4 items-center text-brown">
        <span>{date}</span>
        <h1 className="text-[48px] font-spicy-rice text-center capitalize">
          My secret <br /> scriptures.
        </h1>
        {buttons.map((button, i) => (
          <Button
            key={i}
            cta={button.cta}
            onClick={button.onClick}
            bg={button.bg}
          />
        ))}
        {/* <SubtleButton onClick={() => router.push("/login")} cta="Log in" /> */}
      </div>
    </>
  );
}
