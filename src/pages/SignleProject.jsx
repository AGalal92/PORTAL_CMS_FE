import React, { useState } from "react";
import { useTheme, useLanguage } from "../App";
import { FiExternalLink, FiMaximize } from "react-icons/fi"; // Import the full-screen icon
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScreenSize } from "../hooks/useScreenSize";
import { useParams, Link } from "react-router-dom";

// Translation object
const translations = {
  en: {
    backToProjects: "Back to Projects",
    technologiesUsed: "Technologies Used:",
    visitProject: "Visit Project",
    projectVideos: "Project Videos",
    projectsData: [
      {
        id: 1,
        name: "Sphinx Platform",
        description:
          "A dynamic web solution for a swimming school designed to track student progress and attendance. This system empowers parents to monitor their child's training performance and grades, ensuring clear communication and continuous improvement. Its intuitive interface streamlines administration while creating a supportive learning environment.",
        technologies: ["Next.js", "Tailwind CSS", "PHP Laravel", "MySQL", "Bootstrap", "Material UI"],
      },
      {
        id: 2,
        name: "EGAC Portfolio",
        description:
          "A comprehensive web solution for a leading HVAC and home improvement company. This project features an intuitive website that showcases services, projects, and products, along with powerful administrative modules for content management, customer inquiries, and employee performance tracking. It streamlines operations and boosts customer engagement.",
        technologies: ["React.js", "Tailwind CSS", "PHP Laravel", "MySQL", "Bootstrap", "Material UI"],
      },
    ],
  },
  ar: {
    backToProjects: "العودة إلى المشاريع",
    technologiesUsed: "التقنيات المستخدمة:",
    visitProject: "زيارة المشروع",
    projectVideos: "فيديوهات المشروع",
    projectsData: [
      {
        id: 1,
        name: "منصة سفنكس",
        description:
          "حل ويب ديناميكي لمدرسة سباحة مصمم لتتبع تقدم الطلاب وحضورهم. تمكّن هذه النظام الآباء من مراقبة أداء أطفالهم التدريبي ودرجاتهم، مما يضمن تواصلًا واضحًا وتحسينًا مستمرًا. واجهته البديهية تعمل على تبسيط الإدارة مع خلق بيئة تعليمية داعمة.",
        technologies: ["Next.js", "Tailwind CSS", "PHP Laravel", "MySQL", "Bootstrap", "Material UI"],
      },
      {
        id: 2,
        name: "منصة EGAC",
        description:
          "حل ويب متكامل لشركة رائدة في مجال التكييف المركزي وتحسين المنازل. يتميز هذا المشروع بموقع إلكتروني سهل الاستخدام يعرض الخدمات، المشاريع، والمنتجات، بالإضافة إلى لوحة تحكم متكاملة لإدارة المحتوى، استفسارات العملاء، وتتبع أداء الموظفين. يُسهم هذا الحل في تبسيط العمليات وتعزيز تفاعل العملاء",
        technologies: ["React.js", "Tailwind CSS", "PHP Laravel", "MySQL", "Bootstrap", "Material UI"],
      },
    ],
  },
};

// Project data
export const projectsData = [
  {
    id: 1,
    image: "/images/sphinxLogin.png",
    category: "Web",
    link: "https://sphinx.legionagency.tech",
    created_at: "2023-08-15",
    updated_at: "2024-01-10",
    images: ["/images/sphinxLogin.png", "/images/sphinxAdmin.png", "/images/sphinxAdminLight.png", "/images/sphinxSwimmer.png"],
    video: ["/videos/sphinxWeb.mp4", "/videos/sphinxMobile.mp4"],
  },
  {
    id: 2,
    image: "/images/EgacPortfolio.png",
    category: "Portfolio",
    link: "https://HVAC.legionagency.tech",
    created_at: "2025-02-28",
    updated_at: "2025-03-05",
    images: ["/images/egac1.png", "/images/egac2.png", "/images/egac3.png", "/images/egac4.png"],
    video: ["/videos/EgacPortfolio.mp4", "/videos/EgacAdmin.mp4"],
  },
];

function ProjectDetails() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false); // Full-screen preview state

  const t = translations[language];
  const projectData = projectsData.find((p) => p.id === parseInt(id));
  const projectTranslation = t.projectsData.find((p) => p.id === parseInt(id));

  if (!projectData || !projectTranslation) {
    return (
      <h1 className="text-center text-red-500 text-3xl font-raleway py-16">
        {language === "en" ? "Project Not Found" : "المشروع غير موجود"}
      </h1>
    );
  }

  const project = { ...projectData, ...projectTranslation };

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

  const slideVariants = {
    initial: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    animate: { x: "0%", opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }),
  };

  return (
    <section
      className={`p-30 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/#projects"
            className="text-yellow-500 text-sm md:text-base font-raleway flex items-center gap-2"
          >
            ← {t.backToProjects}
          </Link>
        </div>

        {/* Project Header */}
        <div className={`flex flex-col ${isMobile ? "gap-6" : "md:flex-row md:gap-8"} items-center`}>
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`w-full ${isMobile ? "" : "md:w-1/2"}`}
          >
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-[20px] shadow-lg">
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
                    className="object-cover w-full h-full rounded-[20px]"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Full-Screen Icon */}
              <button
                aria-label="Full Screen"
                onClick={() => setIsFullScreen(true)}
                className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-black/70 transition-all"
              >
                <FiMaximize size={20} />
              </button>
              {/* Navigation Arrows */}
              <button
                aria-label="Previous Image"
                onClick={prevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-black/70 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                aria-label="Next Image"
                onClick={nextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-black/70 transition-all"
              >
                <ChevronRight size={20} />
              </button>
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {project.images.map((_, index) => (
                  <motion.div
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      index === currentImage ? "bg-yellow-500 scale-125" : "bg-gray-500"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-full ${isMobile ? "" : "md:w-1/2"}`}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-raleway">{project.name}</h1>
            <p
              className={`mt-4 text-xs sm:text-sm md:text-base ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {project.description}
            </p>
            <div className="mt-4">
              <h3 className="text-sm sm:text-lg md:text-xl font-semibold font-raleway">
                {t.technologiesUsed}
              </h3>
              <ul className="flex gap-2 mt-2 flex-wrap">
                {project.technologies.map((tech, index) => (
                  <li
                    key={index}
                    className="bg-yellow-500 px-2 py-1 rounded-full text-black text-xs sm:text-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-yellow-500 text-sm md:text-base font-raleway hover:underline"
              >
                {t.visitProject} <FiExternalLink size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Project Videos */}
        {Array.isArray(project.video) && project.video.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-raleway mb-4">
              {t.projectVideos}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.video.map((videoSrc, index) => (
                <div
                  key={index}
                  className="relative w-full overflow-hidden rounded-[20px] shadow-lg"
                  style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
                >
                  <video
                    src={videoSrc}
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-[20px]"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Full-Screen Preview */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            aria-label="Close Full Screen"
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>
          <img
            src={project.images[currentImage]}
            alt={project.name}
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </section>
  );
}

export default ProjectDetails;