import { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DataContext } from "../contexts/DataContext.jsx";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { useSocialsQuery } from "../hooks/queries/useSocialsQuery.js";

export default function Footer() {
  const { data } = useContext(DataContext);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const { data: socials = [] } = useSocialsQuery();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isRTL = language === "ar";
  const settings = data?.settings || {};
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (url = "") => {
    const lower = url.toLowerCase();
    if (lower.includes("facebook")) return <FaFacebookF size={18} />;
    if (lower.includes("twitter") || lower.includes("x.com")) return <FaTwitter size={18} />;
    if (lower.includes("instagram")) return <FaInstagram size={18} />;
    if (lower.includes("snapchat")) return <FaSnapchatGhost size={18} />;
    if (lower.includes("tiktok")) return <FaTiktok size={18} />;
    if (lower.includes("youtube")) return <FaYoutube size={18} />;
    if (lower.includes("linkedin")) return <FaLinkedinIn size={18} />;
    return <Sparkles size={18} />;
  };

  const catalogUrl = settings?.about_file_path;

  return (
    <footer
      className="bg-[#050505] text-white pt-24 sm:pt-32 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Cinematic Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Main Footer Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col min-h-[50vh] justify-between">
        
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 pb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Link to="/" className="inline-block focus:outline-none w-max">
              {settings?.image_logo_path ? (
                <img
                  src={settings.image_logo_path}
                  alt={t("company_name")}
                  className="h-12 sm:h-16 w-auto object-contain transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="text-3xl font-black tracking-tighter uppercase font-primary">
                  {t("company_name")}
                </span>
              )}
            </Link>

            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-sm font-sans font-light">
              {isRTL
                ? "العلامة الرائدة في صناعة وتوزيع أرقى مستحضرات التجميل والعناية الاحترافية للصالونات والخبراء. نصنع الجمال بشغف ونقدم تجربة لا تُنسى."
                : "The gold standard in luxury cosmetic formulations and professional salon care lines worldwide. We engineer beauty with uncompromising passion."}
            </p>

            {/* Socials - Premium layout */}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {socials.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-white/10 hover:border-white text-zinc-500 hover:text-black hover:bg-white flex items-center justify-center transition-all duration-500 group"
                    aria-label="Social Link"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-500">
                      {getSocialIcon(item.link)}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-8">
            
            {/* Quick Links */}
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold">
                {isRTL ? "روابط سريعة" : "Navigation"}
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to="/" className="text-zinc-500 hover:text-white transition-colors relative group inline-block">
                    <span className="relative z-10">{t("home")}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="text-zinc-500 hover:text-white transition-colors relative group inline-block">
                    <span className="relative z-10">{t("aboutUs")}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/all-products" className="text-zinc-500 hover:text-white transition-colors relative group inline-block">
                    <span className="relative z-10">{t("products")}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-zinc-500 hover:text-white transition-colors relative group inline-block">
                    <span className="relative z-10">{t("blog")}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Collections */}
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold">
                {isRTL ? "المجموعات" : "Collections"}
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to="/all-products" className="text-zinc-500 hover:text-white transition-colors relative group inline-block">
                    <span className="relative z-10">{t("product_groups")}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/all-products" className="text-zinc-500 hover:text-white transition-colors relative group inline-block">
                    <span className="relative z-10">{isRTL ? "العناية الاحترافية" : "Professional Care"}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                {catalogUrl && (
                  <li>
                    <a
                      href={catalogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors relative group"
                    >
                      <span className="relative z-10">{t("catalog")}</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6 sm:col-span-1 col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold">
                {t("contact")}
              </h4>
              <div className="space-y-5 text-sm text-zinc-500">
                {settings.addresse && (
                  <div className="flex items-start gap-3 group cursor-default">
                    <MapPin className="w-4 h-4 mt-0.5 group-hover:text-white transition-colors" />
                    <span className="text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">{settings.addresse}</span>
                  </div>
                )}
                {settings.phone && (
                  <div className="flex items-center gap-3 group">
                    <Phone className="w-4 h-4 group-hover:text-white transition-colors" />
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-xs hover:text-white transition-colors font-mono"
                      dir="ltr"
                    >
                      {settings.phone}
                    </a>
                  </div>
                )}
                {settings.email && (
                  <div className="flex items-center gap-3 group">
                    <Mail className="w-4 h-4 group-hover:text-white transition-colors" />
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-xs hover:text-white transition-colors"
                    >
                      {settings.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Massive Typography & Copyright */}
        <div className="border-t border-white/10 pt-12 pb-8 flex flex-col items-center">
          
          <div className="w-full flex justify-between items-center mb-12 sm:mb-20">
            <div className="text-xs text-zinc-600 uppercase tracking-widest">
              © {currentYear} {t("company_name")}
            </div>
            
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-white hover:text-zinc-400 transition-colors group"
            >
              <span>{isRTL ? "الأعلى" : "Back to top"}</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                <ArrowUp className="w-3.5 h-3.5 group-hover:text-black transition-colors" />
              </div>
            </button>
          </div>

          {/* MASSIVE BRAND TEXT */}
          <div className="w-full overflow-hidden flex justify-center items-end select-none pointer-events-none opacity-[0.03]">
             <h1 className="text-[15vw] leading-[0.75] font-black tracking-tighter uppercase whitespace-nowrap">
               {t("company_name")}
             </h1>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
