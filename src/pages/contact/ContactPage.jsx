import React, { useState } from "react";
import { useTheme, useLanguage } from "../../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../../hooks/useScreenSize";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeamProcess from "../../components/TeamProcess";
import { gaEvent } from "../../analytics/gtag";

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

      // Track successful form submission
      gaEvent('generate_lead', { 
        method: 'contact_form', 
        location: 'contact_page',
        value: 1 
      });

      toast.success(t.successMessage);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      // Track form submission error
      gaEvent('form_error', { 
        form_name: 'contact_form', 
        error_message: error.message 
      });
      
      toast.error(t.errorMessage);
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <section
      id="contact"
      className="py-30 "
      style={{
        backgroundColor: 'var(--tertiary-color)',
        color: 'var(--text-default-color)',
        transition: 'var(--transition-default)',
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
        <div className={`${language === "ar" ? "rtl" : "ltr"} container mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Title */}
        <div className="mb-8">
        <p
            className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-extrabold  tracking-widest relative inline-block`}
            style={{ color: 'var(--text-muted-color)' }}
          >
            {t.contactUs}
            <span
              className={`absolute top-1/2 w-24 h-[2px] ${
                language === "ar" ? "right-22" : "left-27"
              }`}
              style={{ backgroundColor: 'var(--primary-color)' }}
            ></span>
          </p>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === "ar" ? "text-right" : "text-left"
            } font-raleway`}
            style={{ color: 'var(--text-heading-color)' }}
          >
            {t.weWillReachYou}
          </h1>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-6"
          style={{
            border: '15px solid var(--bg-white-color)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`${isMobile ? "" : "grid-cols-2 grid"} gap-2`}>
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
              className="w-full py-3 font-raleway text-sm md:text-base font-semibold cursor-pointer"
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--text-default-color)',
                transition: 'var(--transition-default)',
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
             <h3 style={{ color: 'white' }}> {loading ? t.sending : t.sendMessage}</h3>
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
    <TeamProcess />
    </>
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
      <label
        className="block text-xs sm:text-sm font-raleway mb-1"
        htmlFor={name}
        style={{ color: 'var(--text-muted-color)' }}
      >
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
          className="w-full p-3  focus:outline-none"
          style={{
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-default-color)',
            border: '1px solid var(--border-color)',
            transition: 'var(--transition-default)',
          }}
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
          className="w-full p-3  focus:outline-none"
          style={{
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-default-color)',
            border: '1px solid var(--border-color)',
            transition: 'var(--transition-default)',
          }}
          placeholder={label}
        />
      )}
    </motion.div>
  );
};

export default Contact;