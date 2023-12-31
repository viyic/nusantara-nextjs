"use client";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
    </main>
  );
}
