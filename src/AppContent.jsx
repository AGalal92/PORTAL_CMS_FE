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
import TermsCondition from "./pages/terms-condition/TermsCondition";
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
      const currentPath = location.pathname.replace(/\/$/, "");
      const isArabic = language === "ar";
  
      const baseStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Legion Agency",
        "alternateName": ["Legion Tech", "LegionAgency"],
        "url": "https://legionagency.tech",
        "logo": "https://legionagency.tech/images/logoLight.png",
        "description": isArabic
          ? "وكالة ليجون تقدم حلول تطوير الويب والتطبيقات المبتكرة."
          : "Legion Agency provides innovative web and app development solutions.",
      };
  
      if (currentPath.startsWith("/projects/")) {
        const projectId = currentPath.split("/")[2];
        const project = projectsData.find((p) => p.id === parseInt(projectId));
        if (project) {
          const description = project.description || (isArabic ? "مشروع تطوير برمجيات احترافي من وكالة ليجون يعرض حلول تقنية مبتكرة ومتقدمة." : "Professional software development project by Legion Agency showcasing innovative technology solutions and modern development practices.");
          const techKeywords = project.technologies ? project.technologies.join(", ") : "React, Node.js, MongoDB, AWS, TypeScript, REST API";
          return {
            title: isArabic ? `${project.name} | مشروع تطوير برمجيات | وكالة ليجون` : `${project.name} | Software Development Project | Legion Agency`,
            description: isArabic 
              ? `استعرض ${project.name} - مشروع تطوير برمجيات احترافي من وكالة ليجون. ${description.substring(0, 120)}. التقنيات المستخدمة: ${techKeywords.substring(0, 50)}.`
              : `Explore ${project.name} - Professional software development project by Legion Agency. ${description.substring(0, 120)}. Technologies: ${techKeywords.substring(0, 50)}. Custom development solution.`,
            keywords: `${project.name}, software development project, ${techKeywords}, custom software development, web application development, mobile app development, software engineering, technology solutions, development case study, software project portfolio, legion agency, legion tech, innovative tech solutions, ${isArabic ? 'مشروع تطوير برمجيات' : 'software development'}, ${isArabic ? 'تطوير تطبيقات' : 'application development'}, professional development, enterprise solutions, tech innovation, modern development, scalable solutions, software architecture`,
            canonical: `https://legionagency.tech/projects/${project.id}`,
            structuredData: {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": project.name,
              "url": `https://legionagency.tech/projects/${project.id}`,
              "description": description,
              "creator": baseStructuredData,
              "image": project.images && project.images[0] ? project.images[0] : "https://legionagency.tech/images/logoLight.png",
              "keywords": techKeywords,
              "about": isArabic ? "مشروع تطوير برمجيات" : "Software Development Project",
              "inLanguage": language === "ar" ? "ar" : "en",
              "datePublished": project.date || "2024-01-01",
              "author": {
                "@type": "Organization",
                "name": "Legion Agency"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Legion Agency",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://legionagency.tech/images/logoLight.png"
                }
              }
            },
          };
        }
        return {
          title: isArabic ? "المشروع غير موجود | وكالة ليجون" : "Project Not Found | Legion Agency",
          description: isArabic
            ? "لم يتم العثور على هذا المشروع. استكشف حلول تطوير الويب والتطبيقات الأخرى لدينا!"
            : "This project could not be found. Explore our other web and app development solutions!",
          keywords: "legion agency, legion tech, web development, app development, tech solutions",
          canonical: `https://legionagency.tech${currentPath}`,
          structuredData: baseStructuredData,
        };
      } else if (currentPath === "/about-us") {
        return {
          title: isArabic ? "من نحن - شركة تطوير البرمجيات | وكالة ليجون" : "About Us - Software Development Company | Legion Agency",
          description: isArabic
            ? "وكالة ليجون - شركة رائدة في تطوير البرمجيات وحلول التكنولوجيا. متخصصون في تطوير تطبيقات الويب والموبايل، تصميم UI/UX، والحلول التقنية المتقدمة للشركات والمشاريع الناشئة."
            : "Legion Agency is a leading software development company specializing in custom web applications, mobile app development, UI/UX design, and enterprise tech solutions. Expert software engineers delivering digital transformation services worldwide.",
          keywords: "legion agency, software development company, tech solutions, web development agency, mobile app development, software engineering, UI/UX design agency, enterprise software solutions, custom software development, digital transformation, technology consulting, software house, IT solutions company, agile development, full-stack development, legion tech, innovative tech solutions, software development services, app development company, technology agency, software consulting, startup tech solutions",
          canonical: "https://legionagency.tech/about-us",
          structuredData: {
            ...baseStructuredData,
            "@type": "AboutPage",
            "description": isArabic
              ? "وكالة ليجون - شركة تطوير برمجيات متخصصة في تطوير تطبيقات الويب والموبايل والحلول التقنية المبتكرة."
              : "Legion Agency - Professional software development company specializing in web applications, mobile development, and innovative technology solutions.",
            "mainEntity": {
              "@type": "Organization",
              "name": "Legion Agency",
              "description": isArabic
                ? "شركة رائدة في تطوير البرمجيات وحلول التكنولوجيا المخصصة"
                : "Leading software development company providing custom technology solutions",
              "numberOfEmployees": "10-50",
              "foundingDate": "2023",
              "slogan": isArabic ? "حلول برمجيات مبتكرة للتميز الرقمي" : "Innovative Software Solutions for Digital Excellence"
            }
          },
        };
      } else if (currentPath === "/projects") {
        return {
          title: isArabic ? "مشاريع تطوير البرمجيات | محفظة أعمال وكالة ليجون" : "Software Development Projects Portfolio | Legion Agency",
          description: isArabic
            ? "استعرض محفظة مشاريع وكالة ليجون في تطوير البرمجيات: تطبيقات ويب مخصصة، تطبيقات موبايل، منصات تجارة إلكترونية، وحلول برمجية للشركات. أمثلة واقعية لمشاريع تطوير ناجحة."
            : "Explore Legion Agency's software development portfolio: custom web applications, mobile apps, e-commerce platforms, and enterprise solutions. Real-world examples of successful development projects showcasing our expertise in modern technologies.",
          keywords: "software development portfolio, web application projects, mobile app portfolio, software development examples, custom software projects, enterprise solutions portfolio, e-commerce development, web development projects, app development portfolio, software engineering projects, technology solutions showcase, development case studies, legion agency projects, successful software projects, innovative tech solutions, digital transformation projects, startup tech projects, software development company portfolio, legion tech projects",
          canonical: "https://legionagency.tech/projects",
          structuredData: {
            ...baseStructuredData,
            "@type": "CollectionPage",
            "name": isArabic ? "مشاريع تطوير البرمجيات" : "Software Development Projects",
            "description": isArabic
              ? "مجموعة شاملة من مشاريع تطوير البرمجيات والتطبيقات المبتكرة من وكالة ليجون."
              : "Comprehensive collection of innovative software and application development projects by Legion Agency.",
            "numberOfItems": "50+",
            "about": isArabic
              ? "محفظة مشاريع تطوير البرمجيات والتطبيقات"
              : "Software and application development project portfolio"
          },
        };
      } else if (currentPath === "/services") {
        return {
          title: isArabic ? "خدمات تطوير البرمجيات والتطبيقات | وكالة ليجون" : "Software Development Services | Web & Mobile Apps | Legion Agency",
          description: isArabic
            ? "خدمات تطوير برمجيات شاملة: تطوير تطبيقات ويب مخصصة، تطوير تطبيقات iOS و Android، تصميم UI/UX، حلول التجارة الإلكترونية، تطوير MVP، الحلول السحابية، DevOps، تحديث البرمجيات القديمة وخدمات استشارات تقنية."
            : "Comprehensive software development services: custom web applications, iOS & Android mobile apps, UI/UX design, e-commerce development, MVP development, progressive web apps, cloud solutions, DevOps, software modernization, API development, and technology consulting services.",
          keywords: "software development services, web application development, mobile app development, custom software development, iOS app development, Android app development, UI/UX design services, e-commerce development, progressive web apps, MVP development, enterprise software solutions, cloud solutions, DevOps services, software modernization, API development, front-end development, back-end development, full-stack development, software engineering services, software consulting, technology consulting, digital transformation services, agile development, software maintenance, QA testing services, database development, software integration, legion agency services, software development company services, tech solutions provider",
          canonical: "https://legionagency.tech/services",
          structuredData: {
            ...baseStructuredData,
            "@type": "Service",
            "serviceType": isArabic ? "خدمات تطوير البرمجيات الشاملة" : "Comprehensive Software Development Services",
            "provider": baseStructuredData,
            "areaServed": ["EG", "SA", "AE", "US", "GB", "Worldwide"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": isArabic ? "خدمات تطوير البرمجيات" : "Software Development Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": isArabic ? "تطوير تطبيقات الويب المخصصة" : "Custom Web Application Development",
                    "description": isArabic ? "تطوير تطبيقات ويب متقدمة باستخدام أحدث التقنيات" : "Advanced web application development using modern technologies"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": isArabic ? "تطوير تطبيقات الموبايل" : "Mobile App Development",
                    "description": isArabic ? "تطوير تطبيقات iOS و Android احترافية" : "Professional iOS and Android app development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": isArabic ? "تصميم UI/UX" : "UI/UX Design",
                    "description": isArabic ? "تصميم واجهات مستخدم وتجربة استخدام متميزة" : "Outstanding user interface and user experience design"
                  }
                }
              ]
            }
          },
        };
      } else if (currentPath === "/contact") {
        return {
          title: isArabic ? "اتصل بنا - احصل على استشارة مجانية | وكالة ليجون" : "Contact Us - Get Free Consultation | Software Development | Legion Agency",
          description: isArabic
            ? "تواصل مع وكالة ليجون لتطوير البرمجيات. احصل على استشارة مجانية لمشروعك في تطوير تطبيقات الويب والموبايل، تصميم UI/UX، والحلول التقنية المخصصة. فريق خبراء جاهز لمساعدتك. اتصل الآن: +201115067610"
            : "Contact Legion Agency for software development services. Get free consultation for your web application, mobile app, UI/UX design, or custom software project. Expert software engineers ready to help. Available 24/7. Call now: +201115067610 or email: info@legionagency.tech",
          keywords: "contact software development company, software development consultation, hire software developers, software development quote, web development contact, mobile app development inquiry, software project consultation, get software quote, software development company contact, technology consulting contact, software engineering services contact, custom software development inquiry, app development consultation, web development services contact, software development Egypt, legion agency contact, hire development team, software outsourcing contact, tech solutions inquiry, development company contact",
          canonical: "https://legionagency.tech/contact",
          structuredData: {
            ...baseStructuredData,
            "@type": "ContactPage",
            "description": isArabic
              ? "تواصل مع وكالة ليجون للحصول على خدمات تطوير البرمجيات والاستشارات التقنية."
              : "Contact Legion Agency for software development services and technology consulting.",
            "mainEntity": {
              "@type": "Organization",
              "name": "Legion Agency",
              "telephone": "+201115067610",
              "email": "info@legionagency.tech",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+201115067610",
                "contactType": "Sales & Customer Service",
                "availableLanguage": ["English", "Arabic"],
                "areaServed": ["EG", "SA", "AE", "US", "GB", "Worldwide"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              }
            }
          },
        };
      } else {
        return {
          title: isArabic ? "وكالة ليجون | شركة تطوير البرمجيات والحلول التقنية | تطوير تطبيقات ويب وموبايل" : "Legion Agency | Software Development & Tech Solutions Company | Custom Web & Mobile Apps",
          description: isArabic
            ? "وكالة ليجون - شركة رائدة في تطوير البرمجيات متخصصة في تطوير تطبيقات الويب المخصصة، تطوير تطبيقات الموبايل (iOS و Android)، تصميم UI/UX، والحلول التقنية للشركات. مهندسو برمجيات خبراء يقدمون خدمات التحول الرقمي المبتكرة."
            : "Legion Agency - Leading software development company specializing in custom web applications, mobile app development (iOS & Android), UI/UX design, and enterprise tech solutions. Expert software engineers delivering innovative digital transformation services worldwide.",
          keywords: "software agency, software development company, tech solutions, software development services, custom software development, web application development, mobile app development, software engineering, technology consulting, digital transformation, enterprise software solutions, software house, IT solutions company, application development services, software development firm, technology agency, software consulting services, web development agency, app development company, custom web development, bespoke software development, software product development, agile software development, full-stack development, front-end development, back-end development, cloud solutions, DevOps services, software maintenance, QA testing services, UI UX design services, progressive web apps, e-commerce development, MVP development, software modernization, API development, database development, software integration services, IT consulting, technology partners, digital solutions, innovation agency, startup tech solutions, enterprise technology, software architects, code development, programming services, legion agency, legionagency, legion tech, software solutions provider, tech development company, application modernization, Egypt software company, Middle East tech solutions",
          canonical: "https://legionagency.tech/",
          structuredData: {
            ...baseStructuredData,
            "@type": "WebSite",
            "name": "Legion Agency - Software Development Company",
            "alternateName": ["Legion Tech Solutions", "Legion Software Development", "LegionAgency"],
            "description": isArabic
              ? "شركة تطوير برمجيات احترافية توفر تطبيقات ويب وموبايل مخصصة، وحلول المؤسسات، وخدمات التحول الرقمي."
              : "Professional software development company providing custom web and mobile applications, enterprise solutions, and digital transformation services.",
            "inLanguage": ["en", "ar"],
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://legionagency.tech/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string",
            },
            "offers": {
              "@type": "AggregateOffer",
              "offerCount": "15+",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
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
          <meta property="og:image" content="https://legionagency.tech/images/logoLight.png" />
          <meta property="og:locale" content={language === "ar" ? "ar_AR" : "en_US"} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content="https://legionagency.tech/images/logoLight.png" />
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
              <Route path="/terms-condition" element={<TermsCondition />} />
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