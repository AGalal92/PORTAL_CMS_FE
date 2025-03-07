import React, { useEffect, useState } from 'react';
import { useTheme, useLanguage } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { darkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'services', 'projects', 'team', 'contact'];
      let current = 'home';
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = section;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation items with translations
  const navItems = {
    en: ['home', 'about', 'services', 'projects', 'team', 'contact'],
    ar: ['الرئيسية', 'من نحن', 'الخدمات', 'المشاريع', 'الفريق', 'اتصل بنا'],
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isMobile ? (darkMode ? 'backdrop-blur-md bg-white/10 shadow-lg' : 'backdrop-blur-md bg-black/10 shadow-lg') : 'md:bg-transparent'}
        ${isMobile ? 'h-17' : ''}`}
    >
      <div className="w-full flex justify-between items-center px-4">
        {/* Logo */}
        <div className="lg:w-64 md:w-40 sm:w-40 w-40">
          <img
            src={darkMode ? '/images/logoDark.png' : '/images/logoLight.png'}
            alt="Legion Logo"
            loading="lazy"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Desktop Navigation */}
        <motion.nav
          className={`hidden md:flex gap-6 px-6 py-3 rounded-full transition-all duration-300 ${
            isScrolled ? 'backdrop-blur-md bg-white/10 shadow-lg' : 'bg-transparent'
          }`}
        >
          {navItems[language].map((item, index) => (
            <a
              key={index}
              href={`#${navItems.en[index]}`} // Use English IDs for consistency
              onClick={(e) => handleSmoothScroll(e, navItems.en[index])}
              className={`cursor-pointer transition ${
                activeSection === navItems.en[index]
                  ? darkMode
                    ? 'text-yellow-500 font-bold'
                    : 'text-yellow-500 font-bold'
                  : darkMode
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              {item}
            </a>
          ))}
        </motion.nav>

        {/* Mobile Buttons (Dark Mode, Language Toggle & Menu Button) */}
        {isMobile ? (
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <motion.button
              title="Toggle Dark Mode"
              onClick={(e) => toggleDarkMode(e)}
              className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? '🌞' : '🌙'}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              title="Toggle Language"
              onClick={toggleLanguage}
              className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {language === 'en' ? 'AR' : 'EN'}
            </motion.button>

            {/* Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={(e) => toggleDarkMode(e)}
              className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? '🌞' : '🌙'}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              title="Toggle Language"
              onClick={toggleLanguage}
              className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {language === 'en' ? 'AR' : 'EN'}
            </motion.button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav className="flex flex-col items-center gap-4 py-4">
              {navItems[language].map((item, index) => (
                <a
                  key={index}
                  href={`#${navItems.en[index]}`}
                  onClick={(e) => {
                    handleSmoothScroll(e, navItems.en[index]);
                    setMenuOpen(false);
                  }}
                  className={`text-lg cursor-pointer transition ${
                    activeSection === navItems.en[index]
                      ? darkMode
                        ? 'text-yellow-500 font-bold'
                        : 'text-yellow-500 font-bold'
                      : darkMode
                      ? 'text-gray-300 hover:text-blue-400'
                      : 'text-gray-800 hover:text-blue-600'
                  }`}
                >
                  {item}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;