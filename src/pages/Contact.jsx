import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../components/Breadcrumb.jsx";
import ContactComponent from "../components/Contact.jsx";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>{t("contact")} | Ovanza Cosmetics</title>
        <meta
          name="description"
          content="Get in touch with Ovanza for wholesale inquiries, salon partnerships, and customer support."
        />
      </Helmet>

      <Breadcrumb
        page={t("contact")}
        subtitle={t("love_to_hear")}
      />

      <ContactComponent />
    </div>
  );
}
