"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const EditProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [isPending, user, router]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
    };

    if (!newUserData.name?.trim()) {
      toast.error("নাম ঘরটি খালি রাখা যাবে না");
      return;
    }

    setIsUpdating(true);
    const { error } = await authClient.updateUser({
      name: newUserData.name.trim(),
    });
    setIsUpdating(false);

    if (error) {
      toast.error(error.message || "প্রোফাইল আপডেট ব্যর্থ হয়েছে");
    } else {
      toast.success("প্রোফাইল আপডেট হয়েছে");
      router.push("/profile");
    }
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-pulse py-6">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 h-52"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <FiChevronLeft />
        প্রোফাইলে ফিরে যান
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-gray-500 mt-1">আপনার নাম পরিবর্তন করুন</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">তথ্য</h3>

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              নাম
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name || ""}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 focus:outline-none focus:border-[#0d823a] focus:ring-1 focus:ring-[#0d823a] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="btn w-full bg-[#0d823a] hover:bg-[#0b6b30] text-white border-none rounded-xl font-normal text-base disabled:opacity-60"
          >
            {isUpdating ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "আপডেট তথ্য"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
