"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Hãy nhập đầy đủ email và mật khẩu !");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
  <div className="shadow-lg p-5 rounded-lg ">
    <div className="text-center">
      <img
        src="./logouneti.png"
        style={{
          width: "80px",
          height: "80px",
          flexShrink: 0,
          borderRadius: "51px",
          margin: "0 auto 60px",
          
        }}
      />
{/* 
      <h1 className="text-xl font-bold my-4">Đăng Nhập</h1> */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          style={{ marginBottom: "25px",
                    borderRadius:"10px",
            }} 
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          style={{ marginBottom: "25px",
          borderRadius:"10px", }} 
        />
        <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2" style={{
          borderRadius:"10px", }}  >
          Đăng Nhập
        </button>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}

        <Link className="text-sm mt-3 text-right" href={"/register"}>
          Bạn chưa có tài khoản ? <span className="underline">Đăng Kí</span>
        </Link>
      </form>
    </div>
  </div>
</div>
  );
}
