"use client";
import { useState, useEffect } from "react";

export function useScreenSize() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile: <= 768px
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024); // Tablet: 769px - 1024px
    };

    checkScreenSize(); // Check on initial render
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isMobile, isTablet };
}