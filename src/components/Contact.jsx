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
      className={`py-20 flex flex-col justify-center items-center transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`} // Gradient background
      dir={language === "ar" ? "rtl" : "ltr"}
     
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 backdrop-blur-sm bg-opacity-30 rounded-[20px] p-8 shadow-lg"
          style={{
            background: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Title */}
          <div className="mb-8  ">
            {/* <p className="text-xs uppercase font-light tracking-widest relative inline-block">
              {t.contactUs}
              <span
                className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                  language === "ar" ? "right-20" : "left-20"
                }`}
              ></span>
            </p> */}
            <h2
              className={`mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold font-raleway ${
                darkMode ? "text-yellow-400" : "text-yellow-400"
              }`}
            >
              {t.letsGetStarted}
            </h2>
          </div>

          {/* Description */}
          <p
            className={`text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t.description}
          </p>

          {/* Schedule a Call Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact">
              <motion.button
                className={`px-8 py-3 rounded-full font-raleway text-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
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