import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function Admin() {
  const { users, properties, enquiries, flash } = usePage().props as any;

  const [activeTab, setActiveTab] = useState("users");
  const [passwords, setPasswords] = useState<{ [key: number]: string }>({});

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

    router.patch(
      route("admin.users.update", id),
      { password: passwords[id] },
      {
        onSuccess: () => {
          setPasswords({ ...passwords, [id]: "" });
        },
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* FLASH */}
        {flash?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
            {flash.success}
          </div>
        )}

        {flash?.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {flash.error}
          </div>
        )}

        {/* ================= TABS ================= */}
        <div className="flex gap-2 border-b pb-2">
          {["users", "properties", "enquiries"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t capitalize ${
                activeTab === tab
                  ? "bg-[#0a3d62] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= USERS ================= */}
        {activeTab === "users" && (
          <div className="bg-white p-4 rounded shadow space-y-3">
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
                  <input
                    type="password"
                    placeholder="New password"
                    className="border p-1 rounded text-sm"
                    value={passwords[u.id] || ""}
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
        )}

        {/* ================= PROPERTIES ================= */}
        {activeTab === "properties" && (
          <div className="bg-white p-4 rounded shadow grid md:grid-cols-2 gap-3">
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
        )}

        {/* ================= ENQUIRIES ================= */}
        {activeTab === "enquiries" && (
          <div className="bg-white p-4 rounded shadow space-y-3">
            {enquiries.map((e: any) => (
              <div key={e.id} className="border p-3 rounded">
                <div className="font-semibold">
                  {e.type} • {e.location}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  Budget: {e.min_price} - {e.max_price}
                </div>

                <div className="mt-2 text-sm space-y-1">
                  <p><strong>Name:</strong> {e.user?.name}</p>
                  <p><strong>Phone:</strong> {e.user?.phone || "N/A"}</p>
                  <p><strong>Email:</strong> {e.user?.email}</p>

                  {e.message && (
                    <p className="text-gray-600">
                      <strong>Message:</strong> {e.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}