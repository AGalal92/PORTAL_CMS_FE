"use client";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useTheme } from "../layout";
import { motion, AnimatePresence  } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi"; // Menu and close icons
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const [isMobile, setIsMobile] = useState(false); // Detect mobile view
   // ✅ Detect mobile screen on resize
   useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust for tablet/mobile breakpoints
    };

    checkScreenSize(); // Check on initial render
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]); // ✅ Closes menu when switching to desktop


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["hero", "about", "services", "projects", "team", "contact"];
      let current = "hero";
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

  return (
    <header
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isMobile ? (darkMode ? "backdrop-blur-md bg-white/10 shadow-lg" : "backdrop-blur-md bg-black/10 shadow-lg") : "md:bg-transparent"}
        ${isMobile ? "h-17" : ""}
    `}
  >
  
      <div className="w-full flex justify-between items-center px-4">
        {/* ✅ "Legion" now starts from the absolute left of the screen */}
        <img
          src={darkMode ? "/images/logoDark.png" : "/images/logoLight.png"}
          alt="Legion Logo"
          className="h-20 w-auto "
        />

        {/* ✅ Background effect only applies to the navigation items */}
        <motion.nav
          className={`hidden md:flex gap-6 px-6 py-3 rounded-full transition-all duration-300 ${
            isScrolled ? "backdrop-blur-md bg-white/10 shadow-lg" : "bg-transparent"
          }`}
        >
         {["hero", "about", "services", "projects", "team", "contact"].map((item) => (
              <ScrollLink
                key={item}
                to={item}
                smooth={true}
                duration={500}
                className={`cursor-pointer transition ${
                  activeSection === item
                    ? darkMode
                      ? "text-yellow-500 font-bold"  // 🔹 Light blue in dark mode
                      : "text-yellow-500 font-bold"  // 🔹 Dark blue in light mode
                    : darkMode
                    ? "text-gray-300 hover:text-blue-400"  // 🔹 Gray with blue hover in dark mode
                    : "text-gray-800 hover:text-blue-600"  // 🔹 Dark gray with blue hover in light mode
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </ScrollLink>
            ))}

        </motion.nav>

      {/* ✅ Mobile Buttons (Dark Mode & Menu Button Side by Side) */}
            {isMobile ? (
              // 📱 Mobile View: Both buttons are side by side
              <div className="flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <motion.button
                  onClick={(e) => toggleDarkMode(e)}
                  className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
                  whileTap={{ scale: 0.9 }}
                >
                  {darkMode ? "🌞" : "🌙"}
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
              // 💻 Desktop View: Buttons are separate
              <>
                {/* Dark Mode Toggle */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={(e) => toggleDarkMode(e)}
                    className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
                    whileTap={{ scale: 0.9 }}
                  >
                    {darkMode ? "🌞" : "🌙"}
                  </motion.button>
                </div>

                {/* Menu Button (Only for Mobile, so hidden in Desktop) */}
                <div className="md:hidden flex items-center gap-2">
                  <motion.button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
                    whileTap={{ scale: 0.9 }}
                  >
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                  </motion.button>
                </div>
              </>
            )}


      </div>
       {/* ✅ Mobile Navigation Menu */}
       <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          
          >
            <motion.nav className="flex flex-col items-center gap-4 py-4">
              {["hero", "about", "services", "projects", "team", "contact"].map((item) => (
                <ScrollLink
                  key={item}
                  to={item}
                  smooth={true}
                  duration={500}
                  onClick={() => setMenuOpen(false)} // Close menu on click
                  className={`text-lg cursor-pointer transition ${
                    activeSection === item
                      ? darkMode
                        ? "text-yellow-500 font-bold"
                        : "text-yellow-500 font-bold"
                      : darkMode
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-gray-800 hover:text-blue-600"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </ScrollLink>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
