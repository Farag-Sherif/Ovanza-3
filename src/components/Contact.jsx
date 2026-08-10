import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../contexts/LanguageContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useContactMutation } from "../hooks/mutations/useContactMutation.js";
import { useSettingsQuery } from "../hooks/queries/useSettingsQuery.js";

function Contact() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { data } = useSettingsQuery();
  const contactMutation = useContactMutation();

  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const isRTL = language === "ar";
  const settings = data?.settings || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = t("name_required");
      isValid = false;
    } else if (formData.name.length < 2) {
      errors.name = t("name_too_short");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = t("email_required");
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t("invalid_email");
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = t("subject_required");
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = t("message_required");
      isValid = false;
    } else if (formData.message.length < 10) {
      errors.message = t("message_too_short");
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus({ success: false, error: false });

    contactMutation.mutate(
      {
        data: formData,
        language,
      },
      {
        onSuccess: () => {
          setSubmitStatus({ success: true, error: false });
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        onError: () => {
          setSubmitStatus({ success: false, error: true });
        },
      }
    );
  };

  const loading = contactMutation.isPending;

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative overflow-hidden border-t border-white/[0.08]"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3">
            <Mail className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium font-sans">
              {isRTL ? "تواصل مباشر" : "Get In Touch"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t("contact")}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans">
            {t("love_to_hear")}
          </p>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl bg-[#141414] border border-white/[0.08] p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">
                {isRTL ? "معلومات التواصل المباشر" : "Direct Contact Details"}
              </h3>

              <div className="space-y-6">
                {settings.addresse && (
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                        {isRTL ? "العنوان" : "Address"}
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                        {settings.addresse}
                      </p>
                    </div>
                  </div>
                )}

                {settings.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                        {t("Telephone")}
                      </div>
                      <a
                        href={`tel:${settings.phone}`}
                        className="text-sm text-zinc-300 hover:text-white transition-colors font-mono"
                        dir="ltr"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                        {t("Email")}
                      </div>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-sm text-zinc-300 hover:text-white transition-colors font-sans"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                      {isRTL ? "أوقات العمل" : "Business Hours"}
                    </div>
                    <p className="text-sm text-zinc-300 font-sans">
                      {isRTL ? "السبت - الخميس: 9:00 ص - 6:00 م" : "Sat - Thu: 9:00 AM - 6:00 PM"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Salon Inquiry Callout */}
            <div className="rounded-3xl bg-gradient-to-b from-[#181818] to-[#121212] border border-white/[0.08] p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-white" />
                <h4 className="text-sm font-bold text-white">
                  {isRTL ? "طلبات الجملة والصالونات" : "Wholesale & Salon Distribution"}
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {isRTL
                  ? "نوفر أسعاراً خاصة وباقات توزيع حصرية لصالونات التجميل والموزعين المعتمدين."
                  : "We offer tailored wholesale contracts and dedicated account managers for salon chains."}
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#141414] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
              {/* Alert Status */}
              <AnimatePresence>
                {submitStatus.success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 border border-white/20 text-white text-sm mb-6 backdrop-blur-md"
                  >
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                    <span>{t("message_sent_successfully")}</span>
                  </motion.div>
                )}

                {submitStatus.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm mb-6 backdrop-blur-md"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span>{t("failed_to_send")}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      {t("name")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isRTL ? "اسمك الكريم" : "Your full name"}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-[#1c1c1c] border ${
                        validationErrors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/10 focus:border-white"
                      } text-white placeholder-zinc-600 text-sm focus:outline-none transition-colors duration-200`}
                    />
                    {validationErrors.name && (
                      <p className="text-red-400 text-xs mt-1.5 font-sans">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      {t("Email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3.5 rounded-2xl bg-[#1c1c1c] border ${
                        validationErrors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/10 focus:border-white"
                      } text-white placeholder-zinc-600 text-sm focus:outline-none transition-colors duration-200`}
                    />
                    {validationErrors.email && (
                      <p className="text-red-400 text-xs mt-1.5 font-sans">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    {t("subject")} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={isRTL ? "موضوع الاستفسار" : "Subject or inquiry type"}
                    className={`w-full px-4 py-3.5 rounded-2xl bg-[#1c1c1c] border ${
                      validationErrors.subject
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-white"
                    } text-white placeholder-zinc-600 text-sm focus:outline-none transition-colors duration-200`}
                  />
                  {validationErrors.subject && (
                    <p className="text-red-400 text-xs mt-1.5 font-sans">
                      {validationErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    {t("message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={isRTL ? "اكتب رسالتك أو استفسارك هنا..." : "Tell us about your requirements..."}
                    className={`w-full px-4 py-3.5 rounded-2xl bg-[#1c1c1c] border ${
                      validationErrors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-white"
                    } text-white placeholder-zinc-600 text-sm focus:outline-none transition-colors duration-200 resize-none`}
                  />
                  {validationErrors.message && (
                    <p className="text-red-400 text-xs mt-1.5 font-sans">
                      {validationErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{t("send")}</span>
                        <Send className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
                      </>
                    )}
                  </button>

                  <span className="text-xs text-zinc-500 font-sans text-center sm:text-left">
                    {t("get_back")}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;