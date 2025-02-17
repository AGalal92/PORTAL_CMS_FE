"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Grid, ButtonGroup, Button, Box } from "@mui/material";
import Image from "next/image";
import { useTheme } from "../layout";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi"; // Import Link Icon
import { useScreenSize } from "../hooks/useScreenSize"; // Import the custom hook

const projects = [
  { name: "E-commerce-Platform", image: "/images/project1.jpg", category: "Web" },
  { name: "Mobile Banking App", image: "/images/project2.jpg", category: "Mobile" },
  { name: "Portfolio Website", image: "/images/project3.jpg", category: "Web" },
  { name: "Fitness Tracking App", image: "/images/project4.jpg", category: "Mobile" },
  { name: "Admin Dashboard", image: "/images/project5.jpg", category: "Web" },
  { name: "AI Chatbot", image: "/images/project6.jpg", category: "AI" },
];

const categories = ["All", "Web", "Mobile", "AI"];

export default function Projects() {
  const { darkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isMobile, isTablet } = useScreenSize(); // Get screen size info

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-16 transition-all duration-500"
      style={{
        backgroundImage: darkMode
          ? "url('/images/spartaTexture8.png')"
          : "url('/images/spartaTexture5.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        {/* ✅ Spartan-Themed Title */}
        <div className="mb-12">
          <p className="text-xs uppercase font-light tracking-widest text-yellow-500 relative inline-block">
            Projects
            <span className="absolute left-20 top-1/2 w-24 h-[2px] bg-yellow-500"></span>
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-extrabold text-left font-cinzel ${
              darkMode ? "text-yellow-400" : "text-gray-800"
            }`}
          >
            ⚔️ CHECK OUR PROJECTS ⚔️
          </h2>
        </div>

        {/* ✅ Centered Category Tabs with Warrior Feel */}
        <Box className="flex justify-center mb-10">
          <ButtonGroup>
            {categories.map((category) => (
              <Button
                title="Filter by category"
                key={category}
                variant={selectedCategory === category ? "contained" : "outlined"}
                color="warning"
                onClick={() => setSelectedCategory(category)}
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  border: "2px solid rgba(255, 204, 0, 0.6)",
                  color: darkMode ? "yellow" : "black",
                  backgroundColor: selectedCategory === category ? "rgba(255, 204, 0, 0.8)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 204, 0, 1)",
                    color: "black",
                  },
                }}
              >
                {category}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {/* ✅ Project Grid with Animated Cards */}
        <Grid container spacing={6} justifyContent="center">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </Grid>
      </div>
    </section>
  );
}

// ✅ Separate Animated Spartan-Styled Project Card Component
const ProjectCard = ({ project, darkMode, isMobile, isTablet }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  // ✅ Convert Project Name into Slug
  const projectSlug = project.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-lg group border-2 border-yellow-500 shadow-lg hover:shadow-yellow-500 transition-shadow duration-300"
      >
        {/* ✅ Image Only (No Borders or Background) */}
        <Image
          src={project.image}
          alt={project.name}
          width={500}
          height={300}
          className="rounded-lg object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
          priority // Optimize loading for above-the-fold images
        />

        {/* ✅ Hover Overlay + Link Icon */}
        <motion.div
          className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-white text-lg font-semibold">{project.name}</span>
          <Link href={`/projects/${projectSlug}`} className="mt-2">
            <motion.div
              className="bg-yellow-500 text-black p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
              whileHover={{ scale: 1.2 }}
            >
              <FiExternalLink size={24} />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </Grid>
  );
};
