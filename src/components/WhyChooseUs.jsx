import { useContext, useRef } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, ShieldCheck, Award, HeartHandshake } from "lucide-react";

export default function WhyChooseUs() {
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Marquee scroll transforms
  const xMarquee1 = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const xMarquee2 = useTransform(smoothProgress, [0, 1], ["-50%", "0%"]);

  const features = [
    {
      icon: Sparkles,
      title: isRTL ? "نقاء نادر" : "Rare Purity",
      description: isRTL
        ? "مستخلصات نباتية خالية من أي مواد كيميائية لضمان الفعالية."
        : "Sourced from the finest botanical reserves, free from harmful additives.",
    },
    {
      icon: ShieldCheck,
      title: isRTL ? "دقة علمية" : "Clinical Precision",
      description: isRTL
        ? "أعلى معايير الاختبارات المعملية لضمان جودة مستدامة."
        : "Backed by rigorous dermatological research and stringent testing.",
    },
    {
      icon: Award,
      title: isRTL ? "معيار الصالونات" : "Salon Standard",
      description: isRTL
        ? "يثق بنا نخبة الخبراء لنتائجنا التي تدوم طويلاً."
        : "Trusted by master stylists globally for transformative results.",
    },
    {
      icon: HeartHandshake,
      title: isRTL ? "ثقة مطلقة" : "Absolute Trust",
      description: isRTL
        ? "فريق متخصص لتلبية احتياجاتك باحترافية تامة."
        : "Dedicated account support and rapid fulfillment for your salon.",
    },
  ];

  return (
    <section ref={containerRef} className="py-32 lg:py-64 bg-[#030303] relative overflow-hidden border-t border-white/5">
      
      {/* Massive Marquee Backgrounds */}
      <div className="absolute top-[20%] left-0 w-[300%] pointer-events-none z-0 opacity-10 flex whitespace-nowrap overflow-hidden">
        <motion.h2 
          style={{ x: xMarquee1 }}
          className="text-[12vw] font-serif-luxury uppercase text-white leading-none tracking-tight"
        >
          {isRTL ? "الجودة • الابتكار • الجودة • الابتكار • " : "QUALITY • INNOVATION • QUALITY • INNOVATION • "}
        </motion.h2>
      </div>
      <div className="absolute top-[60%] left-0 w-[300%] pointer-events-none z-0 opacity-[0.03] flex whitespace-nowrap overflow-hidden">
        <motion.h2 
          style={{ x: xMarquee2 }}
          className="text-[12vw] font-black uppercase text-white leading-none tracking-tight font-primary text-outline"
        >
          {isRTL ? "بدون مساومة • بدون مساومة • " : "WITHOUT COMPROMISE • WITHOUT COMPROMISE • "}
        </motion.h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col gap-6 group"
              >
                {/* Minimal Top Bar */}
                <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.76,0,0.24,1]" />
                </div>

                <div className="flex justify-between items-start">
                   <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold font-primary">
                     0{idx + 1}
                   </div>
                   <Icon className="w-5 h-5 text-white/30 group-hover:text-[#d4af37] transition-colors duration-500" />
                </div>
                
                <div>
                  <h3 className="text-2xl lg:text-3xl font-serif-luxury italic text-white mb-4 group-hover:text-[#d4af37] transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-sm lg:text-base text-zinc-400 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
