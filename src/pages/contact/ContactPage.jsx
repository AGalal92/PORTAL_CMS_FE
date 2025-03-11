import React, { useState } from "react";
import { useTheme, useLanguage } from "../../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../../hooks/useScreenSize";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Translation object
const translations = {
  en: {
    contactUs: "Contact Us",
    weWillReachYou: "WE WILL REACH YOU",
    formFields: {
      name: "Your Name",
      subject: "Subject",
      email: "Your Email",
      message: "Your Message",
    },
    sendMessage: "Send Message",
    sending: "Sending...",
    successMessage: "Message sent successfully!",
    errorMessage: "Failed to send message.",
  },
  ar: {
    contactUs: "اتصل بنا",
    weWillReachYou: "سنتواصل معك",
    formFields: {
      name: "اسمك",
      subject: "الموضوع",
      email: "بريدك الإلكتروني",
      message: "رسالتك",
    },
    sendMessage: "إرسال الرسالة",
    sending: "جارٍ الإرسال...",
    successMessage: "تم إرسال الرسالة بنجاح!",
    errorMessage: "فشل في إرسال الرسالة.",
  },
};

function Contact() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_84gh9zo", // Replace with your EmailJS Service ID
        "template_7vmmrtk", // Replace with your EmailJS Template ID
        {
          to_name: language === "en" ? "Legion Agency" : "وكالة ليجيون",
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "44ImNqv1CQtTUBhkg" // Replace with your EmailJS Public Key
      );

      toast.success(t.successMessage);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(t.errorMessage);
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-30 min-h-screen transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            {t.contactUs}
            <span
              className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                language === "ar" ? "right-20" : "left-20"
              }`}
            ></span>
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === "ar" ? "text-right" : "text-left"
            } font-raleway ${darkMode ? "text-white" : "text-black"}`}
          >
            {t.weWillReachYou}
          </h2>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-[20px] shadow-lg p-6"
          style={{
            background: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={` ${isMobile ? "" : "grid-cols-2 grid"} gap-2`}>
              <FormField
                label={t.formFields.name}
                name="name"
                value={form.name}
                handleChange={handleChange}
                darkMode={darkMode}
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <FormField
                label={t.formFields.subject}
                name="subject"
                value={form.subject}
                handleChange={handleChange}
                darkMode={darkMode}
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <FormField
                label={t.formFields.email}
                name="email"
                type="email"
                value={form.email}
                handleChange={handleChange}
                darkMode={darkMode}
                isMobile={isMobile}
                isTablet={isTablet}
                fullWidth
              />
              <FormField
                label={t.formFields.message}
                name="message"
                multiline
                rows={isMobile ? 3 : 5}
                value={form.message}
                handleChange={handleChange}
                darkMode={darkMode}
                isMobile={isMobile}
                isTablet={isTablet}
                fullWidth
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full font-raleway text-sm md:text-base font-semibold transition-all duration-300 ${
                darkMode
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "bg-yellow-500 text-black hover:bg-yellow-400"
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? t.sending : t.sendMessage}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={language === "ar"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </section>
  );
}

const FormField = ({
  label,
  name,
  value,
  handleChange,
  darkMode,
  type = "text",
  multiline = false,
  rows,
  fullWidth = false,
  isMobile,
  isTablet,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={`${fullWidth ? "col-span-2" : "col-span-1"}`}
    >
      <label className="block text-xs sm:text-sm font-raleway mb-1" htmlFor={name}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={handleChange}
          required
          className={`w-full p-3 rounded-[10px] shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 text-white placeholder-gray-400"
              : "bg-white text-black placeholder-gray-500"
          }`}
          placeholder={label}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          required
          className={`w-full p-3 rounded-[10px] shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 text-white placeholder-gray-400"
              : "bg-white text-black placeholder-gray-500"
          }`}
          placeholder={label}
        />
      )}
    </motion.div>
  );
};

export default Contact;