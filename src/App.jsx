import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import './App.css';

// Import all your components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetails from './pages/SignleProject';

// Theme Context
const ThemeContext = createContext();
export function useTheme() {
  return useContext(ThemeContext);
}

// Language Context
const LanguageContext = createContext();
export function useLanguage() {
  return useContext(LanguageContext);
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [animation, setAnimation] = useState(null);
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to 'en'
    return localStorage.getItem('language') || 'en';
  });

  // Define MUI theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#0D47A1' },
      background: { default: darkMode ? '#121212' : '#ffffff' },
    },
  });

  // Toggle dark mode with animation
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

  // Toggle language and store in localStorage
  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>Legion Agency</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Legion provides software solutions and services" />
      </Helmet>

      <div className={`${darkMode ? 'dark bg-black text-white' : 'bg-white text-black'} transition-colors duration-300 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
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
                      animate={{ width: '200vh', height: '200vh', x: '-50vw', y: '-50vh', opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
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
                    <Route
                      path="/"
                      element={
                        <>
                          <Hero />
                          <About />
                          <Services />
                          <Projects />
                          <Team />
                          <Contact />
                          <Footer />
                        </>
                      }
                    />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                  </Routes>
                </motion.div>
              </Router>
            </ThemeProvider>
          </LanguageContext.Provider>
        </ThemeContext.Provider>
      </div>
    </>
  );
}

export default App;