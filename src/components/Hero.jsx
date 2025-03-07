import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../App'; // Import useLanguage from App

gsap.registerPlugin(ScrollTrigger);

const videos = ['/videos/legionHeroEn.mp4', '/videos/legionHeroAr.mp4']; // Video paths for desktop
const mobileVideos = ['/videos/legionMobileEn.mp4', '/videos/legionMobileAr.mp4']; // Video paths for mobile

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

  // Determine the video source based on device type
  const videoSource = isMobile
    ? language === 'en'
      ? mobileVideos[0]
      : mobileVideos[1]
    : language === 'en'
    ? videos[0]
    : videos[1];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center"
      dir={language === 'ar' ? 'rtl' : 'ltr'} // Set direction based on language
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          key={videoSource} // Force re-render when video source changes
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/50 z-10"></div> */}

      {/* Hero Content */}
      {/* <motion.div
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
            className={`flex items-center gap-1 mt-4 ${isMobile ? 'ml-0' : 'ml-320'}`} // Adjust margin for mobile
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6 }}
          >
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
      </motion.div> */}
    </section>
  );
}

export default Hero;