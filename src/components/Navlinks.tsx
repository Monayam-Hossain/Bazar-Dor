import NavLinkItem from "./NavLinkItem";

interface ICategory {
  id: string;
  nameBn: string;
  slug: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { cache: "no-store" },
  );
  const datas: ICategory[] = await res.json();

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 sm:gap-3 py-3 overflow-x-auto scrollbar-hide">
          {datas.map((data) => (
            <NavLinkItem key={data.id} category={data} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navlinks;
