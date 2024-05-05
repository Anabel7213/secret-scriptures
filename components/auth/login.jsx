"use client"

import { useState } from "react";
import InputField from "../ui/input";
import Button, { SubtleButton } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const router = useRouter()
  const [ isLoading, setLoading ] = useState(false)
  const [ user, setUser ] = useState({
    email: "",
    password: ""
  })
  const formFields = [
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
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("/api/login", user)
      if(response.status === 200) {
        toast.success("Welcome back!", {
          style: {
            border: '1px solid #8D674F',
            padding: '16px',
            color: '#8D674F',
            backgroundColor: "#F0D0B7"
          },
          iconTheme: {
            primary: '#8D674F',
            secondary: '#F0D0B7',
          }})
        setTimeout(() => router.push("/"), 1000)
      } else {
        toast.error("Try again!", {
          style: {
            border: '1px solid #8D674F',
            padding: '16px',
            color: '#8D674F',
            backgroundColor: "#F0D0B7"
          },
          iconTheme: {
            primary: '#8D674F',
            secondary: '#F0D0B7',
          }})
      }
    } catch(err) {
      console.error("Error logging in:" + err)
      toast.error("Wrong password or email!", {
        style: {
          border: '1px solid #8D674F',
          padding: '16px',
          color: '#8D674F',
          backgroundColor: "#F0D0B7"
        },
        iconTheme: {
          primary: '#8D674F',
          secondary: '#F0D0B7',
        }})
    } finally {
      setLoading(false)
    }
  };
  return (
    <>
      <div className="text-brown flex flex-col gap-4 w-full md:w-fit px-4">
        <h1 className="text-[48px] font-spicy-rice text-center">
          Welcome <br /> back, mate!
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {formFields.map((field, i) => (
            <InputField
              key={i}
              name={field.name}
              type={field.type}
              onChange={handleOnChange}
              placeholder={field.placeholder}
            />
          ))}
          <Button type="submit" cta={isLoading ? "Logging in..." : "Log in"} bg="bg-beige" />
        </form>
        <SubtleButton cta="Go back" onClick={() => router.push("/auth")} />
      </div>
    </>
  );
}