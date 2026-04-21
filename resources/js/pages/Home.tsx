import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import PropertyCard from "@/Components/PropertyCard";

interface Property {
  id: number;
  type: string;
  price: number;
  location: string;
  size: number;
  beds: number;
  baths: number;
  images: string[];
  description?: string;
  phone?: string;
}

export default function Home({ properties }: { properties: Property[] }) {
  const [filtered, setFiltered] = useState(properties);

  const [filters, setFilters] = useState({
  type: "",
  location: "",
  minSize: "",
  maxSize: "",
  minPrice: "",
  maxPrice: "",
  beds: "",
  baths: "",
});

  const handleFilter = () => {
    const result = properties.filter((p) => {
      return (
        // TYPE
        (!filters.type || p.type === filters.type) &&

        // LOCATION
        (!filters.location ||
          p.location.toLowerCase().includes(filters.location.toLowerCase())) &&

        // SIZE RANGE (FIXED)
        (!filters.minSize || p.size >= Number(filters.minSize)) &&
        (!filters.maxSize || p.size <= Number(filters.maxSize)) &&

        // PRICE RANGE
        (!filters.minPrice || p.price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || p.price <= Number(filters.maxPrice)) &&

        // BEDS
        (!filters.beds || p.beds === Number(filters.beds)) &&

        // BATHS
        (!filters.baths || p.baths === Number(filters.baths))
      );
    });

    setFiltered(result);
  };

  const [selected, setSelected] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <Head title="Home" />

      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        
        {/* FILTER BOX */}
        <div className="bg-white rounded-[14px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] mb-5">
          <h3 className="font-semibold mb-3">Find Property</h3>

          <div className="flex flex-wrap gap-2">
            <select
              className="border border-gray-200 rounded-lg p-2 text-sm flex-1 min-w-[140px] bg-white"
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value })
              }
              value={filters.type}
            >
              <option value="">All</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>

            <input
              className="border border-gray-200 rounded-lg p-2 text-sm flex-1 min-w-[140px]"
              placeholder="Location"
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />

            <input
              className="border border-gray-200 rounded-lg p-2 text-sm flex-1 min-w-[120px]"
              type="number"
              placeholder="Min Size (sq ft)"
              value={filters.minSize}
              onChange={(e) =>
                setFilters({ ...filters, minSize: e.target.value })
              }
            />

            <input
              className="border border-gray-200 rounded-lg p-2 text-sm flex-1 min-w-[120px]"
              type="number"
              placeholder="Max Size (sq ft)"
              value={filters.maxSize}
              onChange={(e) =>
                setFilters({ ...filters, maxSize: e.target.value })
              }
            />

            <input
              className="border border-gray-200 rounded-lg p-2 text-sm flex-1 min-w-[120px]"
              type="number"
              placeholder="Min Price"
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />

            <input
              className="border border-gray-200 rounded-lg p-2 text-sm flex-1 min-w-[120px]"
              type="number"
              placeholder="Max Price"
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />

            <input
              className="border border-gray-200 rounded-lg p-2 text-sm flex-1 min-w-[100px]"
              type="number"
              placeholder="Beds"
              onChange={(e) =>
                setFilters({ ...filters, beds: e.target.value })
              }
            />

            <input
              className="border border-gray-200 rounded-lg p-2 text-sm flex-1 min-w-[100px]"
              type="number"
              placeholder="Baths"
              onChange={(e) =>
                setFilters({ ...filters, baths: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleFilter}
            className="mt-3 bg-[#0a3d62] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            style={{color: "white"}}
          >
            Search
          </button>
        </div>

        {/* PROPERTY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelected(p);
                setActiveImage(p.images?.[0] || null);
              }}
              className="cursor-pointer"
            >
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center z-50 p-3 pt-[80px]"
          onClick={() => setSelected(null)} style ={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden max-h-[85vh] overflow-y-auto opacity-100"
            onClick={(e) => e.stopPropagation()}
            style={{backgroundColor: "white"}}
          >
            {/* CLOSE BUTTON */}
            <div className="sticky top-0 bg-white p-3 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                X
              </button>
            </div>

            {/* IMAGE */}
            <img
              src={activeImage || selected.images?.[0]}
            />

            {/* GALLERY */}
            <div className="flex gap-2 p-3 flex-wrap">
              {selected.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${
                    activeImage === img ? "border-[#0a3d62]" : "border-transparent"
                  }`}
                />
              ))}
            </div>

            {/* DETAILS */}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-bold">
                {selected.type} - {selected.location}
              </h2>

              <p className="text-green-600 font-bold text-lg">
                KES {selected.price}
              </p>

              <p className="text-sm text-gray-500">
                {selected.size} sq ft • {selected.beds} beds • {selected.baths} baths
              </p>

              <p className="text-gray-600">{selected.description}</p>

              <div className="pt-2 border-t text-sm">
                <span className="font-semibold">Agent:</span> {selected.phone}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}