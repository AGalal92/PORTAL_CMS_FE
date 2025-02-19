"use client";
import { useTheme } from "@/app/layout";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize"; // Import the custom hook

export default function ProjectDetails({ project }) {
  const { darkMode } = useTheme();
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const { isMobile, isTablet } = useScreenSize(); // Get screen size info

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

  // 🔥 Image Slide Animation Variants
  const slideVariants = {
    initial: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    animate: { x: "0%", opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }),
  };

  return (
    <section className={`py-16 transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Header with Back Link */}
        <div className="mb-6">
          <Link href="/#projects" className="text-yellow-500 text-lg hover:underline flex items-center">
            ← Back to Projects
          </Link>
        </div>

        {/* ✅ Project Header */}
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
                  <Image
                    src={project.images[currentImage]}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg shadow-lg"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 🔄 Navigation Arrows */}
            <button
            aria-label="Previous Image"
            aria-labelledby="Previous Image"
            title="Previous Image"
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-black/70"
            >
              <ChevronLeft size={24} />
            </button>
            <button
            aria-label="Next Image"
            aria-labelledby="Next Image"
            title="Next Image"
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-black/70"
            >
              <ChevronRight size={24} />
            </button>

            {/* 🔵 Sliding Dots (Indicators) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {project.images.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                    index === currentImage ? "bg-yellow-500 scale-125" : "bg-gray-500"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* ✅ Right Side: Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold">{project.name}</h1>
            <p className={`mt-4 text-base sm:text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {project.description}
            </p>

            {/* ✅ Technologies Used */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Technologies Used:</h3>
              <ul className="flex gap-3 mt-2 flex-wrap">
                {project.technologies.map((tech, index) => (
                  <li key={index} className="bg-yellow-500 px-3 py-1 rounded-full text-black text-sm">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* ✅ External Link Button */}
            <div className="mt-6">
              <Link href={project.link} target="_blank"  className="flex items-center gap-2 text-yellow-500 text-lg hover:underline">
                Visit Project <FiExternalLink size={20} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ✅ Project Video Section */}
        {Array.isArray(project.video) && project.video.length > 0 && (
  <motion.div
    className="mt-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h3 className="text-2xl font-semibold">Project Videos</h3>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {project.video.map((videoSrc, index) => (
        <div
          key={index}
          className="relative w-full overflow-hidden rounded-lg shadow-lg"
          style={{ paddingBottom: "56.25%" }} // Maintain 16:9 aspect ratio
        >
          <video
            src={videoSrc}
            controls
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            onClick={(e) => {
              if (e.target.requestFullscreen) {
                e.target.requestFullscreen(); // Open in fullscreen
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