import { useRef, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { DataContext } from "../contexts/DataContext.jsx";
import { fadeRight, fadeLeft, fadeUp, scaleIn, staggerContainer } from "../utils/animations.js";

export default function HeroV2() {
  const containerRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const { data } = useContext(DataContext);
  const isRTL = language === "ar";
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* Background Media */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ y: y1, scale: scaleImage }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video
          className="w-full h-full object-cover filter contrast-110 grayscale-[10%]"
          autoPlay loop muted playsInline preload="metadata"
        >
          <source src="/hero-optimized-720p.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Foreground Content */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ opacity: opacityText }}
        className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4"
      >
        <motion.div variants={isRTL ? fadeRight : fadeLeft} className="mb-6">
          <p className="text-[#d4af37] text-sm md:text-base tracking-[0.4em] uppercase font-bold">
            {isRTL ? "الوجهة الأرقى للجمال" : "The Ultimate Beauty Destination"}
          </p>
        </motion.div>
        
        <motion.div variants={fadeUp} className="overflow-visible px-8 mb-4">
          {data?.settings?.image_logo_path ? (
            <img 
              src={data.settings.image_logo_path} 
              alt="Ovanza Logo" 
              className="w-[200px] md:w-[400px] lg:w-[600px] h-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mx-auto"
            />
          ) : (
            <h1 className="text-6xl md:text-[8rem] lg:text-[12rem] font-serif-luxury italic text-white leading-none tracking-tighter">
              {isRTL ? "أوفانزا" : "Ovanza"}
            </h1>
          )}
        </motion.div>
        
        <motion.div variants={fadeUp} className="overflow-visible px-8">
          <h2 className="text-3xl md:text-7xl font-primary font-black uppercase text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/80 leading-none mt-2">
            {isRTL ? "لمستحضرات التجميل" : "Cosmetics"}
          </h2>
        </motion.div>

      </motion.div>
    </section>
  );
}
