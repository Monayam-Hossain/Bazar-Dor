import Link from "next/link";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { RxDash } from "react-icons/rx";

interface IProduct {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

export default async function ProductSections() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );
  const datas: IProduct[] = await res.json();

  const increasedProducts = datas
    .filter((item) => item.change.dir === "up")
    .slice(0, 6);

  const decreasedProducts = datas
    .filter((item) => item.change.dir === "down")
    .slice(0, 6);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
      {increasedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
            <FaCaretUp className="text-xl text-red-600" />
            <h2>আজ দাম বেড়েছে</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {increasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {decreasedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
            <FaCaretDown className="text-xl text-green-600" />
            <h2>আজ দাম কমেছে</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decreasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section id="sob-ponyo" className="space-y-4 pt-4 scroll-mt-20">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            মোট {datas.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {datas.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: IProduct }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const formatNumber = (num: number) => {
    return num.toLocaleString("bn-BD");
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="card bg-white shadow-sm border border-base-200 rounded-2xl p-4 md:p-5 flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0 border border-gray-100 group-hover:scale-105 transition-transform">
          {product.image}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-base group-hover:text-primary transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
        </div>
      </div>

      <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-400 block font-normal">
            আজকের দাম
          </span>
          <span className="text-lg font-bold text-gray-900">
            {formatNumber(product.today)} টাকা
          </span>
        </div>

        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? <FaCaretUp /> : isDown ? <FaCaretDown /> : <RxDash />}
          <span>{formatNumber(product.change.pct)}%</span>
        </div>
      </div>
    </Link>
  );
}
