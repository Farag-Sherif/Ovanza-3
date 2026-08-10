import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumb";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPostsNoSidebar from "../../wrappers/blog/BlogPostsNoSidebar";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

const BlogNoSidebar = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>{t("blog")} | Ovanza Cosmetics</title>
        <meta
          name="description"
          content="Explore expert beauty guides, salon formulation science, and professional hair care trends from Ovanza."
        />
      </Helmet>

      {/* Breadcrumb Header */}
      <Breadcrumb
        page={t("blog")}
        subtitle={
          isRTL
            ? "مقالات حصرية ونصائح احترافية للعناية بالشعر والجمال من خبراء أوفانزا"
            : "Professional hair care insights, salon guides, and beauty trend analysis."
        }
      />

      {/* Main Blog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BlogPostsNoSidebar currentLanguageCode={language} />
        <BlogPagination />
      </main>
    </div>
  );
};

export default BlogNoSidebar;
