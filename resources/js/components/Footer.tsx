export default function Footer() {
  return (
    <footer className="bg-[#0a3d62] text-white py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm">

        <div className="flex gap-6">
          <a href="/about" className="hover:underline">
            About Us
          </a>

          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
        </div>

        <div className="text-center">
          © {new Date().getFullYear()} PataHao. All rights reserved.
        </div>

      </div>
    </footer>
  );
}