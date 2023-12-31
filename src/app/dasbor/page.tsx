"use client";
import NavBar from "@/components/NavBar";
import { API_URL } from "@/utils/env";
import { ArrowRight, CaretCircleRight } from "@phosphor-icons/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/books`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setBookCount(response.data.total);
        }
      })
      .catch((error) => {
        toast.error("Terjadi kendala saat mengambil data buku");
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <div className="container p-4">
        <div className="text-4xl font-bold text-cyan-900">Dasbor</div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3">
          <Link
            href="/buku"
            className="flex justify-between items-center card bg-cyan-600 text-slate-50"
          >
            <div className="flex flex-col">
              <div className="text-4xl font-semibold">{bookCount}</div>
              <div className="text-xl font-light">Total Buku</div>
            </div>
            <CaretCircleRight size={32} />
          </Link>
        </div>
        <div className="mt-4 card">
          <div className="text-2xl font-semibold">Buku Terbaru</div>
          <div className="mt-4 border-t">
            {bookCount > 0 ? (
              <></>
            ) : (
              <div className="text-center text-xl p-8 font-light">
                Tidak ada buku! Tambah buku?
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
