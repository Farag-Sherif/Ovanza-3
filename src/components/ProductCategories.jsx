import PropTypes from "prop-types";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { useTranslation } from "react-i18next";
import { Sparkles, Layers } from "lucide-react";

export default function ProductCategories({
  subCategories,
  setSubCategoryID,
  selectedSubCategoryID,
  fetchAllProducts,
}) {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const isRTL = language === "ar";

  return (
    <div className="bg-[#0a0a0a] border-b border-white/[0.08] py-4 w-full sticky top-[65px] z-30 backdrop-blur-xl bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* All Products Pill */}
          <button
            onClick={fetchAllProducts}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer ${
              !selectedSubCategoryID
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                : "bg-[#141414] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t("all_products")}</span>
          </button>

          {/* Subcategories Pills */}
          {subCategories?.map((category) => {
            const isSelected = selectedSubCategoryID === category.id;
            const categoryName =
              language === "ar"
                ? category?.translations?.[0]?.name || category?.name
                : category?.translations?.[1]?.name || category?.name;

            return (
              <button
                key={category.id}
                onClick={() => setSubCategoryID(category.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                    : "bg-[#141414] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 opacity-70" />
                <span>{categoryName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

ProductCategories.propTypes = {
  subCategories: PropTypes.array,
  setSubCategoryID: PropTypes.func.isRequired,
  selectedSubCategoryID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fetchAllProducts: PropTypes.func.isRequired,
};
