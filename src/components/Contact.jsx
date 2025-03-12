import React from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";
import { Link } from "react-router-dom";

// Translation object
const translations = {
  en: {
    contactUs: "Contact Us",
    letsGetStarted: "Let's Get Started",
    description: "At Legion Agency, we provide world-class developers who don’t just join your team — they become the driving force behind your success, pushing boundaries, fueling innovation, and delivering extraordinary results.",
    scheduleCall: "Schedule a Call",
    lookingForJob: "Looking for a job? Apply here",
  },
  ar: {
    contactUs: "اتصل بنا",
    letsGetStarted: "لنبدأ",
    description: "في وكالة ليجيون، نقدم مطورين من الطراز العالمي لا يكتفون بالانضمام إلى فريقك — بل يصبحون القوة الدافعة وراء نجاحك، مدفوعين بالابتكار وتقديم نتائج استثنائية.",
    scheduleCall: "جدولة مكالمة",
    lookingForJob: "تبحث عن وظيفة؟ تقدم هنا",
  },
};

function Contact() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  return (
    <section
    id="contact"
    className="py-10"
    style={{
      backgroundColor: 'var(--bg-white-color)',
      color: 'var(--text-default-color)',
      transition: 'var(--transition-default)',
    }}
    dir={language === "ar" ? "rtl" : "ltr"}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="space-y-8 backdrop-blur-sm bg-opacity-30 p-8"
        style={{
          background:  'var(--card-bg)',
          border: `var(--border-color)`, // Using border color from the theme
          borderRadius: 'var(--border-radius-md)', // Using the large border radius from the theme
          boxShadow: 'var(--shadow-default)', // Using the default shadow from the theme
        }}
      >
        {/* Title */}
        <div className="mb-8">
          <h2
            className={`mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold `}
            style={{ color: 'var(--text-heading-color)' }}
          >
            {t.letsGetStarted}
          </h2>
        </div>
        <div className="mb-8">
          <h5
            className={`mt-4 text-lg sm:text-2xl md:text-3xl font-medium `}
            style={{ color: 'var(--primary-color)' }}
          >
            {t.description}
          </h5>
        </div>
  
     
       
  
        {/* Schedule a Call Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/contact">
            <motion.button
              className={`px-8 py-3 cursor-pointer rounded-full  text-lg font-semibold transition-all duration-300`}
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--tertiary-color)',
                borderRadius: 'var(--border-radius-small)',
                boxShadow: 'var(--shadow-hover)',

              }}
            >
              {t.scheduleCall}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
}

export default Contact;