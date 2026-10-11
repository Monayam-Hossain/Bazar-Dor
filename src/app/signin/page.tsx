"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    if (!user.email || !user.password) {
      toast.error("ইমেইল ও পাসওয়ার্ড উভয়ই দিন");
      return;
    }

    setIsSubmitting(true);

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    setIsSubmitting(false);

    if (data) {
      toast.success("সাইন ইন সফল হয়েছে!");
      router.push("/");
    }
    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    setIsGoogleLoading(false);
    if (error) toast.error(error.message || "Google সাইন ইন ব্যর্থ হয়েছে");
  };

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    setIsGithubLoading(false);
    if (error) toast.error(error.message || "GitHub সাইন ইন ব্যর্থ হয়েছে");
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#0d823a] focus:ring-1 focus:ring-[#0d823a] transition-colors";

  return (
    <div className="flex flex-col items-center py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">সাইন ইন</h1>
        <p className="text-sm text-gray-500 mt-2">
          বিস্তারিত দাম, বাজার তুলনা ও ট্রেন্ডলাইন দেখতে অ্যাকাউন্টে ঢুকুন
        </p>
      </div>

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn w-full bg-[#0d823a] hover:bg-[#0b6b30] text-white border-none rounded-xl font-normal text-base disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "সাইন ইন"
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-gray-200" />
          <span className="text-xs font-medium text-gray-400">অথবা</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        <div className="grid grid-cols-2 font-medium gap-1.25 whitespace-nowrap">
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="btn btn-outline bg-white border-gray-300 hover:bg-gray-50 rounded-xl text-sm text-gray-700 gap-2 disabled:opacity-60"
          >
            {isGoogleLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <FcGoogle className="text-lg" />
            )}
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            onClick={handleGithubSignIn}
            disabled={isGithubLoading}
            className="btn btn-outline bg-white border-gray-300 hover:bg-gray-50 rounded-xl text-sm text-gray-700 gap-2 disabled:opacity-60"
          >
            {isGithubLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <FaGithub className="text-lg text-gray-800" />
            )}
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-[#0d823a] font-medium hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignInPage;
