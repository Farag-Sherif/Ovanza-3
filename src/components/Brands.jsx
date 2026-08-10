import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { useSlidersQuery } from "../hooks/queries/useSlidersQuery.js";

const Brands = () => {
  const { data: images = [] } = useSlidersQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const isRTL = language === "ar";

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] lg:w-[50vw] lg:h-[50vw] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left Column: Editorial Headline */}
          <div className="w-full lg:w-5/12 text-left rtl:text-right">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-white/50" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
                {isRTL ? "إبداع لا متناهي" : "Signature Collection"}
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
            >
              {isRTL ? (
                <>تميز لا يضاهى في عالم <br/><span className="text-outline text-transparent">العناية الفاخرة</span></>
              ) : (
                <>Unrivaled Distinction in <br/><span className="text-outline text-transparent">Luxury Cosmetics</span></>
              )}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg leading-relaxed mb-12 font-light max-w-md"
            >
              {isRTL
                ? "نبتكر تجارب جمال استثنائية من خلال دمج المكونات النادرة مع أحدث التقنيات لنقدم لك جودة لا مثيل لها تلبي تطلعات أرقى الصالونات وخبراء التجميل."
                : "Curated with master craftsmanship and scientific precision to elevate your daily beauty ritual into an extraordinary sensorial experience."}
            </motion.p>

            {/* Premium Slider Controls */}
            {images.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6" 
                dir="ltr"
              >
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-14 h-14 rounded-full border border-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 group magnetic-btn"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-14 h-14 rounded-full border border-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 group magnetic-btn"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="flex-1 max-w-[200px] h-1 bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
                
                <div className="text-sm tracking-[0.2em] text-white font-bold">
                  {String(currentIndex + 1).padStart(2, "0")} <span className="text-white/30">/ {String(images.length).padStart(2, "0")}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Visual Showcase (Immersive) */}
          <div className="w-full lg:w-7/12 flex justify-center items-center mt-12 lg:mt-0">
            <div className="relative w-full max-w-[600px] aspect-[4/5] rounded-3xl bg-[#0a0a0a] overflow-hidden group">
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent z-10 pointer-events-none mix-blend-overlay" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-12"
                >
                  <img
                    src={images[currentIndex]?.image_path}
                    alt={`Showcase ${currentIndex + 1}`}
                    className="w-full h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] filter brightness-110"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
