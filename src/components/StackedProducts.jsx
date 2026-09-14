import { useRef, useContext } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProductsQuery } from "../hooks/queries/useProductsQuery.js";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { getProductImageUrl, handleImageError } from "../utils/imageUtils.js";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "../utils/animations.js";

export default function StackedProducts() {
  const { data: allProducts, isLoading } = useProductsQuery();
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";
  
  const products = (allProducts || []).slice(0, 4);
  
  return (
    <section className="bg-[#030303] py-32 px-4 md:px-12 relative border-t border-white/5 min-h-[100vh]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-7xl font-primary uppercase tracking-tighter text-white">
            {isRTL ? "إبداعات" : "Iconic"} <span className="font-serif-luxury italic text-[#d4af37]">{isRTL ? "أيقونية" : "Creations"}</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center h-[50vh] items-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>
        ) : (
          <div className="relative w-full">
            {products.map((product, i) => (
              <StackedCard key={product.id} product={product} index={i} total={products.length} isRTL={isRTL} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StackedCard({ product, index, total, isRTL }) {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 20%"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const productName = product?.translations?.[isRTL ? 0 : 1]?.name || product?.name;
  
  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="sticky top-32 w-full h-[60vh] md:h-[70vh] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 mb-8 flex flex-col md:flex-row bg-[#0a0a0a]"
    >
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white/5 p-12 flex items-center justify-center relative">
        <img 
          src={getProductImageUrl(product)}
          alt={productName}
          className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
          onError={(e) => handleImageError(e, product)}
        />
        <div className="absolute top-8 left-8 text-6xl font-serif-luxury italic text-white/10">
          0{index + 1}
        </div>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-16 relative">
        <h3 className="text-3xl md:text-5xl font-black font-primary uppercase text-white mb-6 leading-tight">
          {productName}
        </h3>
        {product.price && (
          <p className="text-2xl font-bold text-[#d4af37] mb-8">{product.price_formatted || `$${product.price}`}</p>
        )}
        <Link 
          to={`/product-details/${product.id}`}
          className="inline-flex w-max items-center gap-4 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#d4af37] hover:text-black transition-colors"
        >
          {isRTL ? "اكتشف المزيد" : "Explore"}
          <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </motion.div>
  );
}
