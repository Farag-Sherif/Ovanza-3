import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { motion } from "framer-motion";
import { Star, Eye, ArrowRight } from "lucide-react";
import { getProductImageUrl, handleImageError } from "../utils/imageUtils.js";

const ProductCard = React.memo(({ product, idx, language, t, isRTL }) => {
  const [isHovered, setIsHovered] = useState(false);
  const productName =
    language === "ar"
      ? product?.translations?.[0]?.name || product?.name
      : product?.translations?.[1]?.name || product?.name;

  const displayImage = getProductImageUrl(product, isHovered);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (idx % 8) * 0.05 }}
      className="group relative rounded-3xl bg-[#141414] hover:bg-[#1a1a1a] border border-white/[0.08] hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between"
    >
      {/* Image Canvas */}
      <div
        className="relative aspect-square w-full bg-[#181818] p-6 flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Bestseller Badge */}
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/10 backdrop-blur-md">
            {idx % 2 === 0 ? (isRTL ? "متميز" : "Signature") : (isRTL ? "صالون" : "Salon Line")}
          </span>
        </div>

        {/* Product Image */}
        <img
          src={displayImage}
          alt={productName}
          style={{ viewTransitionName: `product-image-${product.id}` }}
          className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out group-hover:scale-108"
          loading="lazy"
          decoding="async"
          onError={(e) => handleImageError(e, product)}
        />

        {/* Quick View Button Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <Link
            to={`/product-details/${product.id}`}
            viewTransition
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 hover:bg-zinc-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t("product_details")}</span>
          </Link>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, starIdx) => (
                <Star
                  key={starIdx}
                  className="w-3.5 h-3.5 fill-white text-white"
                />
              ))}
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">5.0</span>
          </div>

          {/* Conditional Brand Name */}
          {(product.brand || product.partner?.name) && (
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
              {product.brand || product.partner?.name}
            </span>
          )}

          <h3 
            className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-zinc-200 transition-colors leading-snug w-fit"
            style={{ viewTransitionName: `product-title-${product.id}` }}
          >
            <Link to={`/product-details/${product.id}`} viewTransition>{productName}</Link>
          </h3>

          {/* Conditional Price */}
          {(product.price || product.price_formatted) && (
            <div className="text-sm font-bold text-white mb-4">
              {product.price_formatted || `$${product.price}`}
            </div>
          )}
        </div>

        <Link
          to={`/product-details/${product.id}`}
          viewTransition
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider font-sans"
        >
          <span>{t("product_details")}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </motion.div>
  );
});

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  language: PropTypes.string,
  t: PropTypes.func.isRequired,
  isRTL: PropTypes.bool.isRequired,
};

export default function ProductGrid({ products, uniform = false }) {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${uniform ? 'lg:grid-cols-4' : 'lg:grid-cols-12'} gap-8 md:gap-12`}>
      {products?.map((product, idx) => {
        // Asymmetric logic: some span 4 cols, some 8 cols, some offset.
        // We have 12 cols total in lg.
        let colSpan = uniform ? "lg:col-span-1" : "lg:col-span-4";
        let marginTop = "lg:mt-0";
        
        if (!uniform) {
          if (idx % 4 === 0) {
            colSpan = "lg:col-span-7";
          } else if (idx % 4 === 1) {
            colSpan = "lg:col-span-5";
            marginTop = "lg:mt-24";
          } else if (idx % 4 === 2) {
            colSpan = "lg:col-span-5";
          } else {
            colSpan = "lg:col-span-7";
            marginTop = "lg:mt-32";
          }
        }

        return (
          <div key={product.id || idx} className={`${colSpan} ${marginTop}`}>
            <ProductCard 
              product={product} 
              idx={idx} 
              language={language} 
              t={t} 
              isRTL={isRTL} 
            />
          </div>
        );
      })}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array,
};
