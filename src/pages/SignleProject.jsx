import React, { useState } from 'react';
import { useTheme, useLanguage } from '../App'; // Import useLanguage
import { FiExternalLink } from 'react-icons/fi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScreenSize } from '../hooks/useScreenSize';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Translation object
const translations = {
  en: {
    backToProjects: 'Back to Projects',
    technologiesUsed: 'Technologies Used:',
    visitProject: 'Visit Project',
    projectVideos: 'Project Videos',
    projectsData: [
      {
        id: 1,
        name: 'Sphinx Platform',
        description: 'A dynamic web solution for a swimming school designed to track student progress and attendance. This system empowers parents to monitor their child\'s training performance and grades, ensuring clear communication and continuous improvement. Its intuitive interface streamlines administration while creating a supportive learning environment.',
        technologies: ['Next.js', 'Tailwind CSS', 'PHP Laravel', 'MySQL', 'Bootstrap', 'Material UI'],
      },
      {
        id: 2,
        name: 'EGAC Portfolio',
        description: 'A comprehensive web solution for a leading HVAC and home improvement company. This project features an intuitive website that showcases services, projects, and products, along with powerful administrative modules for content management, customer inquiries, and employee performance tracking. It streamlines operations and boosts customer engagement.',
        technologies: ['React.js', 'Tailwind CSS', 'PHP Laravel', 'MySQL', 'Bootstrap', 'Material UI'],
      },
      // Add other projects here if needed
    ],
  },
  ar: {
    backToProjects: 'العودة إلى المشاريع',
    technologiesUsed: 'التقنيات المستخدمة:',
    visitProject: 'زيارة المشروع',
    projectVideos: 'فيديوهات المشروع',
    projectsData: [
      {
        id: 1,
        name: 'منصة سفنكس',
        description: 'حل ويب ديناميكي لمدرسة سباحة مصمم لتتبع تقدم الطلاب وحضورهم. تمكّن هذه النظام الآباء من مراقبة أداء أطفالهم التدريبي ودرجاتهم، مما يضمن تواصلًا واضحًا وتحسينًا مستمرًا. واجهته البديهية تعمل على تبسيط الإدارة مع خلق بيئة تعليمية داعمة.',
        technologies: ['Next.js', 'Tailwind CSS', 'PHP Laravel', 'MySQL', 'Bootstrap', 'Material UI'],
      },
      {
        id: 2,
        name: 'منصة EGAC',
        description :'حل ويب متكامل لشركة رائدة في مجال التكييف المركزي وتحسين المنازل. يتميز هذا المشروع بموقع إلكتروني سهل الاستخدام يعرض الخدمات، المشاريع، والمنتجات، بالإضافة إلى لوحة تحكم متكاملة لإدارة المحتوى، استفسارات العملاء، وتتبع أداء الموظفين. يُسهم هذا الحل في تبسيط العمليات وتعزيز تفاعل العملاء',
        technologies: ['React.js', 'Tailwind CSS', 'PHP Laravel', 'MySQL', 'Bootstrap', 'Material UI'],
      },
      // Add other projects here if needed
    ],
  },
};

// Project data (moved to component file since no separate server component)
export const projectsData = [
  {
    id: 1,
    image: '/images/sphinxLogin.png',
    category: 'Web',
    link: 'https://sphinx.legionagency.tech',
    created_at: '2023-08-15',
    updated_at: '2024-01-10',
    images: ['/images/sphinxLogin.png', '/images/sphinxAdmin.png', '/images/sphinxAdminLight.png', '/images/sphinxSwimmer.png'],
    video: ['/videos/sphinxWeb.mp4', '/videos/sphinxMobile.mp4'],
  },
  {
    id: 2,
    image: '/images/EgacPortfolio.png',
    category: 'Portfolio',
    link: 'https://HVAC.legionagency.tech',
    created_at: '2025-02-28',
    updated_at: '2025-03-05',
    images: ['/images/egac1.png', '/images/egac2.png', '/images/egac3.png', '/images/egac4.png'],
    video: ['/videos/EgacPortfolio.mp4', '/videos/EgacAdmin.mp4'],
  },
  // Add other projects here if needed
];

function ProjectDetails() {
  const { darkMode } = useTheme();
  const { language } = useLanguage(); // Access language from context
  const { isMobile, isTablet } = useScreenSize();
  const { id } = useParams(); // Get the dynamic id from URL
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);

  const t = translations[language]; // Select translations based on language

  // Find the project based on id
  const projectData = projectsData.find((p) => p.id === parseInt(id)); // Convert id to number
  const projectTranslation = t.projectsData.find((p) => p.id === parseInt(id)); // Convert id to number

  // If project not found, show error message
  if (!projectData || !projectTranslation) {
    return <h1 className="text-center text-red-500 text-3xl">Project Not Found</h1>;
  }

  // Merge static project data with translated fields
  const project = {
    ...projectData,
    ...projectTranslation,
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentImage ? 1 : -1);
    setCurrentImage(index);
  };

  // Image Slide Animation Variants
  const slideVariants = {
    initial: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    animate: { x: '0%', opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }),
  };

  return (
    <section className={`py-16 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Link */}
        <div className="mb-6">
          <Link to="/#projects" className="text-yellow-500 text-lg hover:underline flex items-center">
            ← {t.backToProjects}
          </Link>
        </div>

        {/* Project Header */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left Side: Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full md:w-[600px]"
          >
            <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-lg">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={currentImage}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <img
                    src={project.images[currentImage]}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              aria-label="Previous Image"
              title="Previous Image"
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-black/70"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next Image"
              title="Next Image"
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-black/70"
            >
              <ChevronRight size={24} />
            </button>

            {/* Sliding Dots (Indicators) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {project.images.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                    index === currentImage ? 'bg-yellow-500 scale-125' : 'bg-gray-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Side: Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold">{project.name}</h1>
            <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {project.description}
            </p>

            {/* Technologies Used */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{t.technologiesUsed}</h3>
              <ul className="flex gap-3 mt-2 flex-wrap">
                {project.technologies.map((tech, index) => (
                  <li key={index} className="bg-yellow-500 px-3 py-1 rounded-full text-black text-sm">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* External Link Button */}
            <div className="mt-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-yellow-500 text-lg hover:underline"
              >
                {t.visitProject} <FiExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Project Video Section */}
        {Array.isArray(project.video) && project.video.length > 0 && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold">{t.projectVideos}</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.video.map((videoSrc, index) => (
                <div
                  key={index}
                  className="relative w-full overflow-hidden rounded-lg shadow-lg"
                  style={{ paddingBottom: '56.25%' }} // Maintain 16:9 aspect ratio
                >
                  <video
                    src={videoSrc}
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    onClick={(e) => {
                      if (e.target.requestFullscreen) {
                        e.target.requestFullscreen();
                      } else if (e.target.webkitRequestFullscreen) {
                        e.target.webkitRequestFullscreen();
                      } else if (e.target.mozRequestFullScreen) {
                        e.target.mozRequestFullScreen();
                      } else if (e.target.msRequestFullscreen) {
                        e.target.msRequestFullscreen();
                      }
                    }}
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ProjectDetails;