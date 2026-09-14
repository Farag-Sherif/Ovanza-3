import { Helmet } from "react-helmet";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { DataContext } from "../contexts/DataContext.jsx";

// Redesigned Luxury Components V2
import HeroV2 from "../components/HeroV2.jsx";
import StackedProducts from "../components/StackedProducts.jsx";
import OurBrands from "../components/OurBrands.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Statistics from "../components/Statistics.jsx";
import CallToAction from "../components/CallToAction.jsx";
import CommercialShowcase from "../components/CommercialShowcase.jsx";
import VisionMission from "../components/VisionMission.jsx";
import Categories from "../components/Categories.jsx";
import BlogFeatured from "../wrappers/blog-featured/BlogFeatured.jsx";

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
    <div className="bg-black text-white selection:bg-white/20 selection:text-white min-h-screen page-transition-wrapper">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      {/* 1. Cinematic Hero */}
      <HeroV2 />

      {/* 2. Collections / Categories */}
      <Categories />

      {/* 3. Stacked Products Discovery */}
      <StackedProducts />

      {/* 4. Brands Marquee */}
      <OurBrands />

      {/* 5. Ovanza Story (About) */}
      <AboutUs />

      {/* 6. Vision / Mission */}
      <VisionMission />

      {/* 7. Commercial / Creative Showcase */}
      <CommercialShowcase />

      {/* 8. Trust / Numbers */}
      <Statistics />

      {/* 9. Editorial Blog */}
      <BlogFeatured spaceBottomClass="pb-32" spaceTopClass="pt-32" />

      {/* 10. Final CTA */}
      <CallToAction />

    </div>
  );
}
