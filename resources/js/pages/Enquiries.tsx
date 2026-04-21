import Navbar from "@/components/Navbar";

export default function Enquiries() {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Your Enquiries</h2>

        <div className="bg-white p-4 rounded shadow">
          <p>No enquiries yet.</p>
        </div>
      </div>
    </>
  );
}