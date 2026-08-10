export default function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-44 w-full bg-[#111111] border-b border-white/5 flex flex-col items-center justify-center space-y-3 px-4">
        <div className="h-8 w-44 bg-white/10 rounded-2xl" />
        <div className="h-3 w-80 bg-white/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-96 rounded-3xl bg-[#141414] border border-white/5 p-6 flex flex-col justify-between"
            >
              <div className="w-full h-44 rounded-2xl bg-white/5" />
              <div className="space-y-3 pt-4">
                <div className="h-5 w-4/5 bg-white/10 rounded-full" />
                <div className="h-3 w-full bg-white/5 rounded-full" />
                <div className="h-3 w-2/3 bg-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
