import { useContext, useRef, useEffect } from "react";
import { ArrowDownRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../contexts/LanguageContext.jsx";

export default function Hero() {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  // Awwwards-level physics
  const backgroundY = useTransform(smoothScrollY, [0, 1], ["0%", "40%"]);
  const backgroundScale = useTransform(smoothScrollY, [0, 1], [1, 1.15]);
  const textY1 = useTransform(smoothScrollY, [0, 1], ["0%", "50%"]);
  const textY2 = useTransform(smoothScrollY, [0, 1], ["0%", "80%"]);
  const opacityText = useTransform(smoothScrollY, [0, 0.5], [1, 0]);

  const mediaPath = "/hero-optimized-720p.mp4";
  const mediaType = "video";
  const isRTL = language === "ar";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Split text for stagger animations
  const textLine1 = isRTL ? "أوفانزا" : "Ovanza";
  const textLine2 = isRTL ? "كوزمتكس" : "Cosmetics";

  const letterVariants = {
    hidden: { y: "100%", opacity: 0, rotate: 10 },
    visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full bg-[#030303] overflow-hidden flex flex-col justify-center">
      
      {/* Deep Background Media */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[70vw] h-[80vh] z-0 overflow-hidden"
        style={{ y: backgroundY, scale: backgroundScale, willChange: "transform", transform: "translateZ(0)" }}
      >
        <div className="absolute inset-0 bg-black/30 z-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay z-20"></div>

        {mediaType === "image" && mediaPath && (
          <img
            src={mediaPath}
            alt="Ovanza Hero"
            className="w-full h-full object-cover filter contrast-125 grayscale-[30%] brightness-75"
            fetchpriority="high"
          />
        )}

        {mediaType === "video" && mediaPath && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover filter contrast-125 grayscale-[30%] brightness-75"
            autoPlay loop muted playsInline preload="metadata"
          >
            <source src={mediaPath} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Massive Typography - Mixed Fonts */}
      <motion.div 
        className="relative z-30 w-full flex flex-col items-center justify-center text-center mix-blend-difference pointer-events-none"
        style={{ opacity: opacityText, willChange: "opacity", transform: "translateZ(0)" }}
      >
        <h1 className="flex flex-col items-center font-primary w-full">
          {/* Top Line (Sans-Serif) */}
          <motion.div 
            style={{ y: textY1, willChange: "transform", transform: "translateZ(0)" }}
            className="overflow-hidden flex gap-2 sm:gap-4 lg:gap-8 mb-[-4vw] sm:mb-[-2vw]"
          >
            {textLine1.split("").map((char, index) => (
              <motion.span 
                key={`l1-${index}`}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                transition={{ delay: index * 0.05 }}
                className={`text-[4rem] sm:text-[8rem] lg:text-[14rem] font-black uppercase text-white tracking-tighter inline-block ${char === " " ? "w-10 sm:w-20 lg:w-40" : ""}`}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Bottom Line (Serif Luxury) */}
          <motion.div 
            style={{ y: textY2, willChange: "transform", transform: "translateZ(0)" }}
            className="overflow-hidden flex gap-2"
          >
            {textLine2.split("").map((char, index) => (
              <motion.span 
                key={`l2-${index}`}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                custom={index + textLine1.length}
                transition={{ delay: (index + textLine1.length) * 0.05 }}
                className={`text-[5rem] sm:text-[10rem] lg:text-[18rem] font-serif-luxury italic text-[#d4af37] tracking-tight inline-block ${char === " " ? "w-10 sm:w-20 lg:w-40" : ""}`}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </h1>
      </motion.div>

      {/* Avant-Garde Details & CTAs */}
      <div className="absolute bottom-12 left-6 lg:left-12 z-30 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold">{isRTL ? "مستحضرات تجميل فاخرة" : "LUXURY COSMETICS"}</span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/50">{isRTL ? "حيث تلتقي العلامات التجارية بالاكتشاف" : "WHERE BRANDS MEET DISCOVERY."}</span>
        </div>
        <div className="flex gap-4">
          <a href="/all-products" className="px-6 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-[#d4af37] hover:text-black transition-colors duration-300">
            {isRTL ? "اكتشف المنتجات" : "Discover Products"}
          </a>
          <a href="/brands" className="px-6 py-3 border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors duration-300">
            {isRTL ? "العلامات التجارية" : "Explore Brands"}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a 
        href="#featured-products"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-12 right-6 lg:right-12 z-30 group flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 hover:border-[#d4af37] transition-colors duration-500 overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 bg-[#d4af37]"
          initial={{ y: "100%" }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        <ArrowDownRight className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10 group-hover:text-black transition-colors duration-500" />
      </a>

    </section>
  );
}
