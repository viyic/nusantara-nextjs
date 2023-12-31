"use client";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import { API_URL } from "@/utils/env";
import {
  ArrowsVertical,
  CaretCircleRight,
  CaretLeft,
  CaretRight,
  CircleNotch,
  CornersIn,
  CornersOut,
  NotePencil,
  Pen,
} from "@phosphor-icons/react";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Book = {
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
};

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const [loading, setLoading] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [books, setBooks] = useState<(Book & { id: string })[]>([]);
  const [page, setPage] = useState(1); // starts at 1
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${API_URL}/books?page=${page}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoading(false);
          setBooks(response.data.data);
          setMaxPage(response.data.last_page);
        }
      })
      .catch((error) => {
        toast.error("Terjadi kendala saat mengambil data buku");
      });
  }, [page]);

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
          {/* {books.length > 0 ? (
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
          )} */}
        </div>
        <div className="mt-4 pt-4 border-t">
          {books.length > 0 ? (
            <>
              {!compactView ? (
                <>
                  <div className="rounded-md overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="bg-slate-200 text-slate-700 uppercase">
                        <tr>
                          <th className="p-4 text-start">ISBN</th>
                          <th className="p-4 text-start">Judul</th>
                          <th className="p-4 text-start">Subjudul</th>
                          <th className="p-4 text-start">Pengarang</th>
                          <th className="p-4 text-start">Penerbit</th>
                          <th className="p-4 text-end">Tanggal Publikasi</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book, index) => (
                          <tr
                            key={index}
                            className={`hover:bg-slate-100 cursor-pointer transition ${
                              index % 2 ? "bg-slate-200" : ""
                            }`}
                            onClick={() => router.push(`/buku/${book.id}`)}
                            tabIndex={0}
                          >
                            <td className="p-4">{book.isbn}</td>
                            <td className="p-4">{book.title}</td>
                            <td className="p-4">{book.subtitle}</td>
                            <td className="p-4">{book.author}</td>
                            <td className="p-4">{book.publisher}</td>
                            <td className="p-4 text-end">
                              {format(book.published, "d MMM y")}
                            </td>
                            <td className="p-4">
                              <CaretCircleRight
                                size={24}
                                weight="fill"
                                color="rgb(8 145 178)"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex rounded-md overflow-hidden justify-center gap-2 mt-4">
                    <button
                      type="button"
                      className="size-6 flex justify-center items-center p-0 button border-none text-slate-950 hover:text-slate-50 bg-transparent hover:bg-cyan-600 rounded-full"
                      onClick={() => {
                        if (page > 1) setPage(page - 1);
                      }}
                    >
                      <CaretLeft />
                    </button>
                    {maxPage <= 7 ? (
                      [...Array(maxPage)].map((value, index) => (
                        <button
                          type="button"
                          className={`size-6 flex justify-center items-center p-0 button border-none hover:text-slate-50 hover:bg-cyan-600 rounded-full ${
                            index + 1 == page
                              ? "bg-cyan-600"
                              : "bg-transparent text-slate-950"
                          }`}
                          key={index}
                          onClick={() => {
                            if (page != index + 1) setPage(index);
                          }}
                        >
                          {index + 1}
                        </button>
                      ))
                    ) : page <= 4 ? (
                      <>
                        {[...Array(4)].map((value, index) => (
                          <button
                            type="button"
                            className={`size-6 flex justify-center items-center p-0 button border-none hover:text-slate-50 hover:bg-cyan-600 rounded-full ${
                              index + 1 == page
                                ? "bg-cyan-600"
                                : "bg-transparent text-slate-950"
                            }`}
                            key={index}
                            onClick={() => {
                              if (page != index + 1) setPage(index);
                            }}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          type="button"
                          className={`size-6 flex justify-center items-center p-0 button border-none text-slate-950 hover:text-slate-50 bg-transparent hover:bg-cyan-600 rounded-full`}
                        >
                          ...
                        </button>
                        {[...Array(2)].map((value, index) => (
                          <button
                            type="button"
                            className={`size-6 flex justify-center items-center p-0 button border-none hover:text-slate-50 hover:bg-cyan-600 rounded-full ${
                              index + 1 == page
                                ? "bg-cyan-600"
                                : "bg-transparent text-slate-950"
                            }`}
                            key={index}
                            onClick={() => {
                              if (page != index + 1) setPage(index);
                            }}
                          >
                            {maxPage - (1 - index)}
                          </button>
                        ))}
                      </>
                    ) : page >= maxPage - 4 ? (
                      <>
                        {[...Array(2)].map((value, index) => (
                          <button
                            type="button"
                            className={`size-6 flex justify-center items-center p-0 button border-none hover:text-slate-50 hover:bg-cyan-600 rounded-full ${
                              index + 1 == page
                                ? "bg-cyan-600"
                                : "bg-transparent text-slate-950"
                            }`}
                            key={index}
                            onClick={() => {
                              if (page != index + 1) setPage(index);
                            }}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          type="button"
                          className={`size-6 flex justify-center items-center p-0 button border-none text-slate-950 hover:text-slate-50 bg-transparent hover:bg-cyan-600 rounded-full`}
                        >
                          ...
                        </button>
                        {[...Array(4)].map((value, index) => (
                          <button
                            type="button"
                            className={`size-6 flex justify-center items-center p-0 button border-none hover:text-slate-50 hover:bg-cyan-600 rounded-full ${
                              index + 1 == page
                                ? "bg-cyan-600"
                                : "bg-transparent text-slate-950"
                            }`}
                            key={index}
                            onClick={() => {
                              if (page != index + 1) setPage(index);
                            }}
                          >
                            {maxPage - (3 - index)}
                          </button>
                        ))}
                      </>
                    ) : (
                      <>
                        {[...Array(2)].map((value, index) => (
                          <button
                            type="button"
                            className={`size-6 flex justify-center items-center p-0 button border-none hover:text-slate-50 hover:bg-cyan-600 rounded-full ${
                              index + 1 == page
                                ? "bg-cyan-600"
                                : "bg-transparent text-slate-950"
                            }`}
                            key={index}
                            onClick={() => {
                              if (page != index + 1) setPage(index);
                            }}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          type="button"
                          className={`size-6 flex justify-center items-center p-0 button border-none text-slate-950 hover:text-slate-50 bg-transparent hover:bg-cyan-600 rounded-full`}
                        >
                          ...
                        </button>
                        <button
                          type="button"
                          className={`size-6 flex justify-center items-center p-0 button border-none text-slate-950 hover:text-slate-50 hover:bg-cyan-600 rounded-full bg-cyan-600`}
                        >
                          {page}
                        </button>
                        <button
                          type="button"
                          className={`size-6 flex justify-center items-center p-0 button border-none text-slate-950 hover:text-slate-50 bg-transparent hover:bg-cyan-600 rounded-full`}
                        >
                          ...
                        </button>
                        {[...Array(2)].map((value, index) => (
                          <button
                            type="button"
                            className={`size-6 flex justify-center items-center p-0 button border-none hover:text-slate-50 hover:bg-cyan-600 rounded-full ${
                              index + 1 == page
                                ? "bg-cyan-600"
                                : "bg-transparent text-slate-950"
                            }`}
                            key={index}
                            onClick={() => {
                              if (page != index + 1) setPage(index);
                            }}
                          >
                            {maxPage - (1 - index)}
                          </button>
                        ))}
                      </>
                    )}
                    <button
                      type="button"
                      className="size-6 flex justify-center items-center p-0 button border-none text-slate-950 hover:text-slate-50 bg-transparent hover:bg-cyan-600 rounded-full"
                      onClick={() => {
                        if (page < maxPage) setPage(page + 1);
                      }}
                    >
                      <CaretRight />
                    </button>
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            <div className="text-center text-xl p-8 font-light">
              {loading ? <Loading /> : "Tidak ada buku! Tambah buku?"}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
