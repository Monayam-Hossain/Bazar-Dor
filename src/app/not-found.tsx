import Link from "next/link";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-7xl min-h-[70vh] flex items-center justify-center py-10">
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-16 sm:py-24 text-center">
        <div className="text-6xl sm:text-7xl mb-6">🔍</div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          প্যাজটি পাওয়া যায়নি
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mb-8">
          দুঃখিত, এই প্যাজটি খুঁজে পাওয়া যায়নি অথবা লিংকটি সঠিক নয়।
        </p>

        <Link
          href="/"
          className="btn bg-[#0d823a] hover:bg-[#0b6b30] text-white border-none rounded-xl px-8 font-normal"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
