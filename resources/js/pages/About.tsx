import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">About Us</h1>

        <p className="text-gray-700">
          PataHao is a real estate platform that connects property seekers with trusted agents.
          We simplify the process of finding, listing, and managing properties.
        </p>

        <p className="text-gray-700">
          Our mission is to make real estate accessible, transparent, and efficient for everyone.
        </p>
      </main>

      <Footer />
    </div>
  );
}