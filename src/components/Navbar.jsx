import { useEffect, useState, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { DataContext } from "../contexts/DataContext.jsx";
import CustomSelect from "./Select.jsx";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const { scrollY } = useScroll();
  const { data } = useContext(DataContext);
  const { t } = useTranslation();
  const { setLanguage, language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    const shouldHide = latest > 150 && latest > previous;
    if (hidden !== shouldHide) {
      setHidden(shouldHide);
    }
    const scrolled = latest > 50;
    if (isScrolled !== scrolled) {
      setIsScrolled(scrolled);
    }
  });

  useEffect(() => {
    setIsOpen(false);
    const hash = window.location.hash.replace("#", "");
    if (hash) setActiveTab(hash);
    else if (location.pathname === "/" || location.pathname === "/home") setActiveTab("/");
    else setActiveTab(location.pathname.substring(1));
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const direction = language === "ar" ? "rtl" : "ltr";
  const isRTL = language === "ar";
  const catalogUrl = data?.settings?.about_file_path;

  const handleScrollToSection = useCallback((e, sectionId) => {
    e.preventDefault();
    setActiveTab(sectionId);
    if (location.pathname !== "/" && location.pathname !== "/home") {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  }, [location.pathname, navigate]);

  const navLinks = [
    { label: t("home"), href: "/", isAnchor: false },
    { label: t("aboutUs"), href: "aboutUs", isAnchor: true },
    { label: t("products"), href: "our-products", isAnchor: true },
    { label: t("brands"), href: "our-brands", isAnchor: true },
    { label: t("contact"), href: "contact", isAnchor: true },
  ];

  return (
    <>
      <motion.header
        dir={direction}
        variants={{ visible: { y: 0 }, hidden: { y: "-150%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-6 md:px-12 py-6 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#030303]/95 backdrop-blur-md pointer-events-auto border-b border-white/5" 
            : "pointer-events-none mix-blend-difference"
        }`}
      >
        {/* Logo - Left */}
        <div className="pointer-events-auto flex-shrink-0">
          <Link to="/" className="flex items-center group focus:outline-none">
            {data?.settings?.image_logo_path ? (
              <img
                src={data.settings.image_logo_path}
                alt={t("company_name")}
                className="h-6 md:h-8 w-auto object-contain brightness-0 invert"
              />
            ) : (
              <span className="text-white text-xl md:text-2xl font-black tracking-widest uppercase font-primary">
                {t("company_name")}
              </span>
            )}
          </Link>
        </div>

        {/* Center Navigation - Minimal Dots or Clean Text */}
        <nav className="pointer-events-auto hidden xl:flex items-center gap-8 bg-transparent">
          {navLinks.map((item, idx) => {
            const isActive = activeTab === item.href;
            return (
              <div key={idx} className="relative group overflow-hidden">
                {item.isAnchor ? (
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => handleScrollToSection(e, item.href)}
                    className="relative z-10 py-2 text-[11px] font-bold tracking-[0.2em] transition-colors duration-300 uppercase text-white/70 hover:text-white flex flex-col items-center"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavDot"
                        className="w-1 h-1 bg-white rounded-full mt-1 absolute bottom-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setActiveTab(item.href)}
                    className="relative z-10 py-2 text-[11px] font-bold tracking-[0.2em] transition-colors duration-300 uppercase text-white/70 hover:text-white flex flex-col items-center"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavDot"
                        className="w-1 h-1 bg-white rounded-full mt-1 absolute bottom-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="pointer-events-auto flex items-center gap-6">
          <div className="hidden sm:block">
            <CustomSelect
              value={language}
              onChange={setLanguage}
              options={[
                { value: "en", label: "EN" },
                { value: "ar", label: "AR" },
              ]}
              className="!text-white !bg-transparent !border-none"
            />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 ease-[0.16,1,0.3,1] z-50"
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Cinematic Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center px-8 lg:px-24 overflow-hidden"
            dir={direction}
          >
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay" />
            
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between lg:items-center gap-16">
              
              {/* Main Links */}
              <div className="space-y-4 lg:space-y-8">
                {navLinks.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {item.isAnchor ? (
                      <a
                        href={`#${item.href}`}
                        onClick={(e) => handleScrollToSection(e, item.href)}
                        className="block text-5xl sm:text-7xl lg:text-8xl font-black text-outline-hover-fill hover:text-white transition-colors duration-500 font-primary uppercase tracking-tighter"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-5xl sm:text-7xl lg:text-8xl font-black text-outline-hover-fill hover:text-white transition-colors duration-500 font-primary uppercase tracking-tighter"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Supplementary Info */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex flex-col gap-10"
              >
                <div>
                  <h4 className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">{isRTL ? "تواصل معنا" : "Get in Touch"}</h4>
                  <a href="mailto:contact@ovanza.com" className="text-xl text-white hover:text-zinc-400 transition-colors block mb-2">contact@ovanza.com</a>
                  <p className="text-zinc-400">Dubai, United Arab Emirates</p>
                </div>

                <div className="flex flex-col gap-4">
                  {catalogUrl && (
                    <a
                      href={catalogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-white/10 text-white"
                    >
                      <span className="text-sm font-bold uppercase tracking-widest">{t("catalog")}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                  )}
                  <Link
                    to="/all-products"
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between py-4 border-b border-white/10 text-white"
                  >
                    <span className="text-sm font-bold uppercase tracking-widest">{t("all_products")}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
