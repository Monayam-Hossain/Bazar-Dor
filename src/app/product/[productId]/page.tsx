import { Suspense } from "react";
import Link from "next/link";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { RxDash } from "react-icons/rx";
import { FiChevronRight } from "react-icons/fi";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
}

interface PageProps {
  params: Promise<{ productId: string }>;
}

async function getProduct(productId: string): Promise<IProduct | null> {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default function ProductDetailsPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetailsContent params={params} />
      </Suspense>
    </div>
  );
}

async function ProductDetailsContent({ params }: Pick<PageProps, "params">) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center bg-white border border-base-200 rounded-2xl p-8 space-y-4 shadow-sm">
        <div className="text-5xl">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800">পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 max-w-md">
          দুঃখিত, এই পণ্যটি খুঁজে পাওয়া যায়নি অথবা আইডিটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="btn bg-[#0d823a] hover:bg-[#0b6b30] text-white border-none px-6 rounded-xl font-normal shadow-md"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const formatNumber = (num: number) => num.toLocaleString("bn-BD");

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const allMins = product.markets.map((m) => m.min);
  const allMaxs = product.markets.map((m) => m.max);
  const lowestPrice = Math.min(...allMins);
  const highestPrice = Math.max(...allMaxs);
  const averagePrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );

  const stats = [
    {
      label: "সর্বনিম্ন দাম",
      value: lowestPrice,
      note: "সবগুলো বাজারের মধ্যে",
      color: "text-green-600",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: highestPrice,
      note: "সবগুলো বাজারের মধ্যে",
      color: "text-red-600",
    },
    {
      label: "গড় দাম",
      value: averagePrice,
      note: "সব বাজারের গড় হিসেবে",
      color: "text-gray-900",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#0d823a] transition-colors">
          হোম
        </Link>
        <FiChevronRight className="text-gray-300" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#0d823a] transition-colors"
        >
          {product.categoryNameBn}
        </Link>
        <FiChevronRight className="text-gray-300" />
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </div>

      <div className="bg-white border border-base-200 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl border border-gray-100 shrink-0">
            {product.image}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge badge-outline border-[#0d823a] text-[#0d823a] bg-green-50 font-normal rounded-lg">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="badge badge-outline border-gray-300 text-gray-500 font-normal rounded-lg">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {formatNumber(product.markets.length)}টি বাজারে সর্বনিম্ন{" "}
              {formatNumber(lowestPrice)} টাকা থেকে সর্বোচ্চ{" "}
              {formatNumber(highestPrice)} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">
              সরকারের ক্রয়মূল্যের আয়াত সীমা (সর্বোচ্চ - সর্বনিম্ন)
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-center shrink-0">
          <span className="text-xs text-gray-400 block font-normal">
            আজকের দাম
          </span>
          <span className="text-4xl font-bold text-gray-900 leading-tight">
            {formatNumber(product.today)}
          </span>
          <span className="text-sm text-gray-500 block">
            টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
          </span>
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold mt-2 ${
              isUp
                ? "bg-red-50 text-red-600"
                : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {isUp ? <FaCaretUp /> : isDown ? <FaCaretDown /> : <RxDash />}
            <span>{formatNumber(product.change?.pct || 0)}%</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-base-200 rounded-2xl p-5 shadow-sm"
            >
              <span className="text-sm text-gray-500 block">{stat.label}</span>
              <span className={`text-3xl font-bold ${stat.color}`}>
                {formatNumber(stat.value)}
                <span className="text-base font-medium"> টাকা</span>
              </span>
              <p className="text-xs text-gray-400 mt-1">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="bg-white border border-base-200 rounded-2xl shadow-sm overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-100">
                <th className="font-medium">বাজার</th>
                <th className="font-medium">বিভাগ</th>
                <th className="font-medium text-right">সর্বনিম্ন</th>
                <th className="font-medium text-right">সর্বোচ্চ</th>
                <th className="font-medium text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m) => (
                <tr key={m.market} className="text-gray-800 text-sm">
                  <td className="font-medium">{m.market}</td>
                  <td className="text-gray-500">{m.division}</td>
                  <td className="text-right">{formatNumber(m.min)} টাকা</td>
                  <td className="text-right">{formatNumber(m.max)} টাকা</td>
                  <td className="text-right font-semibold">
                    {formatNumber(Math.round((m.min + m.max) / 2))} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 w-64 bg-gray-200 rounded"></div>
      <div className="bg-white border border-base-200 rounded-2xl p-6 h-32"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="bg-white border border-base-200 rounded-2xl p-5 h-28"
          ></div>
        ))}
      </div>
      <div className="bg-white border border-base-200 rounded-2xl p-5 h-96"></div>
    </div>
  );
}
