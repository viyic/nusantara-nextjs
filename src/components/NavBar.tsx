"use client";

import { API_URL } from "@/utils/env";
import { Dialog, Transition } from "@headlessui/react";
import { SignOut, Warning } from "@phosphor-icons/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function NavBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const logout = async () => {
    axios
      .delete(`${API_URL}/user/logout`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.removeItem("token");
          toast.success("Berhasil keluar akun");
          router.push("/");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Terjadi kendala saat keluar akun");
      });
  };

  return (
    <div className="bg-cyan-800 text-slate-50 flex justify-between w-full items-center py-3 px-2 relative">
      <div></div>
      <div className="flex gap-4 absolute left-1/2 -translate-x-1/2">
        <Link
          href="/dasbor"
          className="px-3 py-2 hover:bg-cyan-700 transition rounded-md w-20 text-center"
        >
          Dasbor
        </Link>
        <Link
          href="/buku"
          className="px-3 py-2 hover:bg-cyan-700 transition rounded-md w-20 text-center"
        >
          Buku
        </Link>
      </div>
      <button
        className="px-3 py-2 hover:bg-cyan-700 transition rounded-md"
        onClick={() => setModalOpen(true)}
      >
        <SignOut size={24} />
      </button>

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
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10">
                        <Warning
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <Dialog.Title
                          as="h3"
                          className="leading-6 text-gray-900"
                        >
                          Apakah Anda yakin ingin keluar dari akun?
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-center sm:px-6">
                    <button
                      type="button"
                      className="inline-flex transition w-full justify-center rounded-md bg-red-600 px-3 py-2 font-semibold text-slate-50 hover:bg-red-700 sm:ml-3"
                      onClick={() => {
                        logout();
                        setModalOpen(false);
                      }}
                    >
                      Keluar
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
    </div>
  );
}
