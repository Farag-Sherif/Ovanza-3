import { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useBlogsQuery } from "../../hooks/queries/useBlogsQuery";
import { normalizeImageUrl, handleImageError } from "../../utils/imageUtils.js";

const BlogPostsNoSidebar = () => {
  const { language } = useContext(LanguageContext);
  const { data: rawBlogs = [] } = useBlogsQuery();
  const { t } = useTranslation();
  const isRTL = language === "ar";

  const blogData = [...rawBlogs].sort((a, b) => {
    const dateComparison = new Date(b.created_at) - new Date(a.created_at);
    return dateComparison === 0 ? b.id - a.id : dateComparison;
  });

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      {blogData.map((post, idx) => {
        const translation =
          post.translations?.find((tr) => tr.locale === language) ||
          post.translations?.[isRTL ? 0 : 1] ||
          post.translations?.[0] ||
          {};

        const postTitle = translation.title || "Editorial Article";
        const rawContent = (translation.content || "").replace(/<[^>]*>?/gm, "");
        const excerpt = rawContent.slice(0, 110) + "...";

        return (
          <motion.div
            key={post.id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (idx % 6) * 0.08 }}
            className="group rounded-3xl bg-[#141414] hover:bg-[#1a1a1a] border border-white/[0.08] hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Image Stage */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181818]">
              <Link to={`/post/${post.id}`} className="block w-full h-full">
                <img
                  src={normalizeImageUrl(post.image_path)}
                  alt={postTitle}
                  className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleImageError(e)}
                />
              </Link>

              {/* Date Badge */}
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 font-mono">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  <span>
                    {new Date(post.created_at || Date.now()).toLocaleDateString(
                      isRTL ? "ar-EG" : "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors leading-snug line-clamp-2">
                  <Link to={`/post/${post.id}`}>{postTitle}</Link>
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans line-clamp-3">
                  {excerpt}
                </p>
              </div>

              {/* Read More Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <Link
                  to={`/post/${post.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-zinc-300 transition-colors font-sans group/btn"
                >
                  <span>{t("readMore")}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform ${
                      isRTL ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BlogPostsNoSidebar;
