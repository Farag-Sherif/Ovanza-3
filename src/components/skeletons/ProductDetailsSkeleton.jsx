export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-44 w-full bg-[#111111] border-b border-white/5 flex flex-col items-center justify-center space-y-3 px-4">
        <div className="h-8 w-60 bg-white/10 rounded-2xl" />
        <div className="h-3 w-40 bg-white/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Image Stage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square w-full rounded-3xl bg-[#141414] border border-white/5" />
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 rounded-2xl bg-[#141414] border border-white/5" />
              ))}
            </div>
          </div>

          {/* Right Column: Meta */}
          <div className="lg:col-span-6 space-y-6 pt-4">
            <div className="h-6 w-32 bg-white/10 rounded-full" />
            <div className="h-10 sm:h-12 w-3/4 bg-white/15 rounded-2xl" />
            <div className="h-32 w-full bg-white/5 rounded-2xl" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-40 bg-white/20 rounded-full" />
              <div className="h-12 w-40 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
