import React, { useState, useEffect, useRef } from "react";
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
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const logosPerSlide = isMobile ? 2 : isTablet ? 3 : 4; // Number of logos visible at once
  const totalSlides = Math.ceil(t.projectsData.length / logosPerSlide);

  // Scroll to the current slide
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: slideWidth * currentSlide,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  // Arrow handlers
  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  // Bullet handler
  const handleBulletClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="projects"
      className="py-12"
      style={{
        backgroundColor: 'var(--bg-white-color)',
        color: 'var(--text-default-color)',
        transition: 'var(--transition-default)',
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className={`${language === "ar" ? "rtl" : "ltr"} container mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Title */}
        <div className="mb-8">
        <p
            className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-extrabold  tracking-widest relative inline-block`}
            style={{ color: 'var(--text-muted-color)' }}
          >
            {t.projects}
            <span
              className={`absolute top-1/2 w-24 h-[2px] ${
                language === "ar" ? "right-22" : "left-27"
              }`}
              style={{ backgroundColor: 'var(--primary-color)' }}
            ></span>
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === "ar" ? "text-right" : "text-left"
            } font-raleway`}
            style={{ color: 'var(--text-heading-color)' }}
          >
            {t.checkOurProjects}
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory overflow-hidden"
            style={{
              scrollBehavior: 'smooth',
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex-shrink-0 w-full flex justify-center space-x-6"
              >
                {t.projectsData
                  .slice(slideIndex * logosPerSlide, (slideIndex + 1) * logosPerSlide)
                  .map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      darkMode={darkMode}
                      isMobile={isMobile}
                      isTablet={isTablet}
                    />
                  ))}
              </div>
            ))}
          </div>

          {/* Navigation (Arrows and Bullets) */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <motion.button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              whileHover={{ scale: currentSlide === 0 ? 1 : 1.1 }}
              whileTap={{ scale: currentSlide === 0 ? 1 : 0.95 }}
            >
              <FiChevronLeft size={18} />
            </motion.button>

            {/* Bullets */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleBulletClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-[var(--primary-color)] scale-125'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--bg-white-color)', opacity: currentSlide === totalSlides - 1 ? 0.5 : 1 }}
              className="p-2 rounded-full dark:text-white shadow-md disabled:opacity-50 transition-all duration-300"
              whileHover={{ scale: currentSlide === totalSlides - 1 ? 1 : 1.1 }}
              whileTap={{ scale: currentSlide === totalSlides - 1 ? 1 : 0.95 }}
            >
              <FiChevronRight size={24} />
            </motion.button>
          </div>
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
      className="flex-shrink-0 "
      style={{
        width: `${width}px`,
      }}
    >
      <Link to={`/projects/${project.id}`}>
        <img
          src={project.logo}
          alt={project.name}
          className="object-contain w-full h-auto transition-all duration-300 filter grayscale hover:filter-none cursor-pointer"
          loading="lazy"
        />
      </Link>
    </motion.div>
  );
};

export default Projects;