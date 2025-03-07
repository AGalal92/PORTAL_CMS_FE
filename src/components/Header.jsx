import React, { useEffect, useState } from "react";
import { useTheme, useLanguage } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Home, Info, Build, Work, Group, Mail } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { darkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(true); // Menu always open on desktop
    } else {
      setMenuOpen(false); // Menu closed by default on mobile
    }
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "about", "services", "projects", "team", "contact"];
      let current = "home";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = section;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
    if (isMobile) setMenuOpen(false);
  };

  // Navigation items with icons
  const navItems = [
    { id: "home", icon: <Home />, label: language === "en" ? "Home" : "الرئيسية" },
    { id: "about", icon: <Info />, label: language === "en" ? "About" : "من نحن" },
    { id: "services", icon: <Build />, label: language === "en" ? "Services" : "الخدمات" },
    { id: "projects", icon: <Work />, label: language === "en" ? "Projects" : "المشاريع" },
    { id: "team", icon: <Group />, label: language === "en" ? "Team" : "الفريق" },
    { id: "contact", icon: <Mail />, label: language === "en" ? "Contact" : "اتصل بنا" },
  ];

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? darkMode
              ? "backdrop-blur-md bg-gray-900/20 shadow-lg"
              : "backdrop-blur-md bg-gray-100/20 shadow-lg"
            : "bg-transparent"
        }`}
        dir={language === "ar" ? "rtl" : "ltr"} // Apply direction to header
      >
        <div className="flex justify-between items-center px-4 py-2">
          {/* Logo */}
          <div className="w-40">
            <Link to="/">
              <img
                src={darkMode ? "/images/logoDark.png" : "/images/logoLight.png"}
                alt="Legion Logo"
                loading="lazy"
                className="w-full h-auto"
              />
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              title="Toggle Dark Mode"
              onClick={(e) => toggleDarkMode(e)}
              className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? "🌞" : "🌙"}
            </motion.button>

            <motion.button
              title="Toggle Language"
              onClick={toggleLanguage}
              className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {language === "en" ? "AR" : "EN"}
            </motion.button>

            {isMobile && (
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
                whileTap={{ scale: 0.9 }}
              >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.button>
            )}
          </div>
        </div>
      </header>

      {/* Left/Right Vertical Navigation with Icons */}
      <AnimatePresence>
        {(menuOpen || !isMobile) && (
          <motion.nav
            initial={{ x: language === "ar" ? 250 : -250 }}
            animate={{ x: 0 }}
            exit={{ x: language === "ar" ? 250 : -250 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${language === "ar" ? "right-0" : "left-0"} top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4 px-4 py-6 w-20 ${
              activeSection === "home"
                ? darkMode
                  ? "bg-gray-900/90 text-white backdrop-blur-md shadow-lg rounded-r-lg"
                  : "bg-gray-100/90 text-black backdrop-blur-md shadow-lg rounded-r-lg"
                : "" // Transparent when not 'home'
            }`}
            dir={language === "ar" ? "rtl" : "ltr"} // Apply direction to nav
          >
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className={`flex items-center justify-center p-2 rounded-full cursor-pointer transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-yellow-500 text-white shadow-md"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.2 }}
                title={item.label}
              >
                {React.cloneElement(item.icon, {
                  style: { fontSize: "28px" },
                })}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;