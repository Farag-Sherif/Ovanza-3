export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-64 sm:h-80 w-full rounded-3xl bg-[#141414] border border-white/5 flex flex-col items-center justify-center p-8 space-y-4">
        <div className="h-4 w-32 bg-white/10 rounded-full" />
        <div className="h-8 sm:h-12 w-3/4 max-w-lg bg-white/15 rounded-2xl" />
        <div className="h-4 w-1/2 max-w-md bg-white/5 rounded-full" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-80 rounded-3xl bg-[#141414] border border-white/5 p-6 flex flex-col justify-between"
          >
            <div className="w-full h-44 rounded-2xl bg-white/5" />
            <div className="space-y-2 pt-4">
              <div className="h-4 w-2/3 bg-white/10 rounded-full" />
              <div className="h-3 w-1/2 bg-white/5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
