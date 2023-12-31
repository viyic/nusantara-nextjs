"use client";
import { API_URL } from "@/utils/env";
import { CaretRight } from "@phosphor-icons/react";
import axios from "axios";
import { format, formatISO, formatISO9075 } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type Book } from "@/app/buku/page";

export default function BukuTambah() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    ...form
  } = useForm<Book>();

  const onSubmit: SubmitHandler<Book> = (data) => {
    console.log();
    axios
      .post(
        `${API_URL}/books/add`,
        {
          ...data,
          published: formatISO9075(data.published),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message);
          form.reset();
          router.push("/buku");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Terjadi kendala saat tambah buku");
      });
  };

  const onSubmitError: SubmitErrorHandler<Book> = (errors) => {
    // if (errors.email) {
    //   toast.error("Surel tidak valid");
    //   return;
    // }
    // if (errors.password) {
    //   toast.error("Kata sandi tidak valid");
    //   return;
    // }
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
                className="input w-full sm:max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Judul</div>
              <input
                type="text"
                {...register("title", { required: true })}
                aria-invalid={!!errors.title}
                className="input w-full sm:max-w-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Subjudul</div>
              <input
                type="text"
                {...register("subtitle", { required: true })}
                aria-invalid={!!errors.title}
                className="input w-full sm:max-w-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Deskripsi</div>
              <textarea
                {...register("description", { required: true })}
                aria-invalid={!!errors.description}
                className="input w-full sm:max-w-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Jumlah Halaman</div>
              <input
                type="number"
                min={0}
                {...register("pages", { required: true, valueAsNumber: true })}
                aria-invalid={!!errors.pages}
                className="input w-full sm:max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Pengarang</div>
              <input
                type="text"
                {...register("author", { required: true })}
                aria-invalid={!!errors.author}
                className="input w-full sm:max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Penerbit</div>
              <input
                type="text"
                {...register("publisher", { required: true })}
                aria-invalid={!!errors.publisher}
                className="input w-full sm:max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Tanggal Publikasi</div>
              <input
                type="date"
                {...register("published", {
                  required: true,
                  valueAsDate: true,
                })}
                aria-invalid={!!errors.published}
                className="input w-full sm:max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="">Situs Web</div>
              <input
                type="url"
                {...register("website", { required: true })}
                aria-invalid={!!errors.website}
                className="input w-full sm:max-w-xs"
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
