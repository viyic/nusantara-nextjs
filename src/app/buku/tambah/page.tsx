"use client";
import { API_URL } from "@/utils/env";
import { CaretRight } from "@phosphor-icons/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function BukuTambah() {
  const router = useRouter();
  type formType = {
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
  const {
    handleSubmit,
    register,
    formState: { errors },
    ...form
  } = useForm<formType>();

  const onSubmit: SubmitHandler<formType> = (data) => {
    axios
      .post(`${API_URL}/books/add`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message);
          //   router.push("/buku");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Terjadi kendala saat tambah buku");
      });
  };

  const onSubmitError: SubmitErrorHandler<formType> = (errors) => {
  };
  return (
    <>
      <div className="text-4xl font-bold text-cyan-900 flex gap-2 items-center">
        <Link href="/buku">Buku</Link> <CaretRight /> Tambah
      </div>
      <div className="mt-4 card">
        <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="">ISBN</div>
              <input
                type="text"
                {...register("isbn", { required: true })}
                aria-invalid={!!errors.isbn}
                className="input max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Judul</div>
              <input
                type="text"
                {...register("title", { required: true })}
                aria-invalid={!!errors.title}
                className="input max-w-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Subjudul</div>
              <input
                type="text"
                {...register("title", { required: true })}
                aria-invalid={!!errors.title}
                className="input max-w-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Deskripsi</div>
              <textarea
                {...register("description", { required: true })}
                aria-invalid={!!errors.description}
                className="input max-w-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Total Halaman</div>
              <input
                type="number"
                {...register("pages", { required: true, valueAsNumber: true })}
                aria-invalid={!!errors.pages}
                className="input max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Penulis</div>
              <input
                type="text"
                {...register("author", { required: true })}
                aria-invalid={!!errors.author}
                className="input max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Penerbit</div>
              <input
                type="text"
                {...register("publisher", { required: true })}
                aria-invalid={!!errors.publisher}
                className="input max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Tanggal Rilis</div>
              <input
                type="date"
                {...register("published", {
                  required: true,
                  valueAsDate: true,
                })}
                aria-invalid={!!errors.published}
                className="input max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Situs Web</div>
              <input
                type="url"
                {...register("website", { required: true })}
                aria-invalid={!!errors.website}
                className="input max-w-xs"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="button">
                Tambah
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
