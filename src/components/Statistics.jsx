import { useContext, useEffect, useState, useRef } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

function Counter({ end, duration = 2, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const endNum = parseFloat(end);
    const stepTime = Math.abs(Math.floor((duration * 1000) / (endNum > 100 ? 100 : endNum)));
    const increment = endNum > 100 ? Math.ceil(endNum / 100) : 1;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endNum) {
        setCount(endNum);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="font-primary font-black tracking-tighter">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  const stats = [
    {
      value: 25,
      suffix: "K+",
      label: isRTL ? "صالون معتمد" : "Salon Partners",
    },
    {
      value: 150,
      suffix: "+",
      label: isRTL ? "تركيبة متطورة" : "Formulations",
    },
    {
      value: 99,
      suffix: "%",
      label: isRTL ? "رضا العملاء" : "Satisfaction",
    },
    {
      value: 18,
      suffix: "+",
      label: isRTL ? "دولة" : "Countries",
    },
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Cinematic Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[50vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-white/50" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-bold">
              {isRTL ? "أرقام تتحدث" : "Proven Impact"}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter"
          >
            {isRTL ? "ريادة موثقة بالأرقام" : "Excellence in Numbers"}
          </motion.h2>
        </div>

        {/* Massive Typographic Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full border-y border-white/10 py-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-center text-center ${index !== stats.length - 1 ? 'lg:border-r lg:border-white/10 lg:rtl:border-l lg:rtl:border-r-0' : ''}`}
            >
              <div className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white mb-4 leading-none">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-zinc-500 uppercase tracking-widest mt-2">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
