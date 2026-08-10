import PropTypes from "prop-types";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 20,
}) {
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Pagination Info */}
      <div className="text-xs sm:text-sm text-zinc-400 font-sans">
        {isRTL ? (
          <span>
            عرض <span className="font-semibold text-white">{startItem}</span> -{" "}
            <span className="font-semibold text-white">{endItem}</span> من إجمالي{" "}
            <span className="font-semibold text-white">{totalItems}</span> منتج
          </span>
        ) : (
          <span>
            Showing <span className="font-semibold text-white">{startItem}</span> -{" "}
            <span className="font-semibold text-white">{endItem}</span> of{" "}
            <span className="font-semibold text-white">{totalItems}</span> products
          </span>
        )}
      </div>

      {/* Pagination Controls */}
      <nav
        aria-label="Products Pagination"
        className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#121212] border border-white/[0.08] shadow-xl backdrop-blur-xl"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* First Page Button */}
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          title={isRTL ? "الصفحة الأولى" : "First Page"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            currentPage === 1
              ? "text-zinc-600 cursor-not-allowed opacity-40"
              : "text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
        >
          {isRTL ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </button>

        {/* Previous Button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          title={isRTL ? "الصفحة السابقة" : "Previous Page"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            currentPage === 1
              ? "text-zinc-600 cursor-not-allowed opacity-40"
              : "text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
        >
          {isRTL ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 h-9 flex items-center justify-center text-zinc-600 text-xs font-mono select-none"
                >
                  •••
                </span>
              );
            }

            const isActive = currentPage === item;

            return (
              <button
                key={`page-${item}`}
                onClick={() => handlePageClick(item)}
                aria-current={isActive ? "page" : undefined}
                className={`w-9 h-9 rounded-full text-xs font-bold font-sans transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          title={isRTL ? "الصفحة التالية" : "Next Page"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            currentPage === totalPages
              ? "text-zinc-600 cursor-not-allowed opacity-40"
              : "text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
        >
          {isRTL ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          title={isRTL ? "الصفحة الأخيرة" : "Last Page"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            currentPage === totalPages
              ? "text-zinc-600 cursor-not-allowed opacity-40"
              : "text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
        >
          {isRTL ? (
            <ChevronsLeft className="w-4 h-4" />
          ) : (
            <ChevronsRight className="w-4 h-4" />
          )}
        </button>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
};
