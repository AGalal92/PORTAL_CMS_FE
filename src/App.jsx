import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import AppContent from "./AppContent";

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

  return (
    <HelmetProvider>
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