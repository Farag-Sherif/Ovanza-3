import { useContext, useRef } from "react";
import { DataContext } from "../contexts/DataContext.jsx";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

function QuoteSection() {
  const { data } = useContext(DataContext);
  const { language } = useContext(LanguageContext);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  const isRTL = language === "ar";
  const quoteText =
    isRTL
      ? "نحن نسعى دائماً لتقديم أفضل الخدمات والمنتجات لعملائنا الكرام، ونلتزم بأعلى معايير الجودة والتميز في كل ما نقدمه"
      : "We consistently strive to provide the best services and products to our valued customers, maintaining the highest standards of quality and excellence in everything we offer.";

  const backImage = data?.settings?.logos_back_path;

  return (
    <section
      id="quote"
      ref={containerRef}
      className="py-32 sm:py-48 bg-[#050505] relative overflow-hidden flex items-center justify-center min-h-[70vh]"
    >
      {/* Cinematic Parallax Background Image */}
      {backImage && (
        <motion.div
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat filter brightness-[0.4] grayscale-[30%] pointer-events-none"
          style={{ 
            backgroundImage: `url('${backImage}')`,
            y: yBackground 
          }}
        />
      )}

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
        <motion.div
          style={{ opacity: opacityText, scale: scaleText }}
          className="flex flex-col items-center"
        >
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 mb-12 opacity-70">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs uppercase tracking-[0.3em] text-white font-bold font-sans">
              {isRTL ? "ميثاق أوفانزا للتميز" : "The Ovanza Manifesto"}
            </span>
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          {/* Massive Editorial Quote */}
          <blockquote className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.2] mb-12 max-w-5xl mx-auto font-primary tracking-tight">
            "{quoteText}"
          </blockquote>

          {/* Decorative Bottom Element */}
          <div className="w-px h-24 bg-gradient-to-b from-white to-transparent opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}

export default QuoteSection;
