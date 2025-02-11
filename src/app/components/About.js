"use client";
import { useTheme } from "../layout";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { darkMode } = useTheme();

  return (
    <section
      id="about"
      className={`py-10 transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`}
    >
      <div className="container mx-auto px-6">
        {/* ✅ Left-aligned Title with Underline */}
        <div className="mb-1">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            About Us
            <span className="absolute left-24 top-1/2 w-24 h-[2px] bg-yellow-500"></span>
          </p>
          <h2 className={`text-5xl font-extrabold text-left font-raleway ${darkMode ? "text-white" : "text-black"}`}>
            WHO WE ARE
          </h2>
        </div>

        {/* ✅ Alternating Text & Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left Side: Text First, Image Second */}
          <AnimatedText
          darkMode={darkMode}
            title="We Are Legion"
            className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            text={[
              "Legion is a software house specializing in cutting-edge software solutions. Our team of experts delivers innovative applications tailored to your business needs.",
              "With expertise in modern web technologies, we help businesses achieve their digital transformation goals.",
            ]}
          />
          <AnimatedImage src="/images/hero1.jpg" alt="About Legion" />

          {/* Right Side: Image First, Text Second */}
          <AnimatedImage src="/images/hero2.jpg" alt="Our Team at Work" />
          <AnimatedText
          darkMode={darkMode}
            title="Our Mission"
            text={[
              "We strive to create seamless and user-friendly digital experiences that empower businesses and users alike.",
              "By integrating innovation and technology, we build scalable, high-performance applications tailored to industry needs.",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ✅ Text Animation on Scroll
const AnimatedText = ({darkMode, title, text }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={` space-y-6`}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl font-semibold">{title}</h3>
      {text.map((paragraph, index) => (
        <p key={index} className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{paragraph}</p>
      ))}
    </motion.div>
  );
};

// ✅ Image Animation on Scroll
const AnimatedImage = ({ src, alt }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.8 }}
    >
      <Image src={src} alt={alt} width={500} height={300} className="rounded-lg shadow-lg" />
    </motion.div>
  );
};
