import { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogPost from "../../wrappers/blog/BlogPost";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Helmet } from "react-helmet";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { useBlogDetailsQuery } from "../../hooks/queries/useBlogDetailsQuery";
import { useBlogsQuery } from "../../hooks/queries/useBlogsQuery";

const BlogDetailsStandard = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  const { data: post, isLoading: loadingPost } = useBlogDetailsQuery(id);
  const { data: allBlogs = [] } = useBlogsQuery();

  const postIds = useMemo(() => {
    return (allBlogs || [])
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((p) => p.id);
  }, [allBlogs]);

  const goToAdjacentPost = (direction) => {
    const currentIndex = postIds.indexOf(Number(id));
    if (currentIndex === -1) return;
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < postIds.length) {
      navigate(`/post/${postIds[newIndex]}`);
    }
  };

  if (loadingPost) {
    return <Loading />;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24 px-4">
        <div className="rounded-3xl bg-[#141414] border border-white/[0.08] p-10 sm:p-14 text-center max-w-lg shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-zinc-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {isRTL ? "المقال غير موجود" : "Article Not Found"}
          </h1>
          <p className="text-zinc-400 text-sm mb-8 font-sans leading-relaxed">
            {isRTL
              ? "عفواً، المقال الذي تبحث عنه غير متاح أو تم حذفه."
              : "Sorry, the article you are looking for does not exist or has been removed."}
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
          >
            {t("blog")}
          </button>
        </div>
      </div>
    );
  }

  const translation =
    post?.translations?.find((tr) => tr.locale === language) ||
    post?.translations?.[isRTL ? 0 : 1] ||
    post?.translations?.[0] ||
    {};

  const pageTitle = translation?.title || post?.title || "Editorial Article";
  const currentIndex = postIds.indexOf(Number(id));
  const isFirstPost = currentIndex === 0;
  const isLastPost = currentIndex === postIds.length - 1;

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>{pageTitle} | Ovanza Cosmetics</title>
        <meta
          name="description"
          content={translation?.content?.replace(/<[^>]*>?/gm, "").slice(0, 160)}
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb page={t("blog")} subtitle={pageTitle} />

      {/* Article & Sidebar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Article (8 cols) */}
          <div className="lg:col-span-8">
            <BlogPost data={post} language={language} />

            {/* Adjacent Post Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-white/[0.08] mt-10">
              <button
                onClick={() => goToAdjacentPost(-1)}
                disabled={isFirstPost}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white disabled:opacity-30 disabled:hover:bg-white/[0.05] disabled:hover:text-zinc-300 disabled:cursor-not-allowed transition-all duration-300 text-xs font-bold uppercase tracking-wider font-sans cursor-pointer"
              >
                <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
                <span>{t("prevPost")}</span>
              </button>

              <button
                onClick={() => goToAdjacentPost(1)}
                disabled={isLastPost}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white disabled:opacity-30 disabled:hover:bg-white/[0.05] disabled:hover:text-zinc-300 disabled:cursor-not-allowed transition-all duration-300 text-xs font-bold uppercase tracking-wider font-sans cursor-pointer"
              >
                <span>{t("nextPost")}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsStandard;
