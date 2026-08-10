import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: isRTL ? "أحمد الشريف" : "Alexander Sterling",
      role: isRTL ? "مدير صالون لاكشري - الرياض" : "Creative Director, Elite Salon Paris",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      quote: isRTL
        ? "تعتبر منتجات أوفانزا نقلة نوعية في صالوننا. الجودة الاستثنائية والنتائج الفورية للمستحضرات جعلت عملاءنا يطلبونها بالاسم باستمرار."
        : "Ovanza has transformed our salon experience. The formulations deliver immediate salon-grade brilliance that our clients actively ask for by name.",
      rating: 5,
      tag: isRTL ? "عميل معتمد" : "Verified Partner",
    },
    {
      name: isRTL ? "د. نادية عبد العزيز" : "Dr. Sophia Laurent",
      role: isRTL ? "خبيرة عناية بالبشرة ومستشارة تجميل" : "Dermatological Consultant, Milan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      quote: isRTL
        ? "التركيبات الدقيقة والمكونات النقية تجعل أوفانزا الخيار الأول الذي أوصي به بكل ثقة لكل من يبحث عن عناية حقيقية ونتائج مستدامة."
        : "The uncompromising purity of the botanical ingredients paired with clinical precision makes Ovanza my highest recommendation for elite skincare.",
      rating: 5,
      tag: isRTL ? "استشارية معتمدة" : "Clinical Partner",
    },
    {
      name: isRTL ? "طارق منصور" : "Marcus Vance",
      role: isRTL ? "مؤسس سلسلة صالونات برستيج" : "Founder, The Grooming Club London",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      quote: isRTL
        ? "احترافية في التعامل، ثبات في الأداء، وجودة فاخرة تشعر بها من أول استخدام. أوفانزا شريك نجاح لا غنى عنه في كل فروعنا."
        : "From packaging aesthetics to unmatched formulation performance, Ovanza sets a new benchmark in luxury grooming and salon luxury.",
      rating: 5,
      tag: isRTL ? "شريك استراتيجي" : "Master Stylist",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Cinematic Lighting */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Title & Controls */}
          <div className="w-full lg:w-4/12 flex flex-col justify-between self-stretch">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-white/50" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-bold">
                  {isRTL ? "آراء الخبراء" : "Endorsements"}
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
              >
                {isRTL ? "ماذا يقول شركاؤنا عنا" : "Trusted by Industry Leaders"}
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-500 text-lg leading-relaxed font-light mb-12"
              >
                {isRTL 
                  ? "شهادات نعتز بها من نخبة صالونات التجميل والخبراء في العالم." 
                  : "Hear from the master stylists and clinical experts who trust Ovanza for their clients."}
              </motion.p>
            </div>

            {/* Custom Navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-8 mt-auto" 
              dir="ltr"
            >
              <div className="flex gap-4">
                <button
                  onClick={prev}
                  className="w-14 h-14 rounded-full border border-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 group magnetic-btn"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={next}
                  className="w-14 h-14 rounded-full border border-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 group magnetic-btn"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 transition-all duration-500 ${
                      activeIndex === i ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Active Testimonial Showcase */}
          <div className="w-full lg:w-8/12">
            <div className="relative min-h-[400px]">
              
              {/* Massive Floating Quote Marks */}
              <div className="absolute -top-12 -left-8 text-[12rem] text-white/[0.03] font-serif leading-none select-none pointer-events-none">
                "
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-white text-white" />
                    ))}
                  </div>

                  <p className="text-2xl sm:text-3xl lg:text-5xl text-white font-light leading-[1.3] mb-12 tracking-tight">
                    {current.quote}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={current.avatar}
                        alt={current.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover grayscale-[20%]"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center border-4 border-[#050505]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
                        {current.name}
                      </h4>
                      <p className="text-sm text-zinc-500 font-sans mt-1">
                        {current.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
