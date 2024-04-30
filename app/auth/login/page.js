import Login from "@/components/auth/login";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center bg-[url('/cover.webp')] bg-no-repeat bg-cover">
        <Login />
      </div>
    </>
  );
}
