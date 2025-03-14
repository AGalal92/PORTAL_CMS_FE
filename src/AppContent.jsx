import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import "./App.css";

// Home page components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Other pages
import HomePage from "./HomePage";
import AboutPage from "./pages/about-us/AboutPage";
import ServicesPage from "./pages/services/ServicesPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ContactPage from "./pages/contact/ContactPage";
import ProjectDetails, { projectsData } from "./pages/projects/SignleProject";

import ScrollToTop from "./hooks/ScrollToTop";

function AppContent({ darkMode, animation, setAnimation, language, toggleLanguage }) {
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Use useLocation to get the current route
  
    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500); // Set loading duration to 2 seconds
      return () => clearTimeout(timer);
    }, [location.pathname]);
  
    // Define getMetaTags with if-else instead of switch
    const getMetaTags = () => {
      const currentPath = location.pathname.replace(/\/$/, ""); // Normalize by removing trailing slash
      const isArabic = language === "ar";
  
      const baseStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Legion Agency",
        url: "https://legionagency.tech",
        logo: "https://legionagency.tech/images/logoDark.png",
        description: isArabic
          ? "وكالة ليجون تقدم حلول تطوير الويب والتطبيقات المبتكرة."
          : "Legion Agency offers innovative web and app development solutions.",
      };
  
      if (currentPath.startsWith("/projects/")) {
        const projectId = currentPath.split("/")[2];
        const project = projectsData.find((p) => p.id === parseInt(projectId));
        if (project) {
          const description = project.description || (isArabic ? "مشروع من وكالة ليجون يعرض حلول تقنية مبتكرة." : "A project by Legion Agency showcasing innovative tech solutions.");
          return {
            title: `${project.name} | Legion Agency`,
            description: `${isArabic ? "استكشف" : "Explore"} ${project.name} ${isArabic ? "من وكالة ليجون -" : "by Legion Agency -"} ${description.substring(0, 150)}...`,
            keywords: `${project.name}, legion agency, ${project.technologies ? project.technologies.join(", ") : "web development, app development, tech solutions"}`,
            canonical: `https://legionagency.tech/projects/${project.id}`,
            structuredData: {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.name,
              url: `https://legionagency.tech/projects/${project.id}`,
              description: description,
              creator: baseStructuredData,
              image: project.images[0],
            },
          };
        }
        return {
          title: isArabic ? "المشروع غير موجود | وكالة ليجون" : "Project Not Found | Legion Agency",
          description: isArabic
            ? "لم يتم العثور على هذا المشروع. استكشف حلول تطوير الويب والتطبيقات الأخرى لدينا!"
            : "This project could not be found. Explore our other web and app development solutions!",
          keywords: "legion agency, web development, app development, tech solutions",
          canonical: `https://legionagency.tech${currentPath}`,
          structuredData: baseStructuredData,
        };
      } else if (currentPath === "/about-us") {
        return {
          title: isArabic ? "من نحن | وكالة ليجون" : "About Us | Legion Agency",
          description: isArabic
            ? "تعرف على وكالة ليجون، حيث تلتقي التكنولوجيا المبتكرة بالإبداع. حلول تقنية متميزة من فريقنا."
            : "Learn about Legion Agency, where innovative tech meets creativity. Tech solutions from our team.",
          keywords: "legion agency, about us, web development team, tech solutions, creative agency",
          canonical: "https://legionagency.tech/about-us",
          structuredData: {
            ...baseStructuredData,
            "@type": "AboutPage",
            description: isArabic
              ? "صفحة تعريفية عن وكالة ليجون وخدماتها التقنية المبتكرة."
              : "An about page for Legion Agency and its innovative tech services.",
          },
        };
      } else if (currentPath === "/projects") {
        return {
          title: isArabic ? "المشاريع | وكالة ليجون" : "Projects | Legion Agency",
          description: isArabic
            ? "استكشف مشاريع وكالة ليجون، حيث تلتقي التكنولوجيا المبتكرة بالإبداع في تطوير الويب والتطبيقات."
            : "Explore Legion Agency projects, where innovative tech meets creativity in web and app development.",
          keywords: "legion agency, projects, portfolio, web development, app development",
          canonical: "https://legionagency.tech/projects",
          structuredData: {
            ...baseStructuredData,
            "@type": "CollectionPage",
            description: isArabic
              ? "مجموعة من مشاريع وكالة ليجون التقنية المبتكرة."
              : "A collection of Legion Agency's innovative tech projects.",
          },
        };
      } else if (currentPath === "/services") {
        return {
          title: isArabic ? "الخدمات | وكالة ليجون" : "Services | Legion Agency",
          description: isArabic
            ? "اكتشف خدمات وكالة ليجون، حيث تلتقي التكنولوجيا المبتكرة بالإبداع في حلول الويب والتطبيقات."
            : "Discover Legion Agency services, where innovative tech meets creativity in web and app solutions.",
          keywords: "legion agency, services, tech solutions, web development, app development",
          canonical: "https://legionagency.tech/services",
          structuredData: {
            ...baseStructuredData,
            "@type": "Service",
            serviceType: isArabic ? "تطوير الويب والتطبيقات" : "Web and App Development",
            provider: baseStructuredData,
          },
        };
      } else if (currentPath === "/contact") {
        return {
          title: isArabic ? "اتصل بنا | وكالة ليجون" : "Contact Us | Legion Agency",
          description: isArabic
            ? "تواصل مع وكالة ليجون، شريكك التقني والإبداعي، لتلبية احتياجات مشروعك."
            : "Contact Legion Agency, your tech and creative partner, for your project needs.",
          keywords: "legion agency, contact, support, web development, app development",
          canonical: "https://legionagency.tech/contact",
          structuredData: {
            ...baseStructuredData,
            "@type": "ContactPage",
            description: isArabic
              ? "صفحة التواصل مع وكالة ليجون للحلول التقنية."
              : "Contact page for Legion Agency tech solutions.",
          },
        };
      } else {
        return {
          title: isArabic ? "وكالة ليجون | حلول تطوير الويب والتطبيقات" : "Legion Agency | Web & App Development Solutions",
          description: isArabic
            ? "وكالة ليجون، شريكك التقني والإبداعي، تقدم حلول تطوير الويب والتطبيقات المبتكرة."
            : "Legion Agency, your tech and creative partner, offers innovative web and app development solutions.",
          keywords: "legion agency, web development, app development, tech solutions, creative agency",
          canonical: "https://legionagency.tech/",
          structuredData: {
            ...baseStructuredData,
            "@type": "WebSite",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://legionagency.tech/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        };
      }
    };
  
    const meta = getMetaTags();
  
    return (
      <>
        <Helmet>
          <html lang={language} dir={language === "ar" ? "rtl" : "ltr"} />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content={meta.keywords} />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Legion Agency" />
          <meta name="theme-color" content={darkMode ? "#121212" : "#ffffff"} />
          <link rel="canonical" href={meta.canonical} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:url" content={meta.canonical} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://legionagency.tech/images/logoDark.png" />
          <meta property="og:locale" content={language === "ar" ? "ar_AR" : "en_US"} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content="https://legionagency.tech/images/logoDark.png" />
          <script type="application/ld+json">{JSON.stringify(meta.structuredData)}</script>
          <link rel="alternate" href="https://legionagency.tech/" hrefLang="en" />
          <link rel="alternate" href="https://legionagency.tech/" hrefLang="ar" />
        </Helmet>
  
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Loader darkMode={darkMode} />
            </motion.div>
          )}
        </AnimatePresence>
  
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
  
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
      </>
    );
  }
  
  export default AppContent;