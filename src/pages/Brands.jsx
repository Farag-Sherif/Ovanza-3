import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getPartners } from "../services/partnersService.js";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { Helmet } from "react-helmet";
import { ArrowRight, Sparkles } from "lucide-react";
import { normalizeImageUrl } from "../utils/imageUtils.js";

export default function Brands() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  useEffect(() => {
    getPartners()
      .then((data) => {
        setPartners(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen pt-32 page-transition-wrapper">
      <Helmet>
        <title>Ovanza Brands | Discover Our Partners</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-primary uppercase tracking-tighter mb-6">
          {isRTL ? "العلامات التجارية" : "Global"} <span className="font-serif-luxury italic text-[#d4af37]">{isRTL ? "العالمية" : "Brands"}</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {isRTL 
            ? "اكتشف العلامات التجارية التي تثق بنا، شراكات مبنية على الجودة والتميز." 
            : "Discover the brands that trust us. Partnerships built on quality and excellence."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        {isLoading ? (
          <div className="flex justify-center"><div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" /></div>
        ) : (
          <div className="flex flex-col gap-12">
            {partners.map((partner, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Link 
                  key={partner.id || idx}
                  to={`/brands/${partner.id || ''}`}
                  viewTransition
                  className="group block relative rounded-2xl bg-[#050505] border border-white/[0.05] hover:border-[#d4af37]/50 overflow-hidden transition-all duration-700"
                >
                  <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay z-0" />
                  <div className={`p-12 md:p-24 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between min-h-[400px] relative z-10 gap-12`}>
                    <div className="flex-1 text-center md:text-left rtl:md:text-right">
                       <h3 
                        className="text-4xl md:text-6xl font-black font-primary uppercase w-fit text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/30 group-hover:-webkit-text-stroke-white group-hover:text-white transition-all duration-700"
                      >
                        {partner.title || "Exclusive Brand"}
                      </h3>
                      <div className="inline-flex items-center gap-4 text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] group-hover:text-[#d4af37] transition-colors duration-300 mt-8">
                        <span>{isRTL ? "اكتشف القصة" : "Discover Story"}</span>
                        <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                      {partner.image_path ? (
                        <img 
                          src={normalizeImageUrl(partner.image_path)}
                          alt={partner.title || "Brand"}
                          style={{ viewTransitionName: `brand-image-${partner.id}` }}
                          className="w-48 h-48 md:w-64 md:h-64 object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                      ) : (
                        <Sparkles className="w-24 h-24 text-zinc-700 group-hover:text-[#d4af37] group-hover:scale-110 transition-all duration-700" />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
