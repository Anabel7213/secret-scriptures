"use client";

import { useState } from "react";
import InputField from "../ui/input";
import Button, { SubtleButton } from "../ui/button";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: uuid(),
    name: "",
    email: "",
    password: "",
  });
  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name...",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email...",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password...",
    },
  ];
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/signup", user);
      if (response.status === 200) {
        console.log(response);
        toast.success("You're on board!", {
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
        setTimeout(() => router.push("/auth/login"), 1000);
      } else if (response.status === 400) {
        toast.error("User exists!", {
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
      } else {
        toast.error("Try again!", {
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
      }
    } catch (err) {
      console.log("Error signing up:" + err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 text-brown w-full md:w-fit px-4">
        <h1 className="text-[48px] font-spicy-rice text-center">
          Joining? Awesome!
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {formFields.map((field, i) => (
            <InputField
              key={i}
              name={field.name}
              type={field.type}
              onChange={handleOnChange}
              placeholder={field.placeholder}
              required="required"
            />
          ))}
          <Button
            cta={isLoading ? "Loading..." : "Sign up"}
            bg="bg-beige"
            type={"submit"}
          />
        </form>
        <SubtleButton cta="Go back" onClick={() => router.push("/auth")} />
      </div>
    </>
  );
}
