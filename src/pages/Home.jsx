import { Helmet } from "react-helmet";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { DataContext } from "../contexts/DataContext.jsx";

// Redesigned Luxury Components
import Hero from "../components/Hero.jsx";
import OurBrands from "../components/OurBrands.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Categories from "../components/Categories.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Statistics from "../components/Statistics.jsx";
import Brands from "../components/Brands.jsx";
import QuoteSection from "../components/QuoteSection.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Result from "../components/Result.jsx";
import BlogFeatured from "../wrappers/blog-featured/BlogFeatured.jsx";
import CallToAction from "../components/CallToAction.jsx";
import Contact from "../components/Contact.jsx";

export default function Home() {
  const { language } = useContext(LanguageContext);
  const { data } = useContext(DataContext);

  const isRTL = language === "ar";
  const translation =
    data?.settings?.translations?.find((tr) => tr.locale === language) ||
    data?.settings?.translations?.[isRTL ? 0 : 1] ||
    {};

  const pageTitle = translation?.title || "Ovanza Cosmetics | Luxury & Professional Care";
  const metaDescription =
    translation?.description ||
    "Experience luxury cosmetics, salon-grade hair care, and dermatologically certified beauty solutions from Ovanza.";

  return (
    <div className="bg-black text-white selection:bg-white/20 selection:text-white min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Global Brand Partners */}
      <OurBrands />

      {/* 3. Heritage & About Us */}
      <AboutUs />

      {/* 4. Interactive Product Categories */}
      <Categories />

      {/* 5. Featured Luxury Products */}
      <FeaturedProducts />

      {/* 6. Why Choose Us / Brand Pillars */}
      <WhyChooseUs />

      {/* 7. Animated Statistics & Impact */}
      <Statistics />

      {/* 8. Signature Brand Showcase */}
      <Brands />

      {/* 9. Quality Manifesto Quote */}
      <QuoteSection />

      {/* 10. Client & Salon Testimonials */}
      <Testimonials />

      {/* 11. Statement Banner */}
      <Result />

      {/* 12. Editorial Blog & Guides */}
      <BlogFeatured />

      {/* 13. Call-to-Action Banner */}
      <CallToAction />

      {/* 14. Wholesale & Direct Contact */}
      <Contact />
    </div>
  );
}
