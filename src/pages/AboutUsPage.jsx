import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { DataContext } from "../contexts/DataContext";
import { LanguageContext } from "../contexts/LanguageContext";
import Loading from "../components/Loading";
import Breadcrumb from "../components/Breadcrumb.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Statistics from "../components/Statistics.jsx";
import CallToAction from "../components/CallToAction.jsx";
import { Sparkles, ShieldCheck, Award, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { normalizeImageUrl } from "../utils/imageUtils.js";

function AboutUsPage() {
  const { data, loading } = useContext(DataContext);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

  const isRTL = language === "ar";

  if (loading && !data) {
    return <Loading />;
  }

  const translation =
    data?.settings?.translations?.find((tr) => tr.locale === language) ||
    data?.settings?.translations?.[isRTL ? 0 : 1] ||
    {};

  const aboutText =
    translation?.about_us ||
    (isRTL
      ? "تأسست أوفانزا لتكون المعيار الذهبي في عالم العناية والتجميل الاحترافي، حيث نجمع بين أحدث الابتكارات العلمية والمكونات الطبيعية الفائقة لنقدم مستحضرات ترتقي بإطلالتك وتلبي تطلعات أرقى الصالونات ومراكز التجميل."
      : "Ovanza was founded with a singular purpose: to redefine professional cosmetic excellence. By marrying rigorous scientific research with rare botanical formulations, we deliver products that set the standard for salons and beauty connoisseurs worldwide.");

  const catalogUrl = data?.settings?.about_file_path;

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>{t("aboutUs")} | Ovanza Cosmetics</title>
        <meta
          name="description"
          content="Learn about the heritage, clinical philosophy, and master formulations behind Ovanza Cosmetics."
        />
      </Helmet>

      {/* Breadcrumb Header */}
      <Breadcrumb
        page={t("aboutUs")}
        subtitle={
          isRTL
            ? "رحلة الابتكار والتميز في صياغة أرقى مستحضرات العناية والتجميل"
            : "The story, clinical science, and visionary craft behind our luxury beauty lines."
        }
      />

      {/* Main Narrative Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Narrative */}
          <div className="lg:col-span-7 space-y-8" dir={isRTL ? "rtl" : "ltr"}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium font-sans">
                {isRTL ? "رؤيتنا ورسالتنا" : "Heritage & Philosophy"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {isRTL ? (
                <>إعادة تعريف معايير <span className="text-shimmer">الجمال الفاخر</span></>
              ) : (
                <>Redefining the Boundaries of <span className="text-shimmer">Luxury Beauty</span></>
              )}
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-light">
              {aboutText}
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-400 font-sans">
                  {isRTL
                    ? "تركيبات نقية معتمدة تم اختبارها سريرياً ومطابقة للمواصفات الدولية."
                    : "Pure, dermatologically certified formulas free from harsh sulfates and parabens."}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-400 font-sans">
                  {isRTL
                    ? "شراكات حصرية مع كبرى صالونات التجميل وخبراء الشعر في الشرق الأوسط."
                    : "Trusted supply partner to prestigious salons, stylists, and luxury spa resorts."}
                </p>
              </div>
            </div>

            {catalogUrl && (
              <div className="pt-2">
                <a
                  href={catalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105"
                >
                  <span>{t("catalog")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Media Showcase */}
          <div className="lg:col-span-5">
            {/* Right Visual Stage */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] to-[#121212] border border-white/[0.08] p-4 sm:p-6 overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
              
              <img
                src={
                  normalizeImageUrl(data?.settings?.about_image_path) ||
                  normalizeImageUrl(data?.settings?.main_image_path)
                }
                alt="About Ovanza"
                className="w-full h-auto rounded-2xl object-cover filter brightness-95 contrast-110 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Brand Pillars */}
      <WhyChooseUs />

      {/* Statistics Section */}
      <Statistics />

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
}

export default AboutUsPage;