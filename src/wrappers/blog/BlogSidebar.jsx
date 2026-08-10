import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/api";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Sparkles, Calendar, ChevronRight } from "lucide-react";
import { normalizeImageUrl, handleImageError } from "../../utils/imageUtils.js";

const BlogSidebar = () => {
  const { language } = useContext(LanguageContext);
  const [blogFeaturedData, setBlogFeaturedData] = useState([]);
  const isRTL = language === "ar";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/blogs");
        const sortedPosts = (response.data.data || response.data)
          .sort((a, b) => {
            const dateComparison =
              new Date(b.created_at) - new Date(a.created_at);
            return dateComparison === 0 ? b.id - a.id : dateComparison;
          })
          .slice(0, 5);
        setBlogFeaturedData(sortedPosts);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <aside
      className="p-6 sm:p-7 bg-[#141414] border border-white/[0.08] rounded-3xl shadow-2xl space-y-6 sticky top-28"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-2 pb-4 border-b border-white/[0.08]">
        <Sparkles className="w-4 h-4 text-zinc-400" />
        <h4 className="text-base font-bold text-white uppercase tracking-wider">
          {isRTL ? "أحدث المقالات" : "Recent Stories"}
        </h4>
      </div>

      <div className="space-y-4">
        {blogFeaturedData.map((single) => {
          const translation =
            single.translations?.find((t) => t.locale === language) ||
            single.translations?.[isRTL ? 0 : 1] ||
            single.translations?.[0] ||
            {};

          const title = translation.title || "Editorial Story";

          return (
            <Link
              key={single.id}
              to={`/post/${single?.id}`}
              className="flex items-center gap-4 group p-2.5 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 border border-transparent hover:border-white/5"
            >
              <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden bg-[#181818]">
                <img
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  src={normalizeImageUrl(single?.image_path)}
                  alt={title}
                  onError={(e) => handleImageError(e)}
                  loading="lazy"
                />
              </div>

              <div className="flex-grow min-w-0">
                <h5 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                  {title}
                </h5>
                <span className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1 font-mono">
                  <Calendar className="w-2.5 h-2.5" />
                  {new Date(single.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default BlogSidebar;
