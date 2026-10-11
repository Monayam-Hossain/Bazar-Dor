"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [isPending, user, router]);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    } else {
      toast.success("সাইন আউট হয়েছে");
      router.push("/signin");
    }
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-pulse py-6">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 h-28"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0 relative">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white bg-green-600">
                {user.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900 truncate">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          
          <Link
            href="/profile/edit"
            className="btn bg-[#0d823a] hover:bg-[#0b6b30] text-white border-none rounded-xl font-normal btn-sm gap-2"
          >
            <FiEdit2 />
            আপডেট
          </Link>
          <button
            onClick={handleSignOut}
            className="btn btn-outline border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-xl font-normal btn-sm gap-2"
          >
            <FiLogOut />
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
