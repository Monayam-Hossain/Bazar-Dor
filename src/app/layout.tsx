import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Navlinks from "@/components/Navlinks";
import Marquee from "@/components/Marquee";
import ToastProviderLoader from "@/components/ToastProviderLoader";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "বাংলাদেশের বর্তমান বাজার দর এবং পণ্যের মূল্য তালিকা",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hindSiliguri.className} h-full antialiased`}>
      <body className="bg-[#f2f4f2] min-h-full flex flex-col">
        <Suspense fallback={<span className="loading loading-ring loading-xs"></span>}>
          <Navbar />
        </Suspense>
        <hr className="border-gray-100" />
        <Suspense fallback={<span className="loading loading-ring loading-xs"></span>}>
          <Navlinks />
        </Suspense>
        <Suspense fallback={<span className="loading loading-ring loading-xs"></span>}>
          <Marquee />
        </Suspense>
        <main className="px-4 sm:px-6 lg:px-8 py-6">{children}</main>
        <Footer />
        <ToastProviderLoader />
      </body>
    </html>
  );
}
