import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, useLanguage } from "../App";
import { useScreenSize } from "../hooks/useScreenSize";

const HomePage = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const [currentSlide, setCurrentSlide] = useState(0);

  const translations = {
    en: {
      slides: [
        {
          title: "Software Solutions",
          description:
            "Make your own business grow with good & professionals  .",
          button: "Learn More",
        },
        {
          title: "Design Excellence",
          description: "From wireframes to prototypes, I craft perfection.",
          button: "Learn More",
        },
        {
          title: "Get Started",
          description: "Transform your ideas into reality today.",
          button: "Start Now",
        },
      ],
    },
    ar: {
      slides: [
        {
          title: "حلول البرمجيات",
          description: "اصنع أعمالك  الخاصة مع محترفين جيدين.",
          button: "تعرف على المزيد",
        },
        {
          title: "تميز التصميم",
          description: "من الإطارات إلى النماذج، أصنع الكمال.",
          button: "تعرف على المزيد",
        },
        {
          title: "ابدأ الآن",
          description: "حول أفكارك إلى واقع اليوم.",
          button: "ابدأ الآن",
        },
      ],
    },
  };

  const t = translations[language].slides;
  const slidesCount = t.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  const slideVariants = {
    enter: {
      opacity: 0,
      x: language === "ar" ? 100 : -100,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: language === "ar" ? -100 : 100,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url(images/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 21, 46, 0.7)",
          zIndex: 1,
        }}
      />

      {/* Slider Content */}
      <div
        className="container position-relative"
        style={{
          zIndex: 2,
          padding: isMobile ? "2rem" : "4rem",
          color: "white",
          textAlign: language === "ar" ? "right" : "left",
        }}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Title */}
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              className={`font-raleway fw-extrabold ${
                isMobile ? "display-2" : isTablet ? "display-1" : "display-1"
              }`}
              style={{
                fontWeight: "bolder",
                color: "var(--tertiary-color, #ffffff)",
                fontSize: isMobile ? "4rem" : isTablet ? "5rem" : "6rem",
              }}
            >
              <h3> {t[currentSlide].title}</h3>
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              className={`${isMobile ? "fs-3" : "fs-2"}`}
              style={{
                color: "var(--tertiary-color, #ffffff)",
                maxWidth: "800px",
                marginBottom: "3rem",
                fontSize: isMobile ? "1.5rem" : "1.7rem",
              }}
            >
              {t[currentSlide].description}
            </motion.p>

            {/* Button */}
            <motion.button
              custom={2}
              initial="hidden"
              animate="visible"
              style={{
                backgroundColor: "#0c59db",
                color: "var(--secondary-color, #ffffff)",
                transition: "all 0.3s ease",
                fontSize: isMobile ? "1.25rem" : "1.5rem",
                fontWeight: "bold",
                padding: "1rem 2.5rem",
                cursor: "pointer",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "var(--secondary-color, #ffffff)",
                color: "white",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 style={{ color: "white" }}> {t[currentSlide].button}</h3>
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {/* <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "1rem",
          }}
        >
          <button
            onClick={prevSlide}
            className="btn"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "none",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              fontSize: "1.5rem",
              color: "white",
            }}
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="btn"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "none",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              fontSize: "1.5rem",
              color: "white",
            }}
          >
            →
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
