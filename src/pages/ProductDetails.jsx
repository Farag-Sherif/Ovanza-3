import { useContext, useEffect, useState, useMemo } from "react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductDetailsSkeleton from "../components/skeletons/ProductDetailsSkeleton.jsx";
import { Helmet } from "react-helmet";
import {
  Star,
  Sparkles,
  ShieldCheck,
  Award,
  Truck,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  PackageOpen,
} from "lucide-react";
import { useProductDetailsQuery } from "../hooks/queries/useProductDetailsQuery.js";
import { normalizeImageUrl, handleImageError, LUXURY_PRODUCT_PLACEHOLDER } from "../utils/imageUtils.js";

function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useProductDetailsQuery(id);
  const [selectedImage, setSelectedImage] = useState("");
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const isRTL = language === "ar";

  const images = useMemo(() => {
    if (!data?.item) return [];
    const media = data.item.media || [];
    const allImages = [];

    const mainRaw = data.item.image_path || data.item.image;
    if (mainRaw) {
      const mainImg = normalizeImageUrl(mainRaw);
      if (mainImg) allImages.push({ image: mainImg });
    }

    media.forEach((item) => {
      const imgRaw = item?.image || item?.image_path;
      if (imgRaw) {
        const imgUrl = normalizeImageUrl(imgRaw);
        if (imgUrl && !allImages.some((img) => img.image === imgUrl)) {
          allImages.push({ image: imgUrl });
        }
      }
    });

    return allImages;
  }, [data?.item]);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].image);
    }
  }, [images]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!data || !data.item) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24 px-4">
        <div className="rounded-3xl bg-[#141414] border border-white/[0.08] p-10 sm:p-14 text-center max-w-lg shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-6">
            <PackageOpen className="w-8 h-8 text-zinc-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {isRTL ? "المنتج غير متوفر" : "Product Not Found"}
          </h1>
          <p className="text-zinc-400 text-sm mb-8 font-sans leading-relaxed">
            {isRTL
              ? "عفواً، المنتج الذي تبحث عنه غير موجود أو تم نقله."
              : "Sorry, the product you are looking for does not exist or has been moved."}
          </p>
          <button
            onClick={() => navigate("/all-products")}
            className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
          >
            {t("all_products")}
          </button>
        </div>
      </div>
    );
  }

  const productName =
    language === "ar"
      ? data.item.translations?.[0]?.name || data.item.name
      : data.item.translations?.[1]?.name || data.item.name;

  const productDescription =
    language === "ar"
      ? data.item.translations?.[0]?.description || ""
      : data.item.translations?.[1]?.description || "";

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>{productName} | Ovanza Cosmetics</title>
        <meta
          name="description"
          content={productDescription.replace(/<[^>]*>?/gm, "").slice(0, 160)}
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb page={productName} subtitle={t("product_details")} />

      {/* Main Details Section */}
      <div className="max-w-[100vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-start">
          
          {/* Left Column: Image Gallery (7 cols) - STICKY */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center bg-[#050505] p-8 lg:p-16 border-r border-white/5">
            {/* Main Stage Image */}
            <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
              
              <img
                src={selectedImage || LUXURY_PRODUCT_PLACEHOLDER}
                alt={productName}
                style={{ viewTransitionName: `product-image-${data.item.id}` }}
                className="max-h-[90vh] max-w-[100%] object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)] transition-transform duration-1000 group-hover:scale-105"
                loading="eager"
                decoding="async"
                onError={(e) => handleImageError(e, data.item)}
              />
            </div>

            {/* Thumbnails Carousel */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-4 justify-center mt-auto">
                {images.map((imgObj, index) => {
                  const isSelected = selectedImage === imgObj.image;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(imgObj.image)}
                      className={`relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 bg-transparent border-b-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                        isSelected
                          ? "border-[#d4af37] opacity-100"
                          : "border-transparent opacity-40 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imgObj.image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => handleImageError(e, data.item)}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Product Meta & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-12 px-6 lg:pr-16 py-16 lg:py-32" dir={isRTL ? "rtl" : "ltr"}>
            <div>
              {/* Category Pill & Rating */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                  {isRTL ? "مستحضر صالونات فاخر" : "Salon Luxury Formula"}
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-white text-white" />
                  ))}
                  <span className="text-[10px] text-zinc-500 font-mono ml-2 rtl:ml-0 rtl:mr-2">
                    (5.0)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 
                className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury italic text-white tracking-tight leading-[1.1] mb-6 w-fit"
                style={{ viewTransitionName: `product-title-${data.item.id}` }}
              >
                {productName}
              </h1>

              {/* Conditional Brand and Price */}
              <div className="flex flex-col gap-4 mb-12">
                {(data.item.brand || data.item.partner?.name) && (
                  <Link 
                    to={`/brands/${data.item.partner_id || data.item.brand_id || ''}`} 
                    className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold hover:text-white transition-colors flex items-center gap-2"
                  >
                    {data.item.brand || data.item.partner?.name}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
                {(data.item.price || data.item.price_formatted) && (
                  <div className="text-2xl sm:text-3xl font-primary font-black text-white">
                    {data.item.price_formatted || `$${data.item.price}`}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none text-zinc-400 text-base sm:text-lg leading-relaxed font-sans border-t border-white/10 pt-12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDescription,
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-8">
              {data.item.url ? (
                <a
                  href={data.item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-8 py-5 bg-white text-black hover:bg-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 group"
                >
                  <span>{t("buy_now")}</span>
                  <ExternalLink className="w-4 h-4 transform group-hover:scale-125 transition-transform" />
                </a>
              ) : null}

              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-between px-8 py-5 bg-transparent border border-white/20 text-white hover:border-white transition-all duration-500 text-xs font-bold uppercase tracking-[0.2em] group"
              >
                <span>{isRTL ? "استفسار وطلب جملة" : "Wholesale Inquiry"}</span>
                <MessageCircle className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-6 pt-12 border-t border-white/10">
              <div className="flex items-center gap-4 text-zinc-400 text-xs uppercase tracking-widest font-primary">
                <ShieldCheck className="w-5 h-5 text-white flex-shrink-0" />
                <span>{isRTL ? "مضمون معملياً 100%" : "100% Certified Pure"}</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400 text-xs uppercase tracking-widest font-primary">
                <Award className="w-5 h-5 text-white flex-shrink-0" />
                <span>{isRTL ? "معتمد لدى الصالونات" : "Salon Grade Efficacy"}</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400 text-xs uppercase tracking-widest font-primary">
                <Truck className="w-5 h-5 text-white flex-shrink-0" />
                <span>{isRTL ? "شحن آمن وفوري" : "Fast & Secure Shipping"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {data.related && data.related.length > 0 && (
          <div className="mt-24 sm:mt-32 pt-16 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
                    {isRTL ? "خيارات مكملة" : "Recommended for You"}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {t("related_products")}
                </h2>
              </div>

              <Link
                to="/all-products"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                <span>{t("all_products")}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </div>

            <ProductGrid products={data.related.filter(p => String(p.id) !== String(data.item.id))} uniform={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
