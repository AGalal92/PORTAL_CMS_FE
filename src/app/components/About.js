"use client";
import { useTheme } from "../layout";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize"; // Import the custom hook

export default function About() {
  const { darkMode } = useTheme();
  const { isMobile, isTablet } = useScreenSize(); // Get screen size info

  return (
    <section
      id="about"
      className={`py-16 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-black via-gray-900 to-black text-white"
          : "bg-gray-200 text-black"
      } bg-cover bg-center bg-fixed`}
      style={{
        backgroundImage: darkMode
          ? "url('/images/spartaTexture8.png')"
          : "url('/images/spartaTexture5.png')",
      }}
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        {/* ✅ Themed Title */}
        <div className="mb-12">
          <p className="text-xs uppercase font-light tracking-widest text-yellow-400 relative inline-block">
            About Us
            <span className="absolute left-24 top-1/2 w-24 h-[2px] bg-yellow-500"></span>
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-extrabold text-left font-cinzel ${
              darkMode ? "text-yellow-400" : "text-gray-800"
            }`}
          >
            ⚔️ WHO WE ARE ⚔️
          </h2>
        </div>

        {/* ✅ Alternating Spartan-Themed Text & Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Side: Text First, Image Second */}
          <AnimatedText
            darkMode={darkMode}
            title="We Are Legion"
            text={[
              "Legion is a software house forged in the spirit of ancient warriors, specializing in cutting-edge software solutions.",
              "With expertise in modern web technologies, we empower businesses with battle-hardened digital transformation strategies.",
            ]}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <AnimatedImage
            src="/images/codeSparta3.png"
            alt="About Legion"
            isMobile={isMobile}
            isTablet={isTablet}
          />

          {/* Right Side: Image First, Text Second */}
          <AnimatedImage
            src="/images/codeSparta2.png"
            alt="Spartan Coders at Work"
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <AnimatedText
            darkMode={darkMode}
            title="Our Mission"
            text={[
              "Like the warriors of Sparta, we stand for strength, strategy, and precision in digital innovation.",
              "By integrating battle-tested technology, we build high-performance, scalable applications that withstand the test of time.",
            ]}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      </div>
    </section>
  );
}

// ✅ Text Animation on Scroll
const AnimatedText = ({ darkMode, title, text, isMobile, isTablet }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  return (
    <motion.div
      ref={ref}
      className="space-y-6 border-l-4 border-yellow-500 pl-5"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl font-bold text-yellow-400 uppercase">{title}</h3>
      {text.map((paragraph, index) => (
        <p
          key={index}
          className={`text-lg leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {paragraph}
        </p>
      ))}
    </motion.div>
  );
};

// ✅ Image Animation on Scroll
const AnimatedImage = ({ src, alt, isMobile, isTablet }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.8 }}
      className="relative group"
    >
      <Image
        src={src}
        alt={alt}
        width={isMobile ? 320 : isTablet ? 400 : 500}
        height={isMobile ? 220 : isTablet ? 250 : 350}
        className="rounded-lg border-4 border-yellow-500 shadow-lg group-hover:scale-105 transition-transform duration-300"
        priority
      />
      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity duration-300"></div>
    </motion.div>
  );
};
