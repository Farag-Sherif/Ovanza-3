import { useContext, useRef } from "react";
import { DataContext } from "../contexts/DataContext.jsx";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

function AboutUs() {
  const { data, loading } = useContext(DataContext);
  const { language } = useContext(LanguageContext);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleImg = useTransform(scrollYProgress, [0, 1], [0.7, 1.1]);
  const yText = useTransform(scrollYProgress, [0, 1], [150, -150]);
  
  if (loading && !data) return null;

  const isRTL = language === "ar";
  const translation =
    data?.settings?.translations?.find((tr) => tr.locale === language) ||
    data?.settings?.translations?.[isRTL ? 0 : 1] ||
    {};

  const aboutText =
    translation?.about_us ||
    (isRTL
      ? "تأسست أوفانزا لتكون المعيار الذهبي في عالم العناية والتجميل الاحترافي. نجمع بين أحدث الابتكارات العلمية والمكونات الطبيعية الفائقة لنقدم مستحضرات ترتقي بإطلالتك وتلبي تطلعات أرقى الصالونات."
      : "Ovanza was founded with a singular purpose: to redefine professional cosmetic excellence. By marrying rigorous scientific research with rare botanical formulations, we deliver products that set the standard.");

  return (
    <section id="aboutUs" ref={containerRef} className="py-32 lg:py-48 bg-[#030303] relative overflow-hidden border-t border-white/5">
      
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Extreme Editorial Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text Block */}
          <motion.div 
            style={{ y: yText }}
            className="lg:col-span-6 flex flex-col items-start text-left rtl:text-right z-20"
          >
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-[1px] bg-[#d4af37]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-bold">
                {isRTL ? "الإرث" : "The Heritage"}
              </span>
            </div>

            <h3 className="text-5xl lg:text-7xl font-serif-luxury italic text-white leading-[1.1] tracking-tight mb-8">
              {isRTL ? "جمال يفوق" : "Beauty Beyond"} <br />
              <span className="font-primary font-black not-italic uppercase text-outline">{isRTL ? "الزمن" : "Measure"}</span>
            </h3>

            <p className="text-xl lg:text-3xl text-zinc-400 font-light leading-relaxed mb-16 max-w-lg line-clamp-[15]">
              {aboutText}
            </p>

            <Link
              to="/about-us"
              className="inline-flex items-center gap-6 px-0 py-2 text-white hover:text-[#d4af37] text-sm font-bold uppercase tracking-[0.3em] group transition-colors duration-500"
            >
              <span>{isRTL ? "اكتشف الفلسفة" : "Discover Philosophy"}</span>
              <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-[#d4af37] flex items-center justify-center transition-colors">
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </div>
            </Link>
          </motion.div>

          {/* Right: Immersive Image Reveal */}
          <div className="lg:col-span-6 w-full relative h-[60vh] lg:h-[90vh] overflow-hidden group rounded-bl-[100px] rounded-tr-[100px] bg-white/5">
             <motion.div 
               className="w-full h-full clip-image-reveal"
               initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
               whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
             >
                {data?.settings?.image_logo_path ? (
                  <motion.div 
                    style={{ scale: scaleImg }}
                    className="w-full h-full flex items-center justify-center p-16 mix-blend-screen bg-black"
                  >
                    <img
                      src={data.settings.image_logo_path}
                      alt="Ovanza Heritage"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                    />
                  </motion.div>
                ) : (
                  <motion.div style={{ scale: scaleImg }} className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <span className="text-4xl font-black text-white/20 font-serif-luxury">OVANZA</span>
                  </motion.div>
                )}
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutUs;
