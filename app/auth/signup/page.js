import SignUp from "@/components/auth/signup";

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center bg-[url('/cover.webp')] bg-no-repeat bg-cover">
        <SignUp />
      </div>
    </>
  );
}
