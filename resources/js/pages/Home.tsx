import { useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";

interface Property {
  id: number;
  type: string;
  price: number;
  location: string;
  size: number;
  beds: number;
  baths: number;
  images: string[];
}

export default function Home({ properties }: { properties: Property[] }) {
  const [filtered, setFiltered] = useState(properties);

  const [filters, setFilters] = useState({
    type: "",
    location: "",
    beds: "",
  });

  const handleFilter = () => {
    const result = properties.filter((p) => {
      return (
        (!filters.type || p.type === filters.type) &&
        (!filters.location ||
          p.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.beds || p.beds === Number(filters.beds))
      );
    });

    setFiltered(result);
  };

  const sendEnquiry = async () => {
    try {
      await axios.post("/api/enquiries", {
        ...filters,
        message: "Interested in property",
      });

      alert("Enquiry sent!");
    } catch {
      alert("Login required");
    }
  };

  return (
    <>
      <Head title="Home" />

      <div style={{ padding: 20 }}>
        <h1>PataHao</h1>

        {/* FILTER */}
        <div className="card">
          <h3>Find Property</h3>

          <input
            placeholder="Type"
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
          />

          <input
            placeholder="Location"
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />

          <input
            placeholder="Beds"
            type="number"
            onChange={(e) =>
              setFilters({ ...filters, beds: e.target.value })
            }
          />

          <button onClick={handleFilter}>Search</button>
        </div>

        {/* LIST */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
            gap: 15,
          }}
        >
          {filtered.map((p) => (
            <div key={p.id} className="card">
              <img
                src={p.images?.[0]}
                style={{ width: "100%", borderRadius: 10 }}
              />
              <h4>{p.type}</h4>
              <div>KES {p.price}</div>
              <div>{p.location}</div>
              <div>
                {p.beds} beds • {p.baths} baths
              </div>
            </div>
          ))}
        </div>

        {/* ENQUIRY */}
        <div className="card">
          <h3>General Enquiry</h3>
          <button onClick={sendEnquiry}>Send Enquiry</button>
        </div>
      </div>
    </>
  );
}