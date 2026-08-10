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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-[#181818] to-[#121212] border border-white/[0.08] p-8 flex items-center justify-center overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
              
              <img
                src={selectedImage || LUXURY_PRODUCT_PLACEHOLDER}
                alt={productName}
                className="max-h-[90%] max-w-[90%] object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                loading="eager"
                decoding="async"
                onError={(e) => handleImageError(e, data.item)}
              />
            </div>

            {/* Thumbnails Carousel */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                {images.map((imgObj, index) => {
                  const isSelected = selectedImage === imgObj.image;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(imgObj.image)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-2xl bg-[#181818] p-2 border transition-all duration-300 cursor-pointer overflow-hidden ${
                        isSelected
                          ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.25)] scale-105"
                          : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={imgObj.image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
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

          {/* Right Column: Product Meta & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-8" dir={isRTL ? "rtl" : "ltr"}>
            <div>
              {/* Category Pill & Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>{isRTL ? "مستحضر صالونات فاخر" : "Salon Luxury Formula"}</span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                  <span className="text-xs text-zinc-500 font-mono ml-1.5 rtl:ml-0 rtl:mr-1.5">
                    (5.0)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
                {productName}
              </h1>

              {/* Description */}
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed font-sans border-y border-white/[0.08] py-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDescription,
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {data.item.url ? (
                <a
                  href={data.item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 group font-sans"
                >
                  <span>{t("buy_now")}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : null}

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 font-sans"
              >
                <MessageCircle className="w-4 h-4 text-zinc-300" />
                <span>{isRTL ? "استفسار وطلب جملة" : "Wholesale Inquiry"}</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-3 text-zinc-400 text-xs font-sans">
                <ShieldCheck className="w-4 h-4 text-white flex-shrink-0" />
                <span>{isRTL ? "مضمون معملياً 100%" : "100% Certified Pure"}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 text-xs font-sans">
                <Award className="w-4 h-4 text-white flex-shrink-0" />
                <span>{isRTL ? "معتمد لدى الصالونات" : "Salon Grade Efficacy"}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 text-xs font-sans">
                <Truck className="w-4 h-4 text-white flex-shrink-0" />
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

            <ProductGrid products={data.related} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
