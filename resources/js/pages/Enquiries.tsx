import Navbar from "@/Components/Navbar";
import { useForm, usePage } from "@inertiajs/react";

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

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h2 className="text-xl font-bold">Your Enquiries</h2>

        {/* FORM */}
        <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
          <h3 className="font-semibold">Create Enquiry</h3>

          <div>
            <select
              value={data.type}
              onChange={(e) => setData("type", e.target.value)}
              className="w-full border p-2"
              required
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>

            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>

          <input
            placeholder="Location"
            value={data.location}
            onChange={(e) => setData("location", e.target.value)}
            className="w-full border p-2"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Min Price"
              value={data.min_price}
              onChange={(e) => setData("min_price", e.target.value)}
            />

            <input
              placeholder="Max Price"
              value={data.max_price}
              onChange={(e) => setData("max_price", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Min Size"
              value={data.min_size}
              onChange={(e) => setData("min_size", e.target.value)}
            />

            <input
              placeholder="Max Size"
              value={data.max_size}
              onChange={(e) => setData("max_size", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Beds"
              value={data.beds}
              onChange={(e) => setData("beds", e.target.value)}
              className="border p-2"
            />
            <input
              placeholder="Baths"
              value={data.baths}
              onChange={(e) => setData("baths", e.target.value)}
              className="border p-2"
            />
          </div>
          <textarea
            placeholder="Message"
            value={data.message}
            onChange={(e) => setData("message", e.target.value)}
            className="w-full border p-2"
          />

          <button
            disabled={processing}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Enquiry
          </button>
        </form>

        {/* LIST */}
        {enquiries.length === 0 ? (
          <div className="bg-white p-4 rounded shadow">
            <p>No enquiries yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {enquiries.map((enquiry: any) => (
              <div key={enquiry.id} className="bg-white p-4 rounded shadow border">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{enquiry.type}</h3>
                  <span className="text-sm text-gray-500">{enquiry.status}</span>
                </div>

                <p className="text-gray-700 mt-2">{enquiry.location}</p>

                <div className="text-sm text-gray-500 mt-2">
                  Price: {enquiry.min_price} - {enquiry.max_price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}