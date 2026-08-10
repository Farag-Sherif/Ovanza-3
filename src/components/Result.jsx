import { useContext } from "react";
import { DataContext } from "../contexts/DataContext.jsx";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Result() {
  const { data } = useContext(DataContext);
  const { language } = useContext(LanguageContext);

  const bannerText =
    language === "ar"
      ? data?.settings?.translations?.[0]?.banner_text || "رواد صناعة الجمال والعناية المتكاملة"
      : data?.settings?.translations?.[1]?.banner_text || "Pioneers in Professional Luxury Cosmetics";

  const bannerImage = data?.settings?.banner_image
    ? `https://admin.ovanzacosmetics.com/storage/app/public/${data.settings.banner_image}`
    : null;

  return (
    <section className="relative py-24 bg-black overflow-hidden border-t border-white/[0.08]">
      {/* Background Banner with Clear Visibility */}
      {bannerImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.75] contrast-110 scale-105"
          style={{ backgroundImage: `url('${bannerImage}')` }}
        />
      )}

      {/* Transparent Soft Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 backdrop-blur-[1px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 mb-6 backdrop-blur-xl shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span className="text-xs uppercase tracking-widest text-white font-medium font-sans">
            {language === "ar" ? "رؤيتنا المستقبلية" : "Our Commitment"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-tight max-w-4xl mx-auto filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
        >
          {bannerText}
        </motion.h2>
      </div>
    </section>
  );
}
