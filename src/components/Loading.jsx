export default function Loading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-black">
      <div className="relative flex items-center justify-center">
        {/* Subtle spinning gradient ring */}
        <div className="w-10 h-10 rounded-full border-2 border-white/5 border-t-white/50 animate-spin" />
      </div>
      <p className="text-xs uppercase tracking-widest text-zinc-600 font-medium font-sans mt-4">
        Ovanza
      </p>
    </div>
  );
}
