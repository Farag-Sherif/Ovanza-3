import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

function NotFound() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden py-24 px-4">
      <Helmet>
        <title>404 - Page Not Found | Ovanza Cosmetics</title>
      </Helmet>

      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 subtle-grid opacity-20 pointer-events-none" />

      {/* Main Content Card */}
      <div className="relative z-10 max-w-xl mx-auto text-center">
        {/* Giant 404 Watermark */}
        <div className="text-[120px] sm:text-[180px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/0 leading-none select-none">
          404
        </div>

        <div className="-mt-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium font-sans">
              {t("404_PAGE")}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t("OPPS")}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto font-sans font-light">
            {t("Sorry")}
          </p>

          <div className="pt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>{t("back")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
