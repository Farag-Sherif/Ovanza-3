export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulse */}
        <div className="absolute w-24 h-24 rounded-full bg-white/5 animate-ping duration-1000" />
        
        {/* Spinning gradient ring */}
        <div className="w-14 h-14 rounded-full border-2 border-white/10 border-t-white animate-spin" />
        
        {/* Center dot */}
        <div className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      </div>

      <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium font-sans mt-6 animate-pulse">
        Ovanza Luxury
      </p>
    </div>
  );
}
