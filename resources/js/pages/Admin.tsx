import Navbar from "@/Components/Navbar";
import { usePage, router } from "@inertiajs/react";

export default function Admin() {
  const { users, properties, enquiries } = usePage().props as any;

  const deleteProperty = (id: number) => {
    if (confirm("Delete property?")) {
      router.delete(route("properties.destroy", id));
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 space-y-6">

        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* ================= USERS ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Users</h2>

          <div className="space-y-2">
            {users.map((u: any) => (
              <div key={u.id} className="border p-2 rounded flex justify-between">
                <div>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-gray-500">{u.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PROPERTIES ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">All Properties</h2>

          <div className="grid md:grid-cols-2 gap-3">
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

          <div className="space-y-2">
            {enquiries.map((e: any) => (
              <div key={e.id} className="border p-2 rounded">
                <div className="font-semibold">
                  {e.type} • {e.location}
                </div>

                <div className="text-sm text-gray-500">
                  Budget: {e.min_price} - {e.max_price}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}