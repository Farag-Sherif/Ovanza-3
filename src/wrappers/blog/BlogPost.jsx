import PropTypes from "prop-types";
import { Calendar, User, Sparkles, Share2 } from "lucide-react";
import { normalizeImageUrl, handleImageError } from "../../utils/imageUtils.js";

const BlogPost = ({ data, language }) => {
  if (!data) return null;

  const isRTL = language === "ar";
  const translation =
    data?.translations?.find((t) => t.locale === language) ||
    data?.translations?.[isRTL ? 0 : 1] ||
    data?.translations?.[0] ||
    {};

  const title = translation.title || data.title || "Editorial Article";
  const content = translation.content || data.content || "";

  return (
    <article className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
      {/* Featured Header Stage */}
      <div className="space-y-4">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-zinc-300 font-mono">
            <Calendar className="w-3 h-3 text-zinc-400" />
            <span>
              {new Date(data.created_at || Date.now()).toLocaleDateString(
                isRTL ? "ar-EG" : "en-US",
                { month: "long", day: "numeric", year: "numeric" }
              )}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-zinc-300">
            <Sparkles className="w-3 h-3 text-white" />
            <span>{isRTL ? "مقال تحريري" : "Editorial Story"}</span>
          </div>
        </div>

        {/* Article Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#181818] border border-white/[0.08] shadow-2xl">
        <img
          src={normalizeImageUrl(data.image_path)}
          alt={title}
          className="w-full h-full object-cover filter brightness-95 contrast-105"
          onError={(e) => handleImageError(e)}
        />
      </div>

      {/* Rich Body Content */}
      <div className="prose prose-invert max-w-none text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-light border-b border-white/[0.08] pb-10">
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </article>
  );
};

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

export default BlogPost;
