import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getPartners } from "../services/partnersService.js";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { Helmet } from "react-helmet";
import { useProductsQuery } from "../hooks/queries/useProductsQuery.js";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Star, Eye } from "lucide-react";
import { getProductImageUrl, handleImageError, normalizeImageUrl } from "../utils/imageUtils.js";
import { useTranslation } from "react-i18next";
import VisionMission from "../components/VisionMission.jsx";

function ProductPresentationSection({ products, brand, isRTL, t }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const xTransform = useTransform(smoothProgress, [0, 1], isRTL ? ["0vw", "-150vw"] : ["0vw", "-150vw"]);
  
  if (!products || products.length === 0) return null;

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#030303] hidden lg:block">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay z-0" />
        
        <div className="absolute top-24 left-12 z-20 pointer-events-none">
          <h2 className="text-6xl font-serif-luxury italic text-white tracking-tight">
            {isRTL ? "مختارات" : "Creative"}<br/>
            <span className="font-primary not-italic font-black text-outline uppercase">{isRTL ? "المجموعة" : "Showcase"}</span>
          </h2>
        </div>

        <motion.div style={{ x: xTransform }} className="flex items-center gap-24 pl-[30vw] pr-[10vw] w-max relative z-10">
          {products.slice(0, 5).map((product, idx) => {
             const productName = product?.translations?.[isRTL ? 0 : 1]?.name || product?.name;
             return (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="shrink-0 w-[450px] group"
              >
                <Link to={`/product-details/${product.id}`} className="block relative w-full aspect-[3/4] overflow-hidden bg-white/[0.02]">
                   <div className="absolute inset-0 p-12 flex items-center justify-center">
                     <img
                        src={getProductImageUrl(product)}
                        alt={productName}
                        className="max-h-[100%] max-w-[100%] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                        onError={(e) => handleImageError(e, product)}
                     />
                   </div>
                </Link>
                <div className="mt-6 flex flex-col opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-black text-white uppercase font-primary">{productName}</h3>
                </div>
              </motion.div>
             )
          })}
        </motion.div>
      </div>
    </section>
  );
}

function MobileProductPresentation({ products, isRTL, t }) {
  if (!products || products.length === 0) return null;
  return (
    <section className="py-24 px-6 bg-[#030303] lg:hidden overflow-hidden relative">
      <div className="mb-12">
          <h2 className="text-4xl font-serif-luxury italic text-white tracking-tight">
            {isRTL ? "مختارات" : "Creative"}<br/>
            <span className="font-primary not-italic font-black text-outline uppercase">{isRTL ? "المجموعة" : "Showcase"}</span>
          </h2>
      </div>
      <div className="flex flex-col gap-16">
        {products.slice(0, 3).map((product, idx) => {
          const productName = product?.translations?.[isRTL ? 0 : 1]?.name || product?.name;
          return (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <Link to={`/product-details/${product.id}`} className="block relative w-full aspect-[4/5] bg-white/[0.02] p-8">
                  <img
                    src={getProductImageUrl(product)}
                    alt={productName}
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                    onError={(e) => handleImageError(e, product)}
                  />
               </Link>
               <h3 className="text-xl font-black text-white uppercase mt-4 font-primary">{productName}</h3>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function FancyPlaceholders({ title, prefix, isRTL }) {
  return (
    <section className="py-24 px-6 md:px-12 bg-black border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <h2 className="text-4xl md:text-6xl font-primary uppercase tracking-tighter text-center">
          {title} <span className="font-serif-luxury italic text-[#d4af37]">{isRTL ? "مساحة" : "Section"}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((num) => (
            <motion.div 
              key={num}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: num * 0.1 }}
              className="aspect-[3/4] bg-[#111] rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-noise opacity-20 z-0"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <span className="text-2xl font-serif-luxury italic text-white/50 mb-2">0{num}</span>
                <span className="text-3xl font-primary font-black uppercase text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/30 group-hover:-webkit-text-stroke-white transition-all duration-500">
                  {isRTL ? "مساحة" : "Fancy"} {num}
                </span>
                <span className="mt-4 text-xs tracking-widest text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">({prefix})</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



export default function BrandProfile() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [isLoadingBrand, setIsLoadingBrand] = useState(true);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const isRTL = language === "ar";
  
  const { data: allProducts, isLoading: isLoadingProducts } = useProductsQuery();

  useEffect(() => {
    getPartners()
      .then((data) => {
        const found = data?.find((p) => String(p.id) === String(id));
        setBrand(found || null);
        setIsLoadingBrand(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingBrand(false);
      });
  }, [id]);

  if (isLoadingBrand) {
    return <div className="bg-black min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" /></div>;
  }

  if (!brand) {
    return <div className="bg-black text-white min-h-screen pt-32 text-center text-xl">Brand not found</div>;
  }

  const brandProducts = allProducts?.filter(p => String(p.partner_id) === String(id) || String(p.brand_id) === String(id)) || [];

  return (
    <div className="bg-black text-white min-h-screen page-transition-wrapper">
      <Helmet>
        <title>{brand.name || "Brand Profile"} | Ovanza</title>
      </Helmet>

      {/* 2. Brand Profile Section (Hero & History) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay z-0 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-5xl mx-auto px-6 flex flex-col items-center"
        >
          {brand.image_path && (
            <img 
              src={normalizeImageUrl(brand.image_path)} 
              alt={brand.title || "Brand"}
              style={{ viewTransitionName: `brand-image-${brand.id}` }}
              className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto mb-12"
            />
          )}
          <h1 
            className="text-6xl md:text-[8rem] font-serif-luxury italic tracking-tight mb-8 leading-none"
            style={{ viewTransitionName: `brand-title-${brand.id}` }}
          >
            {brand.title || brand.name}
          </h1>
          
          <div className="max-w-2xl mx-auto mt-12">
            <h3 className="text-[#d4af37] text-sm uppercase tracking-[0.3em] font-bold mb-6">{isRTL ? "تاريخ العلامة" : "Brand History"}</h3>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-sans font-light">
              {isRTL 
                ? "ولدت العلامة من شغف بالكمال، لتمثل قمة الفخامة في العناية والجمال. كل مستحضر يروي قصة التزام بالجودة العالية والابتكار المستمر."
                : "Born out of a passion for perfection, this brand represents the pinnacle of luxury in care and beauty. Every product tells a story of commitment to high quality and continuous innovation."}
            </p>
          </div>
        </motion.div>
      </section>

      {/* 1. Products Presentation Section (Creative animated showcase) */}
      <ProductPresentationSection products={brandProducts} brand={brand} isRTL={isRTL} t={t} />
      <MobileProductPresentation products={brandProducts} isRTL={isRTL} t={t} />

      {/* 6. Vision / Mission / Market Position */}
      <VisionMission />

      {/* 4. Commercial / Photography Details Section */}
      <FancyPlaceholders title={isRTL ? "الحملات الإعلانية" : "Commercial"} prefix={isRTL ? "تصوير" : "Photography"} isRTL={isRTL} />

      {/* 5. Sketches Section */}
      <FancyPlaceholders title={isRTL ? "مخططات" : "Sketches"} prefix={isRTL ? "تصميم" : "Design"} isRTL={isRTL} />

      {/* 3. Products Display (Detailed List) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-20 bg-black">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-primary uppercase tracking-tighter">
            {isRTL ? "المجموعة" : "Full"} <span className="font-serif-luxury italic text-[#d4af37]">{isRTL ? "الكاملة" : "Collection"}</span>
          </h2>
        </div>
        
        {isLoadingProducts ? (
          <div className="flex justify-center"><div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" /></div>
        ) : brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {brandProducts.map((product, idx) => {
              const productName = product?.translations?.[isRTL ? 0 : 1]?.name || product?.name;
              return (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx % 2) * 0.2 }}
                  className="bg-[#050505] rounded-3xl p-8 border border-white/5 flex flex-col group hover:border-white/20 transition-colors"
                >
                  <div className="aspect-[4/3] bg-white/[0.02] rounded-2xl p-8 mb-8 flex items-center justify-center">
                    <img
                      src={getProductImageUrl(product)}
                      alt={productName}
                      className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => handleImageError(e, product)}
                    />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold font-primary uppercase text-white leading-tight w-2/3">{productName}</h3>
                    {(product.price || product.price_formatted) && (
                      <div className="text-xl font-black text-[#d4af37]">
                        {product.price_formatted || `$${product.price}`}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-white text-white" />)}
                  </div>
                  <Link
                    to={`/product-details/${product.id}`}
                    className="mt-auto w-full inline-flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-white text-white hover:text-black transition-colors font-bold uppercase tracking-widest text-xs rounded-xl"
                  >
                    <span>{t("product_details")}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center text-zinc-500 py-12">
            {isRTL ? "لا توجد منتجات حالياً لهذه العلامة." : "No products available for this brand currently."}
          </div>
        )}
      </section>
    </div>
  );
}
