import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { normalizeImageUrl, handleImageError } from "../utils/imageUtils.js";

const BlogFeaturedFiveSingle = ({ singlePost }) => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

  const isRTL = language === "ar";
  const translation =
    singlePost.translations?.find((tr) => tr.locale === language) ||
    singlePost.translations?.[0] ||
    {};
  const title = translation.title || singlePost.title;
  const content = translation.content || singlePost.content;
  const date = singlePost.created_at
    ? new Date(singlePost.created_at).toLocaleDateString(
        language === "ar" ? "ar-EG" : "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      )
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-3xl bg-[#141414] hover:bg-[#1a1a1a] border border-white/[0.08] hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between"
    >
      {/* Post Thumbnail */}
      <div className="relative h-64 w-full overflow-hidden bg-[#181818]">
        <Link to={`/post/${singlePost.id}`} className="block w-full h-full">
          <img
            src={normalizeImageUrl(singlePost.image_path)}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-90 group-hover:brightness-100"
            loading="lazy"
            decoding="async"
            onError={(e) => handleImageError(e)}
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent pointer-events-none" />
        
        {/* Date Badge */}
        {date && (
          <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-black/75 text-zinc-300 border border-white/10 backdrop-blur-md">
              <Calendar className="w-3 h-3 text-zinc-400" />
              <span>{date}</span>
            </span>
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-zinc-200 transition-colors leading-snug">
            <Link to={`/post/${singlePost.id}`}>{title}</Link>
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed font-sans mb-6">
            {content}
          </p>
        </div>

        {/* Card Footer: Read More & Share */}
        <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
          <Link
            to={`/post/${singlePost.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-zinc-300 transition-colors group/link font-sans"
          >
            <span>{t("readMore")}</span>
            <ArrowRight
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isRTL
                  ? "rotate-180 group-hover/link:-translate-x-1"
                  : "group-hover/link:translate-x-1"
              }`}
            />
          </Link>

          {/* Share Icons */}
          <div className="flex items-center gap-2 text-zinc-500">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.origin + `/post/${singlePost.id}` : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook size={14} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.origin + `/post/${singlePost.id}` : ""
              )}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Share on Twitter"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check out this post: ${typeof window !== "undefined" ? window.location.origin : ""}/post/${singlePost.id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

BlogFeaturedFiveSingle.propTypes = {
  singlePost: PropTypes.object.isRequired,
};

export default BlogFeaturedFiveSingle;
