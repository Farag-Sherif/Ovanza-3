import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogPagination = () => {
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  return (
    <div
      className="flex justify-center mt-12"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <nav className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#141414] border border-white/[0.08]">
        <button
          aria-label="Previous Page"
          className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
        </button>

        <button className="w-9 h-9 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center shadow-md">
          1
        </button>

        <button className="w-9 h-9 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer">
          2
        </button>

        <button
          aria-label="Next Page"
          className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
        </button>
      </nav>
    </div>
  );
};

export default BlogPagination;
