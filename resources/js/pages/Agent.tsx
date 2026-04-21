import Navbar from "@/Components/Navbar";
import { useForm, usePage, router } from "@inertiajs/react";

export default function Agent() {
  const { enquiries, properties } = usePage().props as any;

  const { data, setData, post, reset } = useForm({
    type: "Apartment",
    location: "",
    price: "",
    size: "",
    beds: "",
    baths: "",
    description: "",
    phone: "",
  });

  const createProperty = (e: any) => {
    e.preventDefault();

    post(route("properties.store"), {
      onSuccess: () => reset(),
    });
  };

  const deleteProperty = (id: number) => {
    if (confirm("Delete this property?")) {
      router.delete(route("properties.destroy", id));
    }
  };

  const assignProperty = (enquiryId: number, propertyId: number) => {
    router.post(route("agent.assign"), {
      enquiry_id: enquiryId,
      property_id: propertyId,
    });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 space-y-6">

        <h1 className="text-2xl font-bold">Agent Dashboard</h1>

        {/* ================= CREATE PROPERTY ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Add Property</h2>

          <form onSubmit={createProperty} className="space-y-3">

            <select
              value={data.type}
              onChange={(e) => setData("type", e.target.value)}
              className="w-full border p-2"
            >
              <option>Apartment</option>
              <option>House</option>
            </select>

            <input
              placeholder="Location"
              value={data.location}
              onChange={(e) => setData("location", e.target.value)}
              className="w-full border p-2"
            />

            <input
              placeholder="Price"
              value={data.price}
              onChange={(e) => setData("price", e.target.value)}
              className="w-full border p-2"
            />
            
            <input
                placeholder="Phone Number"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                className="w-full border p-2"
            />

            <input
              placeholder="Size"
              value={data.size}
              onChange={(e) => setData("size", e.target.value)}
              className="w-full border p-2"
            />

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
              placeholder="Description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="w-full border p-2"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Property
            </button>
          </form>
        </div>

        {/* ================= ENQUIRIES ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Incoming Enquiries</h2>

          <div className="space-y-3">
            {enquiries.map((e: any) => (
              <div key={e.id} className="bg-white p-4 rounded shadow border">
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {e.type} • {e.location}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  Budget: {e.min_price} - {e.max_price}
                </p>

                {/* assign dropdown */}
                <div className="mt-2">
                  <select
                    onChange={(ev) =>
                      assignProperty(e.id, Number(ev.target.value))
                    }
                    className="border p-2 w-full"
                  >
                    <option>Select Property</option>
                    {properties.map((p: any) => (
                      <option key={p.id} value={p.id}>
                        {p.type} - {p.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PROPERTIES ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-2 mt-6">
            Available Properties
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {properties.map((p: any) => (
              <div key={p.id} className="bg-white p-4 rounded shadow border">
                <h3 className="font-semibold">{p.type}</h3>
                <p className="text-sm text-gray-600">{p.location}</p>
                <p className="text-sm text-gray-600">{p.price}</p>

                <button
                  onClick={() => deleteProperty(p.id)}
                  className="mt-2 text-xs px-2 py-1 bg-red-100 text-red-700 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}