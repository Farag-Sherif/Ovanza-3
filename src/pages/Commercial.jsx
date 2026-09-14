import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, ShieldCheck, Box } from "lucide-react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import CallToAction from "../components/CallToAction.jsx";

export default function Commercial() {
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  return (
    <div className="bg-black text-white min-h-screen pt-32 page-transition-wrapper">
      <Helmet>
        <title>Commercial & Export | Ovanza</title>
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <div className="space-y-8 max-w-4xl relative z-10">
          <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-[#d4af37]">
            {isRTL ? "مبيعات الجملة والتصدير" : "B2B / Export"}
          </h3>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-primary uppercase tracking-tighter leading-[0.9]">
            {isRTL ? "صُمم للأسواق" : "Built for"} <br/><span className="font-serif-luxury italic text-zinc-500">{isRTL ? "العالمية" : "Global"}</span> {!isRTL && "Shelves."}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl">
            {isRTL 
              ? "من الحرفية المحلية إلى الأسواق العالمية. علامات تجارية منتقاة ومستحضرات فائقة الجودة مصممة لتحقيق أثر عالمي."
              : "From local craftsmanship to international markets. Curated brands. Strong products. Global opportunity."}
          </p>
          <div className="pt-8">
            <Link to="/contact" className="px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-colors duration-300 inline-flex items-center gap-4">
              {isRTL ? "ابدأ شراكة تجارية" : "Initiate Partnership"}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full border border-white/5 opacity-50 blur-[1px] pointer-events-none hidden md:block" />
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-6 md:px-12 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            <div className="space-y-6">
              <Globe className="w-10 h-10 text-[#d4af37]" />
              <h4 className="text-2xl font-serif-luxury italic tracking-tight">{isRTL ? "توزيع عالمي" : "Global Distribution"}</h4>
              <p className="text-zinc-500 leading-relaxed text-sm">
                {isRTL 
                  ? "شبكة واسعة تضمن وصول منتجاتك إلى الأسواق العالمية بدقة وموثوقية." 
                  : "An extensive network ensuring our curated cosmetics reach key global markets with precision and reliability."}
              </p>
            </div>
            <div className="space-y-6">
              <Box className="w-10 h-10 text-[#d4af37]" />
              <h4 className="text-2xl font-serif-luxury italic tracking-tight">{isRTL ? "قدرات توريد مرنة" : "Scalable Sourcing"}</h4>
              <p className="text-zinc-500 leading-relaxed text-sm">
                {isRTL 
                  ? "مصممون لتلبية احتياجاتك مهما كان حجمها، سواء للصالونات الحصرية أو منافذ البيع الكبرى."
                  : "Designed for discovery, ready for scale. Capable of supplying exclusive boutiques and large-scale retailers alike."}
              </p>
            </div>
            <div className="space-y-6">
              <ShieldCheck className="w-10 h-10 text-[#d4af37]" />
              <h4 className="text-2xl font-serif-luxury italic tracking-tight">{isRTL ? "ضمان الامتثال" : "Market Compliance"}</h4>
              <p className="text-zinc-500 leading-relaxed text-sm">
                {isRTL 
                  ? "منتجات معتمدة دولياً ومطابقة للمواصفات الصحية في مختلف الأسواق."
                  : "All curated brands meet rigorous international standards and cosmetic regulations, ensuring seamless export."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Rails Placeholder */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-primary uppercase tracking-tighter mb-16 text-center">
          {isRTL ? "مستعدون للتصدير" : "Export-Ready Categories"}
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 h-[400px]">
          <Link to="/all-products" className="flex-1 relative rounded-2xl border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-zinc-900/50 group-hover:bg-zinc-800/50 transition-colors duration-500" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-serif-luxury italic mb-2">Salon Grade Haircare</h3>
              <p className="text-zinc-400 text-sm">High-volume supply available.</p>
            </div>
          </Link>
          <Link to="/all-products" className="flex-1 relative rounded-2xl border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-zinc-900/50 group-hover:bg-zinc-800/50 transition-colors duration-500" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-serif-luxury italic mb-2">Luxury Skincare</h3>
              <p className="text-zinc-400 text-sm">Dermatologically tested portfolios.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <CallToAction />
    </div>
  );
}
