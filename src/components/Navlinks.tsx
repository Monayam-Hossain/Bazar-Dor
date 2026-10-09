import Link from "next/link";

interface ICategory {
  id: string;
  nameBn: string;
  slug: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      cache: "no-store",
    },
  );
  const datas: ICategory[] = await res.json();

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-3">
        <nav className="flex items-center gap-1 sm:gap-2 py-3 overflow-x-auto scrollbar-hide">
          {datas.map((data) => (
            <Link
              key={data.id}
              href={`/categories/${data.slug}`}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              <span className="text-base sm:text-lg">{data.icon}</span>

              <span className="font-medium">{data.nameBn}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navlinks;
