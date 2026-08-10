import { useSearchParams } from "react-router-dom";
import ProductCategories from "../components/ProductCategories.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import Pagination from "../components/Pagination.jsx";
import { useContext, useState, useMemo, useEffect } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { useTranslation } from "react-i18next";
import AllProductsSkeleton from "../components/skeletons/AllProductsSkeleton.jsx";
import { Helmet } from "react-helmet";
import { Search, Sparkles, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useProductsQuery } from "../hooks/queries/useProductsQuery.js";
import { useCategoriesQuery } from "../hooks/queries/useCategoriesQuery.js";
import { useSubCategoriesQuery } from "../hooks/queries/useSubCategoriesQuery.js";

const PRODUCTS_PER_PAGE = 20;

function AllProducts() {
  const [subCategoryID, setSubCategoryID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const categoryId = searchParams.get("categoryId");

  const isRTL = language === "ar";

  const { data: allProducts = [], isLoading: isLoadingProducts } = useProductsQuery();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategoriesQuery();
  const { data: subCategories = [], isLoading: isLoadingSubCategories } = useSubCategoriesQuery();

  // Reset to page 1 whenever category or search filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, subCategoryID, searchQuery]);

  const mainCategoryData = useMemo(() => {
    if (!categoryId || !categories) return null;
    return categories.find((c) => String(c.id) === String(categoryId));
  }, [categoryId, categories]);

  // Filter products based on categoryId, subCategoryID, and search
  const filteredProducts = useMemo(() => {
    let result = allProducts || [];

    if (categoryId) {
      result = result.filter((product) => String(product.cafe_id) === String(categoryId));
    }

    if (subCategoryID) {
      result = result.filter(
        (product) =>
          String(product.sub_cafe_id) === String(subCategoryID) ||
          String(product.sub_category_id) === String(subCategoryID)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const name = (
          language === "ar"
            ? p?.translations?.[0]?.name || p?.name
            : p?.translations?.[1]?.name || p?.name
        )?.toLowerCase();
        return name?.includes(q);
      });
    }

    return result;
  }, [allProducts, categoryId, subCategoryID, searchQuery, language]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;

  // Sliced paginated products (20 products per page)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const mainSection = document.getElementById("products-content-section");
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  const isLoading = isLoadingProducts || isLoadingCategories || isLoadingSubCategories;

  if (isLoading && allProducts.length === 0) {
    return <AllProductsSkeleton />;
  }

  const pageTitle =
    language === "ar"
      ? mainCategoryData?.translations?.[0]?.name || mainCategoryData?.name || t("products")
      : mainCategoryData?.translations?.[1]?.name || mainCategoryData?.name || t("products");

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>{pageTitle} | Ovanza</title>
        <meta
          name="description"
          content="Explore our complete line of luxury cosmetics, hair care, and professional salon beauty products."
        />
      </Helmet>

      {/* Breadcrumb Header */}
      <Breadcrumb
        page={pageTitle}
        subtitle={
          isRTL
            ? "تشكيلة حصرية من أرقى المستحضرات الاحترافية المصممة بعناية فائقة"
            : "Master-crafted formulations designed for luxury salons and discerning beauty connoisseurs."
        }
      />

      {/* Category Pills Navigation */}
      <ProductCategories
        subCategories={subCategories}
        setSubCategoryID={setSubCategoryID}
        selectedSubCategoryID={subCategoryID}
        fetchAllProducts={() => setSubCategoryID(null)}
      />

      {/* Main Container */}
      <main id="products-content-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div className="text-zinc-400 text-xs sm:text-sm font-sans flex items-center gap-2 self-start sm:self-auto">
            <Sparkles className="w-4 h-4 text-white/70" />
            <span>
              {isRTL
                ? `عرض ${filteredProducts.length} منتج متميز${
                    totalPages > 1 ? ` (صفحة ${currentPage} من ${totalPages})` : ""
                  }`
                : `Showing ${filteredProducts.length} signature products${
                    totalPages > 1 ? ` (Page ${currentPage} of ${totalPages})` : ""
                  }`}
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRTL ? "ابحث عن منتج..." : "Search products..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#141414] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-white/30 transition-all duration-200"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Content Section */}
        {filteredProducts.length > 0 ? (
          <>
            <ProductGrid products={paginatedProducts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredProducts.length}
              pageSize={PRODUCTS_PER_PAGE}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center py-16"
          >
            <div className="rounded-3xl bg-[#141414] border border-white/[0.08] p-10 sm:p-14 text-center max-w-lg shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-6">
                <PackageOpen className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {isRTL ? "لم يتم العثور على منتجات" : "No Products Found"}
              </h3>
              <p className="text-zinc-400 text-sm mb-8 font-sans leading-relaxed">
                {isRTL
                  ? "عفواً، لا توجد منتجات مطابقة لهذا القسم حالياً. يرجى تجربة تصنيف آخر."
                  : "Sorry, there are no products currently available in this selection. Please choose another category."}
              </p>
              <button
                onClick={() => {
                  setSubCategoryID(null);
                  setSearchQuery("");
                }}
                className="px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
              >
                {t("all_products")}
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default AllProducts;
