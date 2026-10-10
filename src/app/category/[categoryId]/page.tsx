import { Suspense } from "react";
import CategoryContent from "@/components/CategoryContent";

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <div className="min-h-screen py-8">
      {/* Exact same container as navbar/navlinks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Suspense fallback={<CategoryLoadingSkeleton />}>
          <CategoryContentWrapper params={params} />
        </Suspense>
      </div>
    </div>
  );
}

async function CategoryContentWrapper({ params }: Pick<PageProps, "params">) {
  const { categoryId } = await params;
  return <CategoryContent categoryId={categoryId} />;
}

function CategoryLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white border border-base-200 rounded-2xl p-6 h-28"></div>
      <div className="bg-white border border-base-200 rounded-xl p-4 h-16"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white border border-base-200 rounded-2xl p-5 h-36"
          ></div>
        ))}
      </div>
    </div>
  );
}
