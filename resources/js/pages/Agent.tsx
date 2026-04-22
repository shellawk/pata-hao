import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { useForm, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Agent() {
  const { enquiries, properties, flash } = usePage().props as any;
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);

  const [activeTab, setActiveTab] = useState("create");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { data, setData, reset } = useForm({
    type: "Apartment",
    location: "",
    price: "",
    size: "",
    beds: "",
    baths: "",
    description: "",
    phone: "",
    images: [] as File[],
  });

  const submitProperty = (e: any) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images") formData.append(key, value as string);
    });

    data.images.forEach((file, i) => {
      formData.append(`images[${i}]`, file);
    });

    if (editingProperty) {
      formData.append("_method", "PATCH");
      router.post(route("properties.update", editingProperty.id), formData, {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          setEditingProperty(null);
          setMessage("Property updated successfully ✅");
        },
        onError: () => {
          setError("Failed to update property ❌");
        },
        onFinish: () => setLoading(false),
      });

      return;
    }
    router.post(route("properties.store"), formData, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setMessage("Property created successfully ✅");
      },
      onError: () => {
        setError("Failed to create property ❌");
      },
      onFinish: () => setLoading(false),
    });
  };

  const deleteProperty = (id: number) => {
    if (!confirm("Delete this property?")) return;

    setDeletingId(id);
    setMessage(null);
    setError(null);

    router.delete(route("properties.destroy", id), {
      onSuccess: () => setMessage("Property deleted successfully 🗑️"),
      onError: () => setError("Failed to delete property ❌"),
      onFinish: () => setDeletingId(null),
    });
  };

  const assignProperty = (enquiryId: number, propertyId: number) => {
    setLoading(true);
    setMessage(null);
    setError(null);

    router.post(route("agent.assign"), {
      enquiry_id: enquiryId,
      property_id: propertyId,
    }, {
      onSuccess: () => setMessage("Property assigned successfully ✅"),
      onError: () => setError("Failed to assign property ❌"),
      onFinish: () => setLoading(false),
    });
  };

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>

        {/* FLASH (SERVER) */}
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

        {/* LOCAL FEEDBACK */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* ================= TABS ================= */}
        <div className="flex gap-2 border-b pb-2">
          {[
            { key: "create", label: "Add Property" },
            { key: "properties", label: "My Properties" },
            { key: "enquiries", label: "Enquiries" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-t ${
                activeTab === tab.key
                  ? "bg-[#0a3d62] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= CREATE ================= */}
        {activeTab === "create" && (
          <div className="bg-white p-4 rounded shadow">

            <form onSubmit={submitProperty} className="space-y-4">

              {/* TOP ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <select
                  value={data.type}
                  onChange={(e) => setData("type", e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option>Apartment</option>
                  <option>House</option>
                </select>

                <input
                  placeholder="Phone"
                  value={data.phone}
                  onChange={(e) => setData("phone", e.target.value)}
                  className="border p-2 rounded w-full"
                />

              </div>

              {/* LOCATION + PRICE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <input
                  placeholder="Location"
                  value={data.location}
                  onChange={(e) => setData("location", e.target.value)}
                  className="border p-2 rounded w-full"
                />

                <input
                  placeholder="Price"
                  value={data.price}
                  onChange={(e) => setData("price", e.target.value)}
                  className="border p-2 rounded w-full"
                />

              </div>

              {/* SIZE + BED/BATH */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                <input
                  placeholder="Size (sq ft)"
                  value={data.size}
                  onChange={(e) => setData("size", e.target.value)}
                  className="border p-2 rounded w-full"
                />

                <input
                  placeholder="Beds"
                  value={data.beds}
                  onChange={(e) => setData("beds", e.target.value)}
                  className="border p-2 rounded w-full"
                />

                <input
                  placeholder="Baths"
                  value={data.baths}
                  onChange={(e) => setData("baths", e.target.value)}
                  className="border p-2 rounded w-full"
                />

              </div>

              {/* DESCRIPTION */}
              <textarea
                placeholder="Description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                className="w-full border p-2 rounded min-h-[100px]"
              />

              {/* FILE UPLOAD */}
              <div className="border rounded p-3">
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setData("images", [
                      ...data.images,
                      ...Array.from(e.target.files),
                    ]);
                  }}
                  className="w-full"
                />

                {/* PREVIEW */}
                {data.images.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
                    {data.images.map((file, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(file)}
                        className="h-16 w-full object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* SUBMIT */}
              <button
                disabled={loading}
                className={`w-full md:w-auto px-6 py-2 rounded text-white transition ${
                  loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
              ? "Processing..."
              : editingProperty
              ? "Update Property"
              : "Add Property"}
              </button>

            </form>
          </div>
        )}

        {/* ================= PROPERTIES ================= */}
        {activeTab === "properties" && (
          <div className="bg-white p-4 rounded shadow">

            {properties.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No properties yet. Add one from the "Add Property" tab.
              </div>
            ) : (
              <div className="pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                  {properties.map((p: any) => (
                    <div
                      key={p.id}
                      className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
                    >

                      {/* IMAGE */}
                      <div className="h-32 bg-gray-100">
                        <img
                          src={p.images?.[0] || "/placeholder.jpg"}
                          alt={p.type}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* DETAILS */}
                      <div className="p-3 flex flex-col justify-between flex-1 space-y-1">

                        <div>
                          <h3 className="font-semibold text-sm truncate">
                            {p.type || "Property"}
                          </h3>

                          <p className="text-xs text-gray-500 truncate">
                            {p.location || "Unknown location"}
                          </p>

                          <p className="text-green-600 font-semibold text-sm">
                            KES {Number(p.price).toLocaleString()}
                          </p>

                          <p className="text-[11px] text-gray-500">
                            {p.size || "-"} sq ft • {p.beds || 0} beds • {p.baths || 0} baths
                          </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => {
                              setEditingProperty(p);

                              setData({
                                type: p.type,
                                location: p.location,
                                price: p.price,
                                size: p.size,
                                beds: p.beds,
                                baths: p.baths,
                                description: p.description || "",
                                phone: p.phone || "",
                                images: [],
                              });

                              setActiveTab("create");
                            }}
                            className="text-[11px] bg-yellow-500 text-white px-3 py-1 rounded hover:opacity-90 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProperty(p.id)}
                            disabled={deletingId === p.id}
                            className="text-[11px] bg-red-500 text-white px-3 py-1 rounded hover:opacity-90"
                          >
                            {deletingId === p.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              </div>
            )}
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

                <div className="text-sm text-gray-600 mt-1">
                  Budget: {e.min_price} - {e.max_price}
                </div>

                <div className="mt-2 text-sm space-y-1">
                  <p><strong>Name:</strong> {e.user?.name}</p>
                  <p><strong>Phone:</strong> {e.user?.phone || "N/A"}</p>

                  {e.message && (
                    <p><strong>Message:</strong> {e.message}</p>
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