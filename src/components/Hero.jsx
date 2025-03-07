import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../App'; // Import useLanguage from App

gsap.registerPlugin(ScrollTrigger);

const images = ['/images/hero1.jpg', '/images/hero2.jpg'];

// Translation object
const translations = {
  en: {
    welcome: 'Welcome to Legion',
    subText: 'Your choice, our trust',
    getStarted: 'Get Started',
  },
  ar: {
    welcome: 'مرحبًا بكم في ليجيون',
    subText: 'اختيارك، ثقتنا',
    getStarted: 'ابدأ الآن',
  },
};

function Hero() {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { language } = useLanguage(); // Access language from context
  const t = translations[language]; // Select translations based on language

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      backgroundPositionY: '50%',
    });
  }, []);

  // Split welcome text based on current language
  const welcomeText = t.welcome.split(' ');

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center"
      dir={language === 'ar' ? 'rtl' : 'ltr'} // Set direction based on language
    >
      {/* Background Image Transition */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: current === index ? 1 : 0, zIndex: current === index ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <img
              src={img}
              alt={`Hero Image ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="transition-opacity duration-1000"
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={() => console.error(`Failed to load image: ${img}`)}
            />
          </motion.div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Hero Content */}
      <motion.div
        className={`relative z-20 container mx-auto flex flex-col md:flex-row items-start justify-between px-6 md:px-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-lg">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
            {welcomeText.map((word, index) => (
              <motion.span
                key={index}
                className={`inline-block ${language === 'en' ? 'mr-2' : 'ml-2'}`} // Adjust spacing for RTL
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.div
            className="flex items-center gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-sm sm:text-lg md:text-xl text-gray-300">{t.subText}</p>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-2 py-1 sm:px-3 sm:py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-lg cursor-pointer transition-all transform hover:scale-103 text-sm sm:text-base"
            >
              {t.getStarted}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;