import { useRef, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LanguageContext } from "../contexts/LanguageContext.jsx";

export default function VisionMission() {
  const containerRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0.2, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.6], [0.2, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.9], [0.2, 1]);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-[#050505] relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">
        
        {/* Vision */}
        <motion.div style={{ opacity: opacity1 }} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <motion.div 
            initial={{ x: isRTL ? 50 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3"
          >
            <h3 className="text-xl md:text-2xl font-serif-luxury italic text-[#d4af37]">
              {isRTL ? "الرؤية" : "Vision"}
            </h3>
          </motion.div>
          <motion.div 
            initial={{ x: isRTL ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-2/3"
          >
            <p className="text-2xl md:text-5xl font-primary uppercase tracking-tight rtl:tracking-normal leading-tight text-white">
              {isRTL 
                ? <>إعادة تعريف مشهد مستحضرات التجميل الفاخرة من خلال دمج <span className="text-transparent rtl:text-[#d4af37] -webkit-text-stroke-1 rtl:[-webkit-text-stroke:0] -webkit-text-stroke-white">فعالية الصالونات</span> مع الأناقة العصرية.</>
                : <>To redefine the luxury cosmetics landscape by merging <span className="text-transparent rtl:text-[#d4af37] -webkit-text-stroke-1 rtl:[-webkit-text-stroke:0] -webkit-text-stroke-white">salon-grade efficacy</span> with editorial elegance.</>
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Mission */}
        <motion.div style={{ opacity: opacity2 }} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <motion.div 
            initial={{ x: isRTL ? 50 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3"
          >
            <h3 className="text-xl md:text-2xl font-serif-luxury italic text-[#d4af37]">
              {isRTL ? "المهمة" : "Mission"}
            </h3>
          </motion.div>
          <motion.div 
            initial={{ x: isRTL ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-2/3"
          >
            <p className="text-2xl md:text-5xl font-primary uppercase tracking-tight rtl:tracking-normal leading-tight text-white">
              {isRTL 
                ? <>تمكين المستهلكين عالمياً من الوصول إلى أرقى <span className="text-transparent rtl:text-[#d4af37] -webkit-text-stroke-1 rtl:[-webkit-text-stroke:0] -webkit-text-stroke-white">ابتكارات التجميل</span> المعتمدة طبياً.</>
                : <>Empowering global consumers with access to the finest curated <span className="text-transparent rtl:text-[#d4af37] -webkit-text-stroke-1 rtl:[-webkit-text-stroke:0] -webkit-text-stroke-white">beauty innovations</span> and dermatologically certified care.</>
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Market Position */}
        <motion.div style={{ opacity: opacity3 }} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <motion.div 
            initial={{ x: isRTL ? 50 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3"
          >
            <h3 className="text-xl md:text-2xl font-serif-luxury italic text-[#d4af37]">
              {isRTL ? "السوق" : "Market Position"}
            </h3>
          </motion.div>
          <motion.div 
            initial={{ x: isRTL ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-2/3"
          >
            <p className="text-2xl md:text-5xl font-primary uppercase tracking-tight rtl:tracking-normal leading-tight text-white">
              {isRTL 
                ? <>نتواجد في نقطة التقاء <span className="text-transparent rtl:text-[#d4af37] -webkit-text-stroke-1 rtl:[-webkit-text-stroke:0] -webkit-text-stroke-white">الأداء الاحترافي</span> والفخامة التي يسهل الوصول إليها.</>
                : <>Positioned at the intersection of <span className="text-transparent rtl:text-[#d4af37] -webkit-text-stroke-1 rtl:[-webkit-text-stroke:0] -webkit-text-stroke-white">professional performance</span> and accessible luxury.</>
              }
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
