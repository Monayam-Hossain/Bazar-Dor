"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const dateStr = new Date().toLocaleString("bn-BD", {
      dateStyle: "full",
    });
    setFormattedDate(dateStr);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side — Logo & Date */}
          <div className="flex items-center gap-3">
            {/* ✅ Green Logo Box with Your Image */}
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-xl p-1.5">
              <Image
                src="/images/logo-icon.png"
                alt="বাজার দর লোগো"
                width={28}
                height={28}
                className="object-contain"
                // If your image has a white background, add this to blend it:
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>

            {/* Title & Date */}
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Right Side — User Profile */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Rezwan"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-sm font-medium text-gray-700">Rezwan</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  প্রোফাইল
                </a>
                <hr className="my-1 border-gray-100" />
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  লগ আউট
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
