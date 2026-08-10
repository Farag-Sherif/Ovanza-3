import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useContext, useEffect, Suspense } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Loading from "../components/Loading.jsx";
import CustomCursor from "../components/CustomCursor.jsx";

export default function Layout() {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.className = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <div className={`${language === "ar" ? "rtl" : "ltr"} min-h-screen bg-black text-white selection:bg-[#d4af37] selection:text-black`}>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
