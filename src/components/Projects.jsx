import React, { useState } from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Translation object with only logos
const translations = {
  en: {
    projects: "Clients",
    checkOurProjects: "CHECK OUR CLIENTS",
    projectsData: [
      { id: 1, name: "Sphinx Platform", logo: "/images/sphinxLogo.png" },
      { id: 2, name: "EGAC Platform", logo: "/images/EgAcLogo.png" },
      { id: 4, name: "Madex", logo: "/images/madexLogo.png" },
      { id: 3, name: "Brainy Battalion Platform", logo: "/images/brainLogo.png" },
      { id: 5, name: "Sphinx Platform", logo: "/images/sphinxLogo.png" },
      { id: 6, name: "EGAC Platform", logo: "/images/EgAcLogo.png" },
      { id: 7, name: "Madex", logo: "/images/madexLogo.png" },
      { id: 8, name: "Brainy Battalion Platform", logo: "/images/brainLogo.png" },
      { id: 9, name: "Sphinx Platform", logo: "/images/sphinxLogo.png" },
      { id: 10, name: "EGAC Platform", logo: "/images/EgAcLogo.png" },
      { id: 11, name: "Madex", logo: "/images/madexLogo.png" },
      { id: 12, name: "Brainy Battalion Platform", logo: "/images/brainLogo.png" },
      { id: 13, name: "Sphinx Platform", logo: "/images/sphinxLogo.png" },
      { id: 14, name: "EGAC Platform", logo: "/images/EgAcLogo.png" },
      { id: 15, name: "Madex", logo: "/images/madexLogo.png" },
      { id: 16, name: "Brainy Battalion Platform", logo: "/images/brainLogo.png" },
      { id: 17, name: "Sphinx Platform", logo: "/images/sphinxLogo.png" },
      { id: 18, name: "EGAC Platform", logo: "/images/EgAcLogo.png" },
      { id: 19, name: "Madex", logo: "/images/madexLogo.png" },
      { id: 20, name: "Brainy Battalion Platform", logo: "/images/brainLogo.png" },
    ],
  },
  ar: {
    projects: "العملاء",
    checkOurProjects: "تحقق من عملائنا",
    projectsData: [
      { id: 1, name: "منصة سفنكس", logo: "/images/sphinxLogo.png" },
      { id: 2, name: "منصة EGAC", logo: "/images/EgAcLogo.png" },
      { id: 3, name: "منصة Brainy Battalion", logo: "/images/brainLogo.png" },
      { id: 4, name: "مادكس", logo: "/images/madexLogo.png" },
    ],
  },
};

function Projects() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null); // New state to track direction
  const logosPerSlide = isMobile ? 2 : isTablet ? 3 : 4; // 2 logos on mobile
  const totalSlides = Math.ceil(t.projectsData.length / logosPerSlide);
  const totalLogos = t.projectsData.length;

  // Arrow handlers with direction tracking
  const handlePrev = () => {
    setSlideDirection("left"); // Moving left (content slides right)
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setSlideDirection("right"); // Moving right (content slides left)
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  // Calculate displayed logo range
  const startLogo = currentSlide * logosPerSlide + 1;
  const endLogo = Math.min((currentSlide + 1) * logosPerSlide, totalLogos);
  const logoRange = `${startLogo}-${endLogo} / ${totalLogos}`;

  // Animation variants for smooth sliding
  const slideVariants = {
    initial: () => ({
      x: slideDirection === "right" ? 300 : -300, // Slide from right when going next, left when going prev
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }, // Smooth easing
        opacity: { duration: 0.4 },
      },
    },
    exit: () => ({
      x: slideDirection === "right" ? -300 : 300, // Slide to left when going next, right when going prev
      opacity: 0,
      transition: {
        x: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <section
      id="projects"
      className="py-12"
      style={{
        backgroundColor: "var(--bg-white-color)",
        color: "var(--text-default-color)",
        transition: "var(--transition-default)",
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className={`${language === "ar" ? "rtl" : "ltr"} container mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Title */}
        <div className="mb-8">
          <p
            className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-extrabold tracking-widest relative inline-block`}
            style={{ color: "var(--text-muted-color)" }}
          >
            {t.projects}
            <span
              className={`absolute top-1/2 w-24 h-[2px] ${
                language === "ar" ? "right-22" : "left-27"
              }`}
              style={{ backgroundColor: "var(--primary-color)" }}
            ></span>
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === "ar" ? "text-right" : "text-left"
            } font-raleway`}
            style={{ color: "var(--text-heading-color)" }}
          >
            {t.checkOurProjects}
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Project Cards Display */}
          <motion.div
            className="flex justify-center space-x-6"
            key={currentSlide} // Key ensures re-render on slide change
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {t.projectsData
              .slice(currentSlide * logosPerSlide, (currentSlide + 1) * logosPerSlide)
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  darkMode={darkMode}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
              ))}
          </motion.div>

          {/* Navigation Arrows and Counter */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-6">
              <motion.button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: currentSlide === 0 ? 1 : 1.1 }}
                whileTap={{ scale: currentSlide === 0 ? 1 : 0.95 }}
                style={{
                  border: "2px solid var(--primary-color)",
                }}
              >
                <FiChevronLeft size={24} />
              </motion.button>

              <span
                className="text-sm font-medium"
                style={{
                  color: "var(--text-default-color)",
                  padding: "0.5rem 1rem",
                  backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                  borderRadius: "9999px", // Fully rounded
                }}
              >
                {logoRange}
              </span>

              <motion.button
                onClick={handleNext}
                disabled={currentSlide === totalSlides - 1}
                className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: currentSlide === totalSlides - 1 ? 1 : 1.1 }}
                whileTap={{ scale: currentSlide === totalSlides - 1 ? 1 : 0.95 }}
                style={{
                  border: "2px solid var(--primary-color)",
                }}
              >
                <FiChevronRight size={24} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ project, darkMode, isMobile, isTablet }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.3,
  });

  const width = isMobile ? 150 : isTablet ? 200 : 250;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="flex-shrink-0"
      style={{
        width: `${width}px`,
      }}
    >
      <Link to={`/projects/${project.id}`}>
        <img
          src={project.logo}
          alt={project.name}
          className="object-contain w-full h-auto transition-all duration-300 cursor-pointer"
          style={{
            WebkitFilter: "grayscale(100%)", // Safari prefix
            filter: "grayscale(100%)", // Standard
          }}
          onMouseEnter={(e) => {
            e.target.style.WebkitFilter = "none";
            e.target.style.filter = "none";
          }}
          onMouseLeave={(e) => {
            e.target.style.WebkitFilter = "grayscale(100%)";
            e.target.style.filter = "grayscale(100%)";
          }}
          loading="lazy"
        />
      </Link>
    </motion.div>
  );
};

export default Projects;