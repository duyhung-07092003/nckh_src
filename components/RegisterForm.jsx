"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Hãy nhập đầy đủ thông tin.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("Người dùng đã tồn tại.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("Đăng ký người dùng không thành công.");
      }
    } catch (error) {
      console.log("Lỗi khi đăng ký: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg ">
        {/* <h1 className="text-xl font-bold my-4">Register</h1> */}
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Họ Tên"
            style={{
              borderRadius:"10px", }}  
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            style={{
              borderRadius:"10px", }}  
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Mật khẩu"
            style={{
              borderRadius:"10px", }}  
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Đăng Kí
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Bạn đã có tài khoản ? <span className="underline">Đăng Nhập</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
