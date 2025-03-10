import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async"; // Updated import
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetails, { projectsData } from "./pages/SignleProject";
import ScrollToTop from "./hooks/ScrollToTop";

const ThemeContext = createContext();
export function useTheme() {
  return useContext(ThemeContext);
}

const LanguageContext = createContext();
export function useLanguage() {
  return useContext(LanguageContext);
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });
  const [animation, setAnimation] = useState(null);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#0D47A1" },
      background: { default: darkMode ? "#121212" : "#ffffff" },
    },
  });

  const toggleDarkMode = (e) => {
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setAnimation({ x: centerX, y: centerY });
    setTimeout(() => {
      setDarkMode((prev) => !prev);
      setAnimation(null);
    }, 400);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const getMetaTags = () => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/projects")) {
      const projectId = currentPath.split("/")[2];
      const project = projectsData.find((p) => p.id === parseInt(projectId));
      if (project) {
        const description = project.description || "A project by Legion Agency showcasing innovative tech solutions.";
        return {
          title: `${project.name} | Legion Agency`,
          description: `Explore ${project.name} by Legion Agency - ${description.substring(0, 150)}...`,
          keywords: `${project.name}, legion agency, ${project.technologies ? project.technologies.join(", ") : "web development, app development"}`,
          canonical: `https://legionagency.tech/projects/${project.id}`,
        };
      }
      return {
        title: "Project Not Found | Legion Agency",
        description: "This project could not be found. Explore our other web and app development solutions!",
        keywords: "legion agency, web development, app development",
        canonical: `https://legionagency.tech${currentPath}`,
      };
    }
    return {
      title: "Legion Agency | Web & App Development Solutions",
      description: "Legion Agency offers expert web and app development services. Boost your business with innovative tech solutions!",
      keywords: "legion agency, web development, app development, tech solutions, creative agency",
      canonical: "https://legionagency.tech/",
    };
  };

  const meta = getMetaTags();

  return (
    <HelmetProvider> {/* Wrap the app with HelmetProvider */}
      <Helmet>
        <html lang={language} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={meta.canonical} />
      </Helmet>

      <div
        className={`${darkMode ? "dark bg-black text-white" : "bg-white text-black"} transition-colors duration-300 ${
          language === "ar" ? "rtl" : "ltr"
        }`}
      >
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
          <LanguageContext.Provider value={{ language, toggleLanguage }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <AnimatePresence mode="wait">
                  {animation && (
                    <motion.div
                      className="fixed top-0 left-0 w-full h-full bg-black dark:bg-white rounded-full"
                      initial={{ width: 0, height: 0, x: animation.x, y: animation.y, opacity: 1 }}
                      animate={{ width: "200vh", height: "200vh", x: "-50vw", y: "-50vh", opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                  </Routes>
                  <ScrollToTop />
                </motion.div>
              </Router>
            </ThemeProvider>
          </LanguageContext.Provider>
        </ThemeContext.Provider>
      </div>
    </HelmetProvider>
  );
}

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="team">
        <Team />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  );
}

export default App;