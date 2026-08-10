export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 animate-pulse space-y-20">
      {/* Hero Skeleton */}
      <div className="max-w-5xl mx-auto px-4 text-center flex flex-col items-center space-y-6 pt-12">
        <div className="h-6 w-48 bg-white/10 rounded-full" />
        <div className="h-14 sm:h-20 w-4/5 bg-white/15 rounded-3xl" />
        <div className="h-4 w-3/5 bg-white/5 rounded-full" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-36 bg-white/20 rounded-full" />
          <div className="h-12 w-36 bg-white/5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl pt-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-[#141414] border border-white/5" />
          ))}
        </div>
      </div>

      {/* Brands Bar Skeleton */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-[#141414] border border-white/5" />
          ))}
        </div>
      </div>

      {/* Product Categories Skeleton */}
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="h-10 w-64 bg-white/10 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-3xl bg-[#141414] border border-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
