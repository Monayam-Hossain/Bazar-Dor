"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date().toLocaleString("bn-BD", {
    dateStyle: "full",
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    } else {
      toast.success("সাইন আউট হয়েছে");
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-xl p-1.5">
                <Image
                  src="/images/logo-icon.png"
                  alt="বাজার দর লোগো"
                  width={28}
                  height={28}
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  বাজার দর
                </h1>
                <p className="text-xs text-gray-500 leading-tight">
                  {formattedDate}
                </p>
              </div>
            </div>
          </Link>

          {isPending ? (
            <div className="h-9 w-28 bg-gray-100 rounded-lg animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 relative">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold text-white bg-green-600">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>

                <FiChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-300 shrink-0 relative">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          width={44}
                          height={44}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-base font-bold text-white bg-green-600">
                          {user.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="py-1.5">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiUser className="text-gray-400" />
                      প্রোফাইল
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="text-red-400" />
                      সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm bg-[#0d823a] hover:bg-[#0b6b30] text-white border-none rounded-lg px-5 font-normal"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
