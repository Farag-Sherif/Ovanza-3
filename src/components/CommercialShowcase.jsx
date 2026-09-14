import { useRef, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LanguageContext } from "../contexts/LanguageContext.jsx";

export default function CommercialShowcase() {
  const containerRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-primary uppercase tracking-tighter">
            {isRTL ? "التوجه" : "Creative"} <span className="font-serif-luxury italic text-[#d4af37]">{isRTL ? "الإبداعي" : "Direction"}</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            {isRTL 
              ? "مساحة مخصصة للحملات الإعلانية المستقبلية وجلسات التصوير وصور العلامة التجارية." 
              : "Placeholder for future campaigns, editorial shoots, and brand positioning imagery."}
          </p>
        </motion.div>

        {/* Fancy Placeholders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div style={{ y: y1 }} className="aspect-[3/4] bg-[#111] rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-noise opacity-20 z-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 transition-transform duration-700 group-hover:scale-105">
              <span className="text-2xl font-serif-luxury italic text-white/50 mb-2">01</span>
              <span className="text-4xl font-primary font-black uppercase text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/30 group-hover:-webkit-text-stroke-white transition-all duration-500">
                FANCY
              </span>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="aspect-[3/4] bg-[#111] rounded-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-noise opacity-20 z-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 transition-transform duration-700 group-hover:scale-105">
              <span className="text-2xl font-serif-luxury italic text-white/50 mb-2">02</span>
              <span className="text-4xl font-primary font-black uppercase text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/30 group-hover:-webkit-text-stroke-white transition-all duration-500">
                FANCY
              </span>
            </div>
          </motion.div>

          <motion.div style={{ y: y1 }} className="aspect-[3/4] bg-[#111] rounded-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-noise opacity-20 z-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 transition-transform duration-700 group-hover:scale-105">
              <span className="text-2xl font-serif-luxury italic text-white/50 mb-2">03</span>
              <span className="text-4xl font-primary font-black uppercase text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/30 group-hover:-webkit-text-stroke-white transition-all duration-500">
                FANCY
              </span>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="aspect-[3/4] bg-[#111] rounded-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-noise opacity-20 z-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 transition-transform duration-700 group-hover:scale-105">
              <span className="text-2xl font-serif-luxury italic text-white/50 mb-2">04</span>
              <span className="text-4xl font-primary font-black uppercase text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/30 group-hover:-webkit-text-stroke-white transition-all duration-500">
                FANCY
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
