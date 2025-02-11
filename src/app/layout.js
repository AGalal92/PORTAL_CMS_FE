"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./globals.css";

const ThemeContext = createContext();
export function useTheme() {
  return useContext(ThemeContext);
}

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [animation, setAnimation] = useState(null);

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

  return (
    <html lang="en">
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body className={darkMode ? "dark bg-black text-white" : "bg-white text-black"}>
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
              {children}
            </motion.div>
          </body>
        </ThemeProvider>
      </ThemeContext.Provider>
    </html>
  );
}
