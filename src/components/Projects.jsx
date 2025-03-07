import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, ButtonGroup, Button } from '@mui/material';
import { useTheme, useLanguage } from '../App'; // Import useLanguage
import { useInView } from 'react-intersection-observer';
import { FiExternalLink } from 'react-icons/fi';
import { useScreenSize } from '../hooks/useScreenSize';

// Translation object
const translations = {
  en: {
    projects: 'Projects',
    checkOurProjects: 'CHECK OUR PROJECTS',
    categories: [
      { id: 'all', name: 'All' },
      { id: 'web', name: 'Web' },
      { id: 'portfolio', name: 'portfolio' },


    ],
    projectsData: [
      { id: 1, name: 'Sphinx Platform', image: '/images/sphinxLogin.png', category: 'web' },
      { id: 2, name: 'EGAC Platform', image: '/images/EgacPortfolio.png', category: 'portfolio' },
      // Add more projects here
    ],
  },
  ar: {
    projects: 'المشاريع',
    checkOurProjects: 'تحقق من مشاريعنا',
    categories: [
      { id: 'all', name: 'الكل' },
      { id: 'web', name: 'الويب' },
      { id: 'portfolio', name: 'portfolio' },
    ],
    projectsData: [
      { id: 1, name: 'منصة سفنكس', image: '/images/sphinxLogin.png', category: 'web' },
      { id: 2, name: 'EGAC منصة', image: '/images/EgacPortfolio.png', category: 'portfolio' },

      // Add more projects here
    ],
  },
};

function Projects() {
  const { darkMode } = useTheme();
  const { language } = useLanguage(); // Access language from context
  const t = translations[language]; // Select translations based on language
  const [selectedCategory, setSelectedCategory] = useState(t.categories[0].id); // Default to 'all'
  const { isMobile, isTablet } = useScreenSize();

  // Update selectedCategory when language changes
  useEffect(() => {
    setSelectedCategory(t.categories[0].id); // Reset to 'all' when language changes
  }, [language, t.categories]);

  const filteredProjects =
    selectedCategory === 'all'
      ? t.projectsData
      : t.projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className={`py-16 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'} // Set direction based on language
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned Title with Underline */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            {t.projects}
            <span
              className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                language === 'ar' ? 'right-20' : 'left-20'
              }`} // Adjust underline position based on language
            ></span>
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === 'ar' ? 'text-right' : 'text-left'
            } font-raleway ${darkMode ? 'text-white' : 'text-black'}`} // Adjust text alignment
          >
            {t.checkOurProjects}
          </h2>
        </div>

        {/* Centered Category Tabs */}
        <div className="flex justify-center mb-8">
          <ButtonGroup>
            {t.categories.map((category) => (
              <Button
                title={language === 'en' ? 'Filter by category' : 'تصفية حسب الفئة'}
                key={category.id}
                variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        {/* Project Grid with Animated Cards */}
        <Grid container spacing={4} justifyContent="center">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id} // Use project.id as the key
              project={project}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
              language={language} // Pass language to ProjectCard
            />
          ))}
        </Grid>
      </div>
    </section>
  );
}

const ProjectCard = ({ project, darkMode, isMobile, isTablet, language }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-lg group"
      >
        {/* Image */}
        <img
          src={project.image}
          alt={project.name}
          width={500}
          height={300}
          className="rounded-lg object-cover w-full h-auto"
          loading="lazy"
        />

        {/* Hover Overlay + Link Icon */}
        <motion.div
          className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-white text-lg font-semibold">{project.name}</span>
          <a href={`/projects/${project.id}`} className="mt-2"> {/* Use project.id for redirection */}
            <motion.div
              className="bg-white text-black p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
              whileHover={{ scale: 1.2 }}
            >
              <FiExternalLink size={24} />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </Grid> 
  );
};

export default Projects;