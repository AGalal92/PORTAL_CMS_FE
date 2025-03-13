import React from "react";
import { motion } from "framer-motion";
import { useTheme, useLanguage } from "../App";
import { useScreenSize } from "../hooks/useScreenSize";

const HomePage = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();

  const translations = {
    en: {
      heyo: "Heyo!",
      intro: "I'm John Artur.",
      role: "Web designer.",
      description:
        "From wireframing to prototyping and everything in between, I create stunning websites and digital experiences.",
      email: "Contact Me",
    },
    ar: {
      heyo: "مرحبًا!",
      intro: "أنا جون أرتور.",
      role: "مصمم ويب.",
      description:
        "من التصميم الأولي إلى النماذج الأولية وكل شيء بينهما، أنشئ مواقع ويب مذهلة وتجارب رقمية.",
      email: "اتصل بي",
    },
  };

  const t = translations[language];

  const handleEmailClick = () => {
    window.location.href = "mailto:example@example.com";
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor:'#002249',
          opacity:0.8,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div 
        className="container position-relative text-center"
        style={{ 
          zIndex: 2,
          padding: isMobile ? '2rem' : '4rem',
          color: 'white',
        }}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className={`font-raleway fw-bold ${isMobile ? 'display-4' : isTablet ? 'display-3' : 'display-2'}`}
          style={{ 
            color: 'var(--tertiary-color, #ffffff)',
            marginBottom: '1rem',
          }}
        >
          {t.heyo}
        </motion.h1>

        <motion.h2
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className={`font-raleway fw-bold ${isMobile ? 'display-6' : 'display-5'}`}
          style={{ 
            color: 'var(--tertiary-color, #ffffff)',
            marginBottom: '1rem',
          }}
        >
          {t.intro}
        </motion.h2>

        <motion.h3
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className={`font-raleway fw-bold ${isMobile ? 'h4' : 'h3'}`}
          style={{ 
            color: 'var(--tertiary-color, #ffffff)',
            marginBottom: '1.5rem',
          }}
        >
          {t.role}
        </motion.h3>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className={`${isMobile ? 'fs-6' : 'fs-5'} mx-auto`}
          style={{ 
            color: 'var(--tertiary-color, #ffffff)',
            maxWidth: '600px',
            marginBottom: '2rem',
          }}
        >
          {t.description}
        </motion.p>

        <motion.button
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          onClick={handleEmailClick}
          className="btn px-4 py-2"
          style={{
            backgroundColor: 'transparent',
            border: '2px solid var(--primary-color, #007bff)',
            color: 'var(--primary-color, #007bff)',
            borderRadius: '5px',
            transition: 'all 0.3s ease',
            fontSize: isMobile ? '0.9rem' : '1rem',
          }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: 'var(--primary-color, #007bff)',
            color: 'white',
          }}
          whileTap={{ scale: 0.95 }}
        >
          {t.email}
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;