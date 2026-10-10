'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ICategory {
  id: string;
  nameBn: string;
  slug: string;
  icon: string;
}

export default function NavLinkItem({ category }: { category: ICategory }) {
  const pathname = usePathname();

  const isActive = pathname === `/category/${category.slug}`;

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
        isActive
          ? "bg-[#0d823a] text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="text-base sm:text-lg">{category.icon}</span>
      <span>{category.nameBn}</span>
    </Link>
  );
}