"use client";
import NavBar from "@/components/NavBar";
import { API_URL } from "@/utils/env";
import { ArrowsVertical, CornersIn, CornersOut } from "@phosphor-icons/react";
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

  const [compactView, setCompactView] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/books`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setBooks(response.data.data);
        }
      })
      .catch((error) => {
        toast.error("Terjadi kendala saat mengambil data buku");
      });
  }, []);

  return (
    <>
      <div className="text-4xl font-bold text-cyan-900">Buku</div>
      <div className="mt-4 card">
        <div className="flex justify-between">
          <Link
            href="/buku/tambah"
            className="button bg-cyan-600 hover:bg-cyan-700 border-cyan-700"
          >
            Tambah Buku
          </Link>
          {books.length > 0 ? (
            <button
              type="button"
              className="button aspect-square"
              onClick={() => setCompactView(!compactView)}
            >
              {!compactView ? (
                <CornersIn size={24} />
              ) : (
                <CornersOut size={24} />
              )}
            </button>
          ) : (
            <div></div>
          )}
        </div>
        {books.length > 0 ? (
          <>{!compactView ? <div></div> : <div></div>}</>
        ) : (
          <div className="text-center text-xl p-8 font-light">
            Tidak ada buku! Tambah buku?
          </div>
        )}
      </div>
    </>
  );
}
