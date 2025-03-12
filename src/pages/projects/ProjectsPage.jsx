import React, { useState, useEffect } from "react";
import { useTheme, useLanguage } from "../../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../../hooks/useScreenSize";
import { FiExternalLink } from "react-icons/fi";

// Translation object
const translations = {
  en: {
    projects: "Projects",
    checkOurProjects: "CHECK OUR PROJECTS",
    categories: [
      { id: "all", name: "All" },
      { id: "web", name: "Web" },
      { id: "portfolio", name: "Portfolio" },
    ],
    projectsData: [
      { id: 1, name: "Sphinx Platform", image: "/images/sphinxLogin.png", category: "web" },
      { id: 2, name: "EGAC Platform", image: "/images/EgacPortfolio.png", category: "portfolio" },
      { id: 3, name: "Brainy Battalion Platform", image: "/images/brainy1.png", category: "portfolio" },
      
      // Add more projects here
    ],
  },
  ar: {
    projects: "المشاريع",
    checkOurProjects: "تحقق من مشاريعنا",
    categories: [
      { id: "all", name: "الكل" },
      { id: "web", name: "الويب" },
      { id: "portfolio", name: "محفظة" },
    ],
    projectsData: [
      { id: 1, name: "منصة سفنكس", image: "/images/sphinxLogin.png", category: "web" },
      { id: 2, name: "منصة EGAC", image: "/images/EgacPortfolio.png", category: "portfolio" },
      { id: 3, name: "منصة Brainy Battalion", image: "/images/brainy1.png", category: "portfolio" },
      // Add more projects here
    ],
  },
};

function Projects() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState(t.categories[0].id);

  useEffect(() => {
    setSelectedCategory(t.categories[0].id); // Reset to 'all' when language changes
  }, [language, t.categories]);

  const filteredProjects =
    selectedCategory === "all"
      ? t.projectsData
      : t.projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-20 min-h-screen"
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-default-color)',
        transition: 'var(--transition-default)',
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className={`${language === "ar" ? "rtl" : "ltr"} container mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Title */}
        <div className="mb-8">
        <p
            className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-light tracking-widest relative inline-block`}
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

        {/* Category Buttons */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          {t.categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-raleway text-sm md:text-base transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-[var(--primary-color)] text-[var(--text-default-color)] shadow-[var(--shadow-default)]"
                  : darkMode
                  ? "bg-[var(--card-bg)] text-[var(--text-muted-color)] hover:bg-[var(--overlay-bg)]"
                  : "bg-[var(--card-bg)] text-[var(--text-default-color)] hover:bg-[var(--overlay-bg)]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Gallery Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
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

  const width = isMobile ? 250 : isTablet ? 300 : 350;
  const height = isMobile ? 200 : isTablet ? 250 : 300;

  return (
    <motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  transition={{ duration: 0.8 }}
  className="relative group overflow-hidden"
  style={{
    borderRadius: 'var(--border-radius-md)',
    boxShadow: 'var(--shadow-default)',
  }}
>
  <img
    src={project.image}
    alt={project.name}
    width={width}
    height={height}
    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
    style={{
      borderRadius: 'var(--border-radius-md)',
    }}
    loading="lazy"
  />
  {/* Hover Overlay */}
  <motion.div
    className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{
      backgroundColor: 'var(--overlay-bg)',
    }}
  >
    <h3 className="text-sm sm:text-lg md:text-xl font-semibold font-raleway mb-2" style={{ color: 'var(--primary-color)' }}>
      {project.name}
    </h3>
    <a href={`/projects/${project.id}`} className="mt-2">
      <motion.div
        className="p-2 rounded-full shadow-lg cursor-pointer"
        style={{
          backgroundColor: 'var(--primary-color)',
          color: 'var(--text-default-color)',
          borderRadius: 'var(--border-radius-small)',
          boxShadow: 'var(--shadow-hover)',
        }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        <FiExternalLink size={20} />
      </motion.div>
    </a>
  </motion.div>
</motion.div>
  );
};

export default Projects;