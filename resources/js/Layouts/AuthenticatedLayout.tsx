import { PropsWithChildren } from "react";
import Navbar from "@/Components/Navbar";

export default function AuthenticatedLayout({
  children,
  header,
}: PropsWithChildren<{ header?: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {header && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}