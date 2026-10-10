'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { RxDash } from 'react-icons/rx';

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
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
}

export default function CategoryContent({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        const res = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`
        );
        const data = await res.json();
        const productList = Array.isArray(data) ? data : data.products || [];
        setProducts(productList);
      } catch (error) {
        console.error('Failed to fetch category products', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white border border-base-200 rounded-2xl p-6 h-28"></div>
        <div className="h-16 bg-white border border-base-200 rounded-xl"></div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white h-36 rounded-2xl border border-base-200"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center bg-white border border-base-200 rounded-2xl p-8 space-y-4 shadow-sm">
        <div className="text-5xl">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 max-w-md">
          দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নেই অথবা ক্যাটাগরি আইডিটি সঠিক নয়।
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

  const categoryTitle = products[0]?.categoryNameBn || categoryId;
  const categoryIcon = products[0]?.categoryIcon || '📦';

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'low-to-high') return a.today - b.today;
    if (sortOption === 'high-to-low') return b.today - a.today;
    return 0;
  });

  const formatNumber = (num: number) => num.toLocaleString('bn-BD');

  return (
    <div className="space-y-6">
      
      <div className="bg-white border border-base-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl border border-gray-100">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {categoryTitle}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {formatNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="bg-white border border-base-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        

        <div className="flex ms-auto items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-sm text-gray-600 font-medium">সাজান:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered select-sm rounded-lg bg-white border-gray-300 text-gray-700 focus:outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="p-2">
        <span className="text-sm text-gray-600">
          মোট <span className="font-bold">{formatNumber(products.length)}</span>টি পণ্য দেখানো হচ্ছে
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => {
          const isUp = product.change?.dir === 'up';
          const isDown = product.change?.dir === 'down';

          return (
            <Link
              key={product.id}
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
                  <span className="text-xs text-gray-400 block font-normal">আজকের দাম</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatNumber(product.today)} টাকা
                  </span>
                </div>

                <div
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                    isUp
                      ? 'bg-red-50 text-red-600'
                      : isDown
                      ? 'bg-green-50 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isUp ? <FaCaretUp /> : isDown ? <FaCaretDown /> : <RxDash />}
                  <span>{formatNumber(product.change?.pct || 0)}%</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}