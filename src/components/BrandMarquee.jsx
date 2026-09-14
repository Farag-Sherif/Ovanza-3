import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { getPartners } from "../services/partnersService.js";
import { motion, useScroll, useTransform } from "framer-motion";
import { LanguageContext } from "../contexts/LanguageContext.jsx";

export default function BrandMarquee() {
  const [brands, setBrands] = useState([]);
  const containerRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  useEffect(() => {
    getPartners().then(data => setBrands(data || []));
  }, []);

  if (!brands.length) return null;

  return (
    <section ref={containerRef} className="py-32 bg-[#050505] overflow-hidden border-t border-white/5 relative">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none z-0" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-sm md:text-base font-bold tracking-[0.4em] uppercase text-zinc-500">
          {isRTL ? "مجموعة العلامات التجارية" : "Curated Brands"}
        </h2>
      </div>

      <div className="flex flex-col gap-12 relative z-10">
        <motion.div style={{ x: xLeft }} className="flex gap-12 whitespace-nowrap px-12">
          {Array(10).fill(brands).flat().map((b, i) => {
            const brandName = b?.name || "Vanza Cosmetics";
            return (
              <Link key={i} to={`/brands/${b?.id || ''}`} className="text-5xl md:text-8xl font-black font-primary uppercase text-outline">
                {brandName}
              </Link>
            );
          })}
        </motion.div>
        
        <motion.div style={{ x: xRight }} className="flex gap-12 whitespace-nowrap px-12">
          {Array(10).fill(brands).flat().map((b, i) => {
            const brandName = b?.name || "Vanza Cosmetics";
            return (
              <Link key={i} to={`/brands/${b?.id || ''}`} className="text-5xl md:text-8xl font-serif-luxury italic text-[#d4af37] opacity-40 hover:opacity-100 transition-all duration-300">
                {brandName}
              </Link>
            );
          })}
        </motion.div>
      </div>
      
      <div className="flex justify-center mt-24 relative z-10">
         <Link to="/brands" className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-zinc-200 transition-colors">
            {isRTL ? "عرض كل العلامات" : "View All Brands"}
         </Link>
      </div>
    </section>
  );
}
