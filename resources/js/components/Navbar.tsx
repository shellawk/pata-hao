import { Link, router, usePage } from "@inertiajs/react";

export default function Navbar() {
  const auth = (usePage().props as any)?.auth;
  const user = auth?.user;

  const logout = () => {
    router.post("/logout");
  };

  return (
    <header className="bg-[#0a3d62] text-white px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link href={route("home")} className="font-bold text-lg hover:opacity-80">
        PataHao
      </Link>

      <div className="flex gap-3 items-center">
        <Link href="/" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">
          Browse
        </Link>

        {user?.role !== "admin" && (
          <Link
            href="/enquiries"
            className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
          >
            Enquiries
          </Link>
        )}

        {/* AGENT */}
        {user?.role === "agent" && (
          <Link
            href={route("agent")}
            className="px-3 py-1 rounded bg-green-500/80 hover:bg-green-500"
          >
            Agent Dashboard
          </Link>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link
            href={route("admin")}
            className="px-3 py-1 rounded bg-purple-500/80 hover:bg-purple-500"
          >
            Admin Dashboard
          </Link>
        )}

        {user ? (
          <>
            <Link
              href={route("profile.edit")}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
            >
              {user.name || "Profile"}
            </Link>

            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}