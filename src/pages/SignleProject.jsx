import React, { useState } from "react";
import { useTheme, useLanguage } from "../App";
import { FiExternalLink, FiMaximize } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScreenSize } from "../hooks/useScreenSize";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Updated import

const translations = {
  en: {
    backToProjects: "Back to Projects",
    technologiesUsed: "Technologies Used:",
    visitProject: "Visit Project",
    projectVideos: "Project Videos",
  },
  ar: {
    backToProjects: "العودة إلى المشاريع",
    technologiesUsed: "التقنيات المستخدمة:",
    visitProject: "زيارة المشروع",
    projectVideos: "فيديوهات المشروع",
  },
};

export const projectsData = [
  {
    id: 1,
    name: "Sphinx Platform",
    image: "/images/sphinxLogin.png",
    category: "Web",
    link: "https://sphinx.legionagency.tech",
    created_at: "2023-08-15",
    updated_at: "2024-01-10",
    images: ["/images/sphinxLogin.png", "/images/sphinxAdmin.png", "/images/sphinxAdminLight.png", "/images/sphinxSwimmer.png"],
    video: ["/videos/sphinxWeb.mp4", "/videos/sphinxMobile.mp4"],
    description:
      "A dynamic web solution for a swimming school designed to track student progress and attendance. This system empowers parents to monitor their child's training performance and grades, ensuring clear communication and continuous improvement.",
    technologies: ["Next.js", "Tailwind CSS", "PHP Laravel", "MySQL", "Bootstrap", "Material UI"],
  },
  {
    id: 2,
    name: "EGAC Portfolio",
    image: "/images/EgacPortfolio.png",
    category: "Portfolio",
    link: "https://HVAC.legionagency.tech",
    created_at: "2025-02-28",
    updated_at: "2025-03-05",
    images: ["/images/egac1.png", "/images/egac2.png", "/images/egac3.png", "/images/egac4.png"],
    video: ["/videos/EgacPortfolio.mp4", "/videos/EgacAdmin.mp4"],
    description:
      "A comprehensive web solution for a leading HVAC and home improvement company. This project features an intuitive website that showcases services, projects, and products, along with powerful administrative modules.",
    technologies: ["React.js", "Tailwind CSS", "PHP Laravel", "MySQL", "Bootstrap", "Material UI"],
  },
  {
    id: 3,
    name: "Brainy Battalion Portfolio",
    image: "/images/brainy1.png",
    category: "Portfolio",
    link: "#",
    created_at: "2025-02-28",
    updated_at: "2025-03-05",
    images: ["/images/brainy1.png", "/images/brainy2.png", "/images/brainy3.png"],
    video: ["/videos/brainy.mp4"],
    description:
      "BrainyBattalion is a cybersecurity company that protects businesses from digital threats. We combine technical expertise with creative strategies to deliver strong security solutions.",
    technologies: ["React.js", "Tailwind CSS", "PHP Laravel", "MySQL", "Bootstrap", "Material UI"],
  },
];

function ProjectDetails() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile } = useScreenSize();
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const t = translations[language];
  const project = projectsData.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <h1 className="text-center text-red-500 text-3xl font-raleway py-16">
        {language === "en" ? "Project Not Found" : "المشروع غير موجود"}
      </h1>
    );
  }

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
      className={`py-30 transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": project.name,
            "description": project.description,
            "url": `https://legionagency.tech/projects/${project.id}`,
            "image": project.images[0],
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://legionagency.tech/" },
                { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://legionagency.tech/#projects" },
                { "@type": "ListItem", "position": 3, "name": project.name, "item": `https://legionagency.tech/projects/${project.id}` },
              ],
            },
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 text-xs sm:text-sm md:text-base">
          <Link to="/" className="text-yellow-500 hover:underline">Home</Link> /
          <Link to="/#projects" className="text-yellow-500 hover:underline">Projects</Link> / 
          <span>{project.name}</span>
        </nav>

        <div className={`flex flex-col ${isMobile ? "gap-6" : "md:flex-row md:gap-8"} items-center`}>
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
                    alt={`${project.name} - Legion Agency Project`}
                    className="object-cover w-full h-full rounded-[20px]"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
              <button
                aria-label="Full Screen"
                onClick={() => setIsFullScreen(true)}
                className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-black/70 transition-all"
              >
                <FiMaximize size={20} />
              </button>
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

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-full ${isMobile ? "" : "md:w-1/2"}`}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-raleway">{project.name}</h1>
            <p className={`mt-4 text-xs sm:text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {project.description}
            </p>
            <div className="mt-4">
              <h3 className="text-sm sm:text-lg md:text-xl font-semibold font-raleway">{t.technologiesUsed}</h3>
              <ul className="flex gap-2 mt-2 flex-wrap">
                {project.technologies.map((tech, index) => (
                  <li key={index} className="bg-yellow-500 px-2 py-1 rounded-full text-black text-xs sm:text-sm">
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

        {Array.isArray(project.video) && project.video.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-raleway mb-4">{t.projectVideos}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.video.map((videoSrc, index) => (
                <div key={index} className="relative w-full overflow-hidden rounded-[20px] shadow-lg" style={{ paddingBottom: "56.25%" }}>
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

      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            aria-label="Close Full Screen"
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ×
          </button>
          <img src={project.images[currentImage]} alt={`${project.name} - Full Screen`} className="max-w-full max-h-full" />
        </div>
      )}
    </section>
  );
}

export default ProjectDetails;