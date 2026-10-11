const ProductCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-100 rounded w-1/3"></div>
      </div>
    </div>
    <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-16"></div>
        <div className="h-5 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

const SectionSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
      <div className="h-5 bg-gray-200 rounded w-36"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

const LoadingPage = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 flex items-center justify-between gap-6">
        <div className="space-y-4 flex-1 max-w-lg">
          <div className="h-3 bg-gray-200 rounded w-32"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full"></div>
            <div className="h-3 bg-gray-100 rounded w-5/6"></div>
          </div>
          <div className="h-11 w-32 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="hidden sm:block w-40 h-40 md:w-52 md:h-52 bg-gray-100 rounded-2xl shrink-0"></div>
      </div>

      <SectionSkeleton count={6} />

      <SectionSkeleton count={6} />
    </div>
  );
};

export default LoadingPage;
