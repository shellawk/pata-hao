import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {

  const auth = (usePage().props as any)?.auth;

  return (
    <header className="bg-[#0a3d62] text-white px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <h2 className="font-bold text-lg">PataHao</h2>

      <div className="flex gap-3">
        <Link href="/" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">
          Browse
        </Link>

        <Link href="/enquiries" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">
          Enquiry
        </Link>

        <Link href="/agent" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">
          Agent
        </Link>
        {auth?.user ? (
          <Link href="/profile" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">
            Profile
          </Link>
        ) : (
          <>
            <Link href="/login" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">
              Login
            </Link>
            <Link href="/register" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}