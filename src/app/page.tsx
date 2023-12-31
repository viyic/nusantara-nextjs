"use client";

import { API_URL } from "@/utils/env";
import axios from "axios";
import { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Home() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div></div>
      {/* <div>Selamat datang! Silakan log in.</div> */}
      <div className="card w-full max-w-[22rem] flex flex-col gap-8">
        <div className="font-bold text-xl text-center">
          {showLoginForm ? "Masuk Akun" : "Buat Akun"}
        </div>

        <div className={showLoginForm ? "" : "hidden"}>
          <Login />
        </div>
        <div className={showLoginForm ? "hidden" : ""}>
          <Signup />
        </div>
        {/* {showLoginForm ? <Login /> : <Signup />} */}

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
  type formType = {
    email: string;
    password: string;
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    ...form
  } = useForm<formType>();

  const onSubmit: SubmitHandler<formType> = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.status == 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const onSubmitError: SubmitErrorHandler<formType> = (errors) => {
    if (errors.email) {
      toast.error("Surel tidak valid");
      return;
    }

    if (errors.password) {
      toast.error("Kata sandi tidak valid");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <div className="flex flex-col gap-4">
        <input
          type="email"
          {...register("email", { required: true })}
          aria-invalid={!!errors.email}
          className={`input`}
          placeholder="Surel"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          aria-invalid={!!errors.password}
          className={`input`}
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
  type formType = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    ...form
  } = useForm<formType>();

  const onSubmit: SubmitHandler<formType> = async (data) => {
    if (data.password != data.password_confirmation) {
      toast.error("Kata sandi konfirmasi tidak sesuai");
      return;
    }
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.status == 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const onSubmitError: SubmitErrorHandler<formType> = (errors) => {
    if (errors.name) {
      toast.error("Nama tidak valid");
      return;
    }

    if (errors.email) {
      toast.error("Surel tidak valid");
      return;
    }

    if (errors.password) {
      toast.error("Kata sandi tidak valid");
      return;
    }

    if (errors.password_confirmation) {
      toast.error("Kata sandi konfirmasi tidak valid");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          {...register("name", { required: true })}
          className="input"
          placeholder="Nama"
        />
        <input
          type="text"
          {...register("email", { required: true })}
          className="input"
          placeholder="Surel"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          className="input"
          placeholder="Kata Sandi"
        />
        <input
          type="password"
          {...register("password_confirmation", { required: true })}
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
