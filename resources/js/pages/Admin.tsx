import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function Admin() {
  const { users, properties, enquiries } = usePage().props as any;
  const [passwords, setPasswords] = useState<{ [key: number]: string }>({});
  const { flash } = usePage().props as any;

  const deleteProperty = (id: number) => {
    if (confirm("Delete property?")) {
      router.delete(route("properties.destroy", id));
    }
  };

  const deleteUser = (id: number) => {
    if (!confirm("Delete user?")) return;

    router.delete(route("admin.users.destroy", id), {
      preserveScroll: true,
    });
  };

  const updatePassword = (id: number) => {
    if (!passwords[id]) return;

    router.patch(route("admin.users.update", id), {
      password: passwords[id],
    }, {
      onSuccess: () => {
        setPasswords({ ...passwords, [id]: "" });
      }
    });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 space-y-6">

        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* FLASH MESSAGES */}
        {flash?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {flash.success}
          </div>
        )}

        {flash?.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {flash.error}
          </div>
        )}

        {/* ================= USERS ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Users</h2>

          <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
            {users.map((u: any) => (
              <div
                key={u.id}
                className="border p-3 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <div>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-gray-500">{u.email}</div>
                  <div className="text-xs text-gray-400">{u.role}</div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  {/* PASSWORD UPDATE */}
                  <input
                    type="password"
                    placeholder="New password"
                    className="border p-1 rounded text-sm"
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        [u.id]: e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={() => updatePassword(u.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Update
                  </button>

                  {/* DELETE USER */}
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PROPERTIES ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">All Properties</h2>

          <div className="max-h-96 overflow-y-auto pr-2 grid md:grid-cols-2 gap-3">
            {properties.map((p: any) => (
              <div key={p.id} className="border p-3 rounded">
                <h3 className="font-semibold">{p.type}</h3>
                <p className="text-sm text-gray-600">{p.location}</p>
                <p className="text-sm text-gray-600">KES {p.price}</p>

                <button
                  onClick={() => deleteProperty(p.id)}
                  className="mt-2 text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ENQUIRIES ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">All Enquiries</h2>

          <div className="space-y-3 max-h-[28rem] overflow-y-auto space-y-3 pr-2">
            {enquiries.map((e: any) => (
              <div key={e.id} className="border p-3 rounded">

                <div className="font-semibold">
                  {e.type} • {e.location}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  Budget: {e.min_price} - {e.max_price}
                </div>

                {/* ================= USER INFO ================= */}
                <div className="mt-2 text-sm space-y-1">
                  <p>
                    <strong>Name:</strong> {e.user?.name}
                  </p>

                  {/* Only show if you actually store phone on user */}
                  <p>
                    <strong>Phone:</strong> {e.user?.phone || "N/A"}
                  </p>

                  <p>
                    <strong>Email:</strong> {e.user?.email}
                  </p>

                  {e.message && (
                    <p className="text-gray-600">
                      <strong>Message:</strong> {e.message}
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
      
      <Footer />
    </>
  );
}