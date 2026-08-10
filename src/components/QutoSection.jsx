import { useContext } from "react";
import { DataContext } from "../contexts/DataContext.jsx";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import Loading from "./Loading"; // make sure you have a Loading component
import { BsQuote } from "react-icons/bs";

function QutoSection() {
  const { data, loading } = useContext(DataContext);
  const { language } = useContext(LanguageContext);

  // Decide which text to display based on the selected language
  const aboutUsText =
    language === "ar"
      ? data?.settings?.translations[0]?.about_us
      : data?.settings?.translations[1]?.about_us;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section
          id="aboutUs"
          className="relative py-16 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${data?.settings?.logos_back_path}')` }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-[#56399680]" />

          {/* Content container */}
          <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
            <div className="flex flex-col items-center justify-center">
              {/* Inline SVG quote icon */}
             <BsQuote color="#fff" style={{fontSize:'80px'}}/>
              {/* Quote / Description */}
              <blockquote className="text-white text-xl md:text-2xl italic font-light leading-relaxed mb-8">
                “{aboutUsText}”
              </blockquote>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default QutoSection;
