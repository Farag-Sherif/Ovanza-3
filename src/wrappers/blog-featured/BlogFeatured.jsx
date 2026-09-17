import { useState, useContext } from "react";
import PropTypes from "prop-types";
import BlogFeaturedFiveSingle from "../../components/BlogFeaturedFiveSingle";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogsQuery } from "../../hooks/queries/useBlogsQuery";
import { motion } from "framer-motion";

const BlogFeatured = ({ spaceTopClass, spaceBottomClass }) => {
  const { language } = useContext(LanguageContext);
  const { data: blogFeaturedData = [], isLoading } = useBlogsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const isRTL = language === "ar";

  if (!isLoading && (!blogFeaturedData || blogFeaturedData.length === 0)) {
    return null;
  }

  const totalPages = Math.ceil(blogFeaturedData.length / postsPerPage);

  return (
    <section
      className={`py-24 sm:py-32 bg-black relative overflow-hidden border-t border-white/[0.08] ${
        spaceTopClass || ""
      } ${spaceBottomClass || ""}`}
      id="blog"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left rtl:md:text-right w-full"
        >
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-4 block">
                {isRTL ? "المجلة والمدونة" : "Editorial & Insights"}
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[7rem] rtl:text-4xl rtl:md:text-6xl rtl:lg:text-[5rem] font-serif-luxury italic text-white tracking-tighter rtl:tracking-normal leading-none mb-2">
                {isRTL ? "أحدث المقالات" : "Latest"}
                <br />
                <span className="font-primary not-italic font-black text-outline uppercase">{isRTL ? "وأسرار العناية" : "Articles"}</span>
              </h2>
            </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white group transition-colors self-start md:self-auto"
          >
            <span>{isRTL ? "جميع المقالات" : "View All Articles"}</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </Link>
        </motion.div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-[#141414] animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogFeaturedData
              .slice(
                (currentPage - 1) * postsPerPage,
                currentPage * postsPerPage
              )
              .map((singlePost) => (
                <BlogFeaturedFiveSingle
                  singlePost={singlePost}
                  key={singlePost.id}
                />
              ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            className="flex justify-center items-center gap-3 mt-14"
            dir="ltr"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full bg-[#181818] hover:bg-[#252525] border border-white/10 hover:border-white/30 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                    currentPage === index + 1
                      ? "bg-white text-black font-bold shadow-lg scale-105"
                      : "bg-[#181818] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full bg-[#181818] hover:bg-[#252525] border border-white/10 hover:border-white/30 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

BlogFeatured.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BlogFeatured;
