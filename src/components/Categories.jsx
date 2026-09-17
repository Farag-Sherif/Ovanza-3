import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useCategoriesQuery } from "../hooks/queries/useCategoriesQuery.js";
import { normalizeImageUrl, handleImageError } from "../utils/imageUtils.js";
import { motion } from "framer-motion";
import { fadeUp, fadeRight, fadeLeft, staggerContainer } from "../utils/animations.js";

function Categories() {
  const { data: categories = [], isLoading } = useCategoriesQuery();
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

  const isRTL = language === "ar";

  if (!isLoading && categories.length === 0) return null;

  return (
    <section id="our-products" className="bg-[#030303] relative min-h-screen pb-[20vh] overflow-hidden">
      
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-32 lg:pt-48 flex flex-col gap-32">
        {/* Extreme Minimalist Header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col mb-16"
        >
          <motion.span variants={isRTL ? fadeLeft : fadeRight} className="text-xs uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-4">
            {isRTL ? "مجموعات التجميل" : "Collections"}
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl lg:text-[10rem] rtl:text-4xl rtl:md:text-6xl rtl:lg:text-[6rem] font-serif-luxury text-white tracking-tighter rtl:tracking-normal leading-none italic">
            {t("product_groups")}
          </motion.h2>
        </motion.div>

        {/* Sticky Overlapping Panels */}
        <div className="relative w-full min-h-[50vh]">
          {isLoading ? (
            <div className="flex justify-center h-full items-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
          ) : (
            categories.map((category, index) => {
              const categoryName =
                language === "ar"
                  ? category?.translations?.[0]?.name || category?.name || category?.title
                  : category?.translations?.[1]?.name || category?.name || category?.title;

            // Compute stacking logic
            const topOffset = `calc(10vh + ${index * 40}px)`;

            return (
              <motion.div
                key={category.id || index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="sticky w-full h-[70vh] lg:h-[80vh] bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] mb-12 flex flex-col group border border-white/5"
                style={{ top: topOffset, zIndex: index + 1 }}
              >
                {/* Background Image Panel */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={normalizeImageUrl(category.logo_path)}
                    alt={categoryName}
                    className="w-full h-full object-cover filter brightness-[0.5] grayscale-[20%] transition-transform duration-[2s] ease-in-out group-hover:scale-105"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 opacity-90" />
                </div>

                {/* Massive Index */}
                <div className="absolute top-6 lg:top-12 right-6 lg:right-12 z-10 text-[6rem] lg:text-[12rem] font-serif-luxury font-black text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/30 leading-none">
                  0{index + 1}
                </div>

                {/* Content at Bottom */}
                <div className="relative z-10 p-8 lg:p-16 h-full flex flex-col justify-end w-full max-w-4xl">
                  <h3 className="text-5xl lg:text-7xl font-primary font-black uppercase tracking-tight text-white mb-8 group-hover:text-[#d4af37] transition-colors duration-500">
                    {categoryName}
                  </h3>
                  
                  <Link
                    to={`/all-products?categoryId=${category.id}`}
                    className="inline-flex items-center gap-6 px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] w-fit rounded-full magnetic-btn group/btn hover:bg-[#d4af37] transition-colors"
                  >
                    <span>{isRTL ? "اكتشف" : "Discover"}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </motion.div>
            );
          }))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
