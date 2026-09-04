"use client";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUser();

  const handleLogin = () => {
    setUser({ email, password });
    router.push("/");
  };
  return (
    <main className="grid grid-cols-2 gap-4 md:gap-8 h-screen overflow-hidden">
      <div className="w-full h-screen relative">
        <Image
          src="/images/login.jpeg"
          alt=""
          priority
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute bottom-35 left-6 md:left-12 flex flex-col gap-3">
          <h1 className="text-black text-3xl md:text-5xl font-heading font-extrabold">
            VAL
          </h1>
          <p className="text-black">Style begins with a single choice.</p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-8 pt-40 ">
        <p className="text-gray-dark text-lg ">SIGN IN</p>
        <form
          action=""
          className="flex flex-col gap-5 md:w-lg"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS"
            className="text-gray-dark text-sm  md:text-lg border-b border-gray-light"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className="text-gray-dark text-sm md:text-lg border-b border-gray-light"
          />
          <button
            type="submit"
            className="text-sm md:text-lg py-2 text-white bg-black cursor-pointer"
            onClick={handleLogin}
          >
            SIGN IN
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signin;
