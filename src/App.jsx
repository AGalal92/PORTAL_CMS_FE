import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import AppContent from "./AppContent";
import { applyTheme } from './theme/theme'; // Import the applyTheme function

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

  // Sync dark mode and language with localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    applyTheme(); // Apply theme whenever darkMode changes
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // MUI theme configuration
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#eab308" }, // Match your theme.js primary color
      background: { default: darkMode ? "#111827" : "#d1d5db" }, // Match theme.js background colors
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

  return (
    <HelmetProvider>
      <div
        className={`${language === "ar" ? "rtl" : "ltr"}`}
        style={{
          backgroundColor: 'var(--bg-color)', // Use theme variable
          color: 'var(--text-color)', // Use theme variable
          transition: 'var(--transition-default)', // Use theme transition
        }}
      >
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
          <LanguageContext.Provider value={{ language, toggleLanguage }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <AppContent
                  darkMode={darkMode}
                  animation={animation}
                  setAnimation={setAnimation}
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              </Router>
            </ThemeProvider>
          </LanguageContext.Provider>
        </ThemeContext.Provider>
      </div>
    </HelmetProvider>
  );
}

export default App;