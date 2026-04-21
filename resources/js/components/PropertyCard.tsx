import { Property } from "../types/property";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  return (
    <div className="card">
      <img
        src={property.images.length > 0 ? `/storage/${property.images[0]}` : "/placeholder.png"}
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <h4>{property.type}</h4>
      <div style={{ color: "green", fontWeight: "bold" }}>
        KES {property.price}
      </div>

      <div>
        {property.size} sq ft • {property.beds} beds • {property.baths} baths
      </div>

      <div>{property.location}</div>
    </div>
  );
}