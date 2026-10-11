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
      className={`flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
        isActive
          ? "bg-[#0d823a] text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="text-sm sm:text-base lg:text-lg">{category.icon}</span>
      <span>{category.nameBn}</span>
    </Link>
  );
}