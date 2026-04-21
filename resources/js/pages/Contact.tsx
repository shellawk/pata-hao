import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Contact Us</h1>

        <div className="bg-white p-4 rounded shadow space-y-3 text-gray-700">

          <p>
            <span className="font-semibold">Phone:</span> +254 700 000 000
          </p>

          <p>
            <span className="font-semibold">Email:</span> support@patahao.com
          </p>

          <p>
            <span className="font-semibold">Location:</span> Nairobi, Kenya
          </p>

          <p>
            We are available Monday to Saturday, 9:00 AM – 6:00 PM.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}