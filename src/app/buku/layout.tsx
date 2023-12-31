import NavBar from "@/components/NavBar";
import { PropsWithChildren } from "react";

export default function BukuLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <div className="container p-4">{children}</div>
    </main>
  );
}
