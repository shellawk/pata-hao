import Navbar from "@/Components/Navbar";
import { useForm, usePage, router } from "@inertiajs/react";

export default function Enquiries() {
  const { enquiries } = usePage().props as any;

  const { data, setData, post, processing, errors, reset } = useForm({
    type: "",
    location: "",
    min_size: "",
    max_size: "",
    min_price: "",
    max_price: "",
    beds: "",
    baths: "",
    message: "",
  });

  const submit = (e: any) => {
    e.preventDefault();

    post(route("enquiries.store"), {
      onSuccess: () => reset(),
    });
  };

  const toggleStatus = (id: number, currentStatus: string) => {
    router.patch(route("enquiries.toggle", id), {
      status: currentStatus,
    });
  };

  const deleteEnquiry = (id: number) => {
    if (confirm("Delete this enquiry?")) {
      router.delete(route("enquiries.destroy", id));
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-4 space-y-6">

        {/* HEADER */}
        <h2 className="text-xl font-bold">Your Enquiries</h2>

        {/* ===================== FORM ===================== */}
        <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-4">

          <h3 className="font-semibold text-lg">Create Enquiry</h3>

          {/* TYPE (MANDATORY) */}
          <div>
            <label className="text-sm font-medium">Type *</label>
            <select
              value={data.type}
              onChange={(e) => setData("type", e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>

          {/* LOCATION (MANDATORY) */}
          <div>
            <label className="text-sm font-medium">Location *</label>
            <input
              value={data.location}
              onChange={(e) => setData("location", e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* PRICE (MANDATORY) */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium">Min Price *</label>
              <input
                value={data.min_price}
                onChange={(e) => setData("min_price", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Max Price *</label>
              <input
                value={data.max_price}
                onChange={(e) => setData("max_price", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          {/* OPTIONAL FIELDS */}
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Min Size"
              value={data.min_size}
              onChange={(e) => setData("min_size", e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Max Size"
              value={data.max_size}
              onChange={(e) => setData("max_size", e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Beds"
              value={data.beds}
              onChange={(e) => setData("beds", e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Baths"
              value={data.baths}
              onChange={(e) => setData("baths", e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <textarea
            placeholder="Message (optional)"
            value={data.message}
            onChange={(e) => setData("message", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            disabled={processing}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Enquiry
          </button>
        </form>

        {/* ===================== LIST ===================== */}
        {enquiries.length === 0 ? (
          <div className="bg-white p-4 rounded shadow">
            <p>No enquiries yet.</p>
          </div>
        ) : (
          <div className="space-y-3">

            {enquiries.map((enquiry: any) => (
              <div
                key={enquiry.id}
                className="bg-white p-4 rounded shadow border"
              >

                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {enquiry.type} • {enquiry.location}
                  </h3>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => toggleStatus(enquiry.id, enquiry.status)}
                      className={`text-xs px-2 py-1 rounded ${
                        enquiry.status === "open"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {enquiry.status}
                    </button>

                    <button
                      onClick={() => deleteEnquiry(enquiry.id)}
                      className="text-xs px-2 py-1 rounded bg-red-100 text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>
                    Price: {enquiry.min_price} - {enquiry.max_price}
                  </p>

                  {enquiry.beds && <p>Beds: {enquiry.beds}</p>}
                  {enquiry.baths && <p>Baths: {enquiry.baths}</p>}
                  {enquiry.message && <p>Message: {enquiry.message}</p>}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}