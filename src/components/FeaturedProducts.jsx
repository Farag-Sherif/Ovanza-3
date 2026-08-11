import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useProductsQuery } from "../hooks/queries/useProductsQuery.js";
import { getProductImageUrl, handleImageError } from "../utils/imageUtils.js";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FeaturedProducts() {
  const { data: allProducts = [], isLoading } = useProductsQuery();
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map scroll progress to horizontal translation
  const isRTL = language === "ar";
  const xTransform = useTransform(smoothProgress, [0, 1], isRTL ? ["0%", "80%"] : ["0%", "-80%"]);
  
  // Skew effect based on scroll velocity (simulated via position difference, but we'll use a simpler mapping for reliability)
  // To keep it clean and robust, we'll map scale and opacity to individual items in view.

  const products = (allProducts || []).slice(0, 8);

  if (!isLoading && products.length === 0) return null;

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#030303]" id="featured-products">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#d4af37]/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />

        {/* Header (Absolute in sticky container) */}
        <div className="absolute top-12 md:top-24 left-6 md:left-12 lg:left-24 z-20 flex flex-col pointer-events-none">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif-luxury italic text-white tracking-tight">
            {isRTL ? "مختارات" : "Curated"}<br/>
            <span className="font-primary not-italic font-black text-outline uppercase">{isRTL ? "حصرية" : "Collection"}</span>
          </h2>
        </div>

        {/* Horizontal Scrolling Track */}
        <motion.div 
          style={{ x: xTransform, willChange: "transform", transform: "translateZ(0)" }} 
          className="flex items-center gap-16 lg:gap-32 pl-6 md:pl-24 lg:pl-[30vw] relative z-10"
        >
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="w-[300px] md:w-[450px] lg:w-[600px] aspect-[3/4] bg-white/[0.02] shrink-0 animate-pulse" />
            ))
          ) : (
            products.map((product, idx) => {
              const productName = language === "ar" 
                ? product?.translations?.[0]?.name || product?.name 
                : product?.translations?.[1]?.name || product?.name;

              return (
                <div key={product.id || idx} className="shrink-0 w-[300px] md:w-[450px] lg:w-[500px] group">
                  <Link to={`/product-details/${product.id}`} className="block relative w-full aspect-[4/5] overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-700 ease-[0.76,0,0.24,1]">
                    
                    {/* Image Layer */}
                    <div className="absolute inset-0 p-8 lg:p-16 flex items-center justify-center">
                      <img
                        src={getProductImageUrl(product)}
                        alt={productName}
                        className="max-h-[100%] max-w-[100%] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => handleImageError(e, product)}
                      />
                    </div>

                    {/* Number Index */}
                    <div className="absolute top-6 left-6 text-6xl font-serif-luxury text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/20 group-hover:-webkit-text-stroke-[#d4af37] transition-colors duration-700">
                      0{idx + 1}
                    </div>

                    {/* View overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-xs font-bold uppercase tracking-[0.3em] font-primary flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                        {t("product_details")}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </span>
                    </div>
                  </Link>

                  {/* Info Layer */}
                  <div className="mt-8 flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.3em] font-bold">
                      {idx % 3 === 0 ? "Bestseller" : "Salon Grade"}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-wider font-primary truncate">
                      {productName}
                    </h3>
                  </div>
                </div>
              );
            })
          )}
          
          {/* View All Card at the end */}
          <div className="shrink-0 w-[300px] md:w-[450px] lg:w-[500px] flex items-center justify-center h-[50vh]">
            <Link to="/all-products" className="flex flex-col items-center gap-6 group">
              <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-700 overflow-hidden relative">
                 <ArrowRight className={`w-8 h-8 text-white relative z-10 group-hover:text-black transition-colors duration-700 ${isRTL ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
              </div>
              <span className="text-xl font-bold uppercase tracking-[0.2em] font-primary group-hover:text-[#d4af37] transition-colors">
                {t("all_products")}
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
