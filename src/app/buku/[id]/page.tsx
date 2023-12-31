"use client";
import { API_URL } from "@/utils/env";
import { CaretRight, NotePencil, Warning } from "@phosphor-icons/react";
import axios from "axios";
import { format, formatISO, formatISO9075 } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type Book } from "@/app/buku/page";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loading from "@/components/Loading";

export default function BukuEdit({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    ...form
  } = useForm<Book>();

  useEffect(() => {
    axios
      .get(`${API_URL}/books/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          const data = response.data as Book;
          form.setValue("author", data.author);
          form.setValue("description", data.description);
          form.setValue("isbn", data.isbn);
          form.setValue("pages", data.pages);
          form.setValue("published", data.published.slice(0, 10));
          form.setValue("publisher", data.publisher);
          form.setValue("subtitle", data.subtitle);
          form.setValue("title", data.title);
          form.setValue("website", data.website);
          setLoading(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Terjadi kendala saat mengambil data buku");
      });
  }, [id]);

  const onSubmit: SubmitHandler<Book> = (data) => {
    axios
      .put(
        `${API_URL}/books/${id}/edit`,
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
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Terjadi kendala saat menyimpan perubahan buku");
      });
  };

  const hapus = () => {
    axios
      .delete(`${API_URL}/books/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
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
        toast.error("Terjadi kendala saat menghapus buku");
      });
  };
  return (
    <>
      <div className="text-4xl font-bold text-cyan-900 flex gap-2 items-center">
        <Link href="/buku">Buku</Link> <CaretRight /> Detail
      </div>
      <div className="mt-4 card">
        {loading ? (
          <div className="flex justify-center p-8">
            <Loading />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Judul Buku"
                  {...register("title", { required: true })}
                  aria-invalid={!!errors.title}
                  className="text-3xl w-full max-w-lg border-b bg-transparent font-semibold text-center sm:text-start"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Subjudul"
                  {...register("subtitle", { required: true })}
                  aria-invalid={!!errors.title}
                  className="text-xl w-full max-w-lg border-b bg-transparent text-center sm:text-start"
                />
              </div>

              <div className="flex gap-4 max-w-lg">
                <div className="">Oleh</div>
                <input
                  type="text"
                  placeholder="Nama Pengarang"
                  {...register("author", { required: true })}
                  aria-invalid={!!errors.author}
                  className="flex-grow border-b bg-transparent"
                />
              </div>

              <div className="flex gap-4 max-w-lg">
                <div className="">Diterbitkan oleh</div>
                <input
                  type="text"
                  placeholder="Penerbit"
                  {...register("publisher", { required: true })}
                  aria-invalid={!!errors.publisher}
                  className="flex-grow border-b bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <textarea
                  placeholder="Deskripsi"
                  {...register("description", { required: true })}
                  rows={6}
                  aria-invalid={!!errors.description}
                  className="input w-full sm:max-w-lg"
                />
              </div>

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
                <div className="">Jumlah Halaman</div>
                <input
                  type="number"
                  min={0}
                  {...register("pages", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  aria-invalid={!!errors.pages}
                  className="input w-full sm:max-w-xs"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="">Tanggal Publikasi</div>
                <input
                  type="date"
                  {...register("published", {
                    required: true,
                    //   valueAsDate: true,
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
              <div className="flex justify-between sm:justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="button bg-red-600 hover:bg-red-700 border-red-700"
                  onClick={() => setModalOpen(true)}
                >
                  Hapus
                </button>
                <button type="submit" className="button">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelRef}
          onClose={setModalOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-md bg-slate-50 text-center shadow-md transition">
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col items-center">
                    <Warning
                      size={32}
                      className="text-red-600"
                      aria-hidden="true"
                    />
                    <div className="mt-3 text-center">
                      <Dialog.Title as="h3" className="leading-6 text-gray-900">
                        Apakah Anda yakin ingin menghapus buku ini?
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-center sm:px-6">
                    <button
                      type="button"
                      className="inline-flex transition w-full justify-center rounded-md bg-red-600 px-3 py-2 font-semibold text-slate-50 hover:bg-red-700 sm:ml-3"
                      onClick={() => {
                        hapus();
                        setModalOpen(false);
                      }}
                    >
                      Hapus
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex transition w-full justify-center rounded-md bg-slate-200 px-3 py-2 font-semibold  hover:bg-slate-300 sm:mt-0"
                      onClick={() => setModalOpen(false)}
                      ref={cancelRef}
                    >
                      Batal
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
