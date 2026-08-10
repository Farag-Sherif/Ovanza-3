import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { usePartnersQuery } from "../hooks/queries/usePartnersQuery.js";
import { normalizeImageUrl } from "../utils/imageUtils.js";

export default function OurBrands() {
  const { data: brands = [] } = usePartnersQuery();
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  if (!brands || brands.length === 0) return null;

  // Duplicate brands array to create seamless infinite scroll effect
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section
      id="our-brands"
      className="py-24 bg-[#0a0a0a] border-y border-white/[0.05] relative overflow-hidden flex flex-col items-center justify-center min-h-[40vh]"
    >
      {/* Subtle glowing orb in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/[0.015] rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full relative z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-white/40" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 font-bold">
              {language === "ar" ? "شراكات عالمية موثوقة" : "Global Partnerships"}
            </span>
            <Sparkles className="w-4 h-4 text-white/40" />
          </div>
          <h2 className="text-xl sm:text-2xl font-light text-zinc-500 tracking-widest uppercase">
            {t("ourbrands")}
          </h2>
        </div>

        {/* Infinite Scrolling Marquee Container */}
        <div className="w-full overflow-hidden relative flex items-center">
          
          {/* Gradient Edges for smooth fade in/out */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <motion.div
            className="flex gap-12 sm:gap-20 md:gap-32 w-max items-center"
            animate={{ x: language === "ar" ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
          >
            {marqueeBrands.map((brand, index) => (
              <div
                key={`${brand.id || index}-${index}`}
                className="group relative flex items-center justify-center shrink-0"
              >
                <img
                  src={normalizeImageUrl(brand.image_path)}
                  alt={brand.title || `Brand`}
                  className="max-h-16 md:max-h-20 w-auto max-w-[150px] md:max-w-[200px] object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}