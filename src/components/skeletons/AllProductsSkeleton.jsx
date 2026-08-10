export default function AllProductsSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-44 w-full bg-[#111111] border-b border-white/5 flex flex-col items-center justify-center space-y-3 px-4">
        <div className="h-8 w-48 bg-white/10 rounded-2xl" />
        <div className="h-3 w-80 bg-white/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Category Pills Skeleton */}
        <div className="flex gap-3 overflow-x-auto py-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-28 flex-shrink-0 bg-[#181818] rounded-full border border-white/5" />
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div className="flex justify-between items-center pb-6 border-b border-white/5">
          <div className="h-4 w-40 bg-white/10 rounded-full" />
          <div className="h-10 w-72 bg-[#181818] rounded-full border border-white/5" />
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-96 rounded-3xl bg-[#141414] border border-white/5 p-6 flex flex-col justify-between"
            >
              <div className="w-full aspect-square rounded-2xl bg-white/5" />
              <div className="space-y-2 pt-4">
                <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                <div className="h-3 w-1/2 bg-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
