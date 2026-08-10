import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { ChevronRight, Sparkles } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";

function Breadcrumb({ page, subtitle }) {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  return (
    <div className="w-full bg-[#080808] border-b border-white/[0.08] pt-32 pb-16 relative overflow-hidden">
      {/* Background ambient lighting - enhanced glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 subtle-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium font-sans">
            {page}
          </span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight capitalize mb-4 filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {page}
        </h1>

        {subtitle && (
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto mb-6 font-sans">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb Navigation Pill */}
        <nav className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/15 text-xs text-zinc-300 font-sans backdrop-blur-xl shadow-lg">
          <Link to="/" className="hover:text-white transition-colors capitalize">
            {t("home")}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 text-zinc-500 ${isRTL ? "rotate-180" : ""}`} />
          <span className="text-white font-medium capitalize">{page}</span>
        </nav>
      </div>
    </div>
  );
}

Breadcrumb.propTypes = {
  page: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default Breadcrumb;
