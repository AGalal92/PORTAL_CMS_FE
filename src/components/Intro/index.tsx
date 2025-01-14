"use client";

import { useEffect, useState } from "react";

// Import the images from your local folder
import image1 from "./1.jpg";
import image2 from "./2.jpg";
import image3 from "./3.jpg";

const AboutPage = () => {
  // Array of imported images
  const images = [image1, image2, image3];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState(""); // For typing effect
  const fullText =
    "Welcome to Legion Portfolio.";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => fullText.slice(0, index + 1)); // Slice ensures no duplication
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust typing speed here (in ms)

    return () => clearInterval(typingInterval); // Cleanup on component unmount
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "99vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
        color: "white",
      }}
    >
      {/* Image Slider */}
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${image.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        ></div>
      ))}

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
          pointerEvents: "none",
        }}
      ></div>

      {/* Text Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            marginBottom: "1.5rem",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          {typedText || " "} {/* Ensure no undefined is rendered */}
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            maxWidth: "700px",
            margin: "0 auto 2rem auto",
            lineHeight: "1.6",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
          }}
        >
          Empowering your vision with cutting-edge software solutions. Lets
          take your business to the next level.
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
