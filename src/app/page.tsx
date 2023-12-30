"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div></div>
      {/* <div>Selamat datang! Silakan log in.</div> */}
      <div className="card w-full max-w-[22rem] flex flex-col gap-8">
        <div className="font-bold text-xl text-center">
          {showLoginForm ? "Masuk Akun" : "Buat Akun"}
        </div>

        {showLoginForm ? <Login /> : <Signup />}

        <div
          onClick={() => setShowLoginForm(!showLoginForm)}
          className="text-center text-cyan-700 hover:[text-shadow:_0_2px_0_#cffafe] shadow-cyan-200 transition-all cursor-pointer"
        >
          {showLoginForm
            ? "Belum memiliki akun? Buat akun"
            : "Sudah memiliki akun? Masuk akun"}
        </div>
      </div>
      <div>PT Nusantara Infrastructure Tbk</div>
    </main>
  );
}

function Login() {
  return (
    <form>
      <div className="flex flex-col gap-4">
        <input type="text" name="email" className="input" placeholder="Surel" />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Kata Sandi"
        />
        <button type="submit" className="button">
          Masuk
        </button>
      </div>
    </form>
  );
}

function Signup() {
  return (
    <form>
      <div className="flex flex-col gap-4">
        <input type="text" name="name" className="input" placeholder="Nama" />
        <input type="text" name="email" className="input" placeholder="Surel" />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Kata Sandi"
        />
        <input
          type="password"
          name="password_confirmation"
          className="input"
          placeholder="Kata Sandi Konfirmasi"
        />
        <button type="submit" className="button">
          Buat
        </button>
      </div>
    </form>
  );
}
