"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link as ScrollLink } from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

const images = ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpg"];
const welcomeText = "Welcome to Legion Agency".split(" "); // ✅ Split by words
const subText = "Your choice, our trust"; // Motivational phrase

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      backgroundPositionY: "50%",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center"
    >
      {/* Background Image Transition */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: current === index ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image
              src={img}
              alt={`Hero Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-1000"
              srcSet={`${img}-480.jpg 480w, ${img}-800.jpg 800w, ${img}-1200.jpg 1200w`}
              sizes="(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 container mx-auto flex flex-col md:flex-row items-start justify-between px-6 md:px-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left: Hero Text */}
        <div className="text-left max-w-lg">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
            {welcomeText.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Motivational Phrase + Get Started Button */}
          <motion.div
            className="flex items-center gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-sm sm:text-lg md:text-xl text-gray-300">{subText}</p>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-2 py-1 sm:px-3 sm:py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-lg cursor-pointer transition-all transform hover:scale-103 text-sm sm:text-base"
            >
              Get Started
            </a>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}