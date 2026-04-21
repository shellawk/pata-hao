import Navbar from "@/components/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-6xl mx-auto p-4 flex items-center justify-center pt-10">
                <div className="w-full max-w-md bg-white rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}