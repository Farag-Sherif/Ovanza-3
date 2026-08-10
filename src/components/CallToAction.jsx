import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, ShieldCheck } from "lucide-react";

export default function CallToAction() {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const isRTL = language === "ar";

  return (
    <section className="py-24 sm:py-32 bg-black relative overflow-hidden border-t border-white/[0.08]">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] via-[#121212] to-[#0a0a0a] border border-white/[0.1] p-10 sm:p-16 lg:p-20 overflow-hidden shadow-2xl text-center flex flex-col items-center">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 subtle-grid opacity-25 pointer-events-none" />

          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium font-sans">
              {isRTL ? "انضم إلى نخبة المحترفين" : "Experience Ovanza Today"}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight max-w-3xl leading-[1.15] mb-6"
          >
            {isRTL ? (
              <>ارتقِ بتجربة الجمال إلى <span className="text-shimmer">مستوى غير مسبوق</span></>
            ) : (
              <>Elevate Your Beauty Ritual to <span className="text-shimmer">Uncharted Luxury</span></>
            )}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10 font-sans"
          >
            {isRTL
              ? "اكتشف مجموعتنا الكاملة من المستحضرات الاحترافية المصممة لمنحك إشراقة استثنائية وثقة تدوم."
              : "Discover our full catalog of dermatologically certified formulations crafted for luxury salons and discerning individuals."}
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto mb-10"
          >
            <Link
              to="/all-products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 group font-sans"
            >
              <span>{t("all_products")}</span>
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </Link>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-wider uppercase text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 font-sans"
            >
              <Mail className="w-4 h-4 text-zinc-300" />
              <span>{t("contact")}</span>
            </a>
          </motion.div>

          {/* Assurance Tag */}
          <div className="inline-flex items-center gap-2 text-zinc-500 text-xs font-sans">
            <ShieldCheck className="w-4 h-4 text-white/80" />
            <span>{isRTL ? "شحن آمن وضمان جودة معتمد 100%" : "100% Certified Formula Guarantee • Worldwide Shipping"}</span>
          </div>

        </div>
      </div>
    </section>
  );
}
