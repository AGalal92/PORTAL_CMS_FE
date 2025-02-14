"use client";
import { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Code, PhoneAndroid, DesignServices } from "@mui/icons-material";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "../layout"; // Import Dark Mode Context
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize"; // Import the custom hook

const services = [
  { title: "Web Development", desc: "High-quality web applications.", icon: <Code fontSize="large" /> },
  { title: "Mobile Apps", desc: "Cross-platform mobile applications.", icon: <PhoneAndroid fontSize="large" /> },
  { title: "UI/UX Design", desc: "Modern and user-friendly designs.", icon: <DesignServices fontSize="large" /> },
];

export default function Services() {
  const { darkMode } = useTheme();
  const { isMobile, isTablet } = useScreenSize(); // Get screen size info

  return (
    <section
      id="services"
      className={`py-16 transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Left-aligned Title with Underline */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            Services
            <span className="absolute left-24 top-1/2 w-24 h-[2px] bg-yellow-500"></span>
          </p>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-left font-raleway ${darkMode ? "text-white" : "text-black"}`}>
            CHECK OUR SERVICES
          </h2>
        </div>

        {/* ✅ Service Cards with Responsive Layout */}
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              darkMode={darkMode}
              index={index}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </Grid>
      </div>
    </section>
  );
}

// ✅ Animated Service Card Component
const ServiceCard = ({ service, darkMode, index, isMobile, isTablet }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: isMobile ? 0.1 : 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: index % 2 === 0 ? 50 : -50 }); // Moves up/down alternately
    }
  }, [inView, controls, index]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: index % 2 === 0 ? 50 : -50 }}
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card
          className="relative p-6 text-center border border-white/20 bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
          sx={{
            background: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease-in-out",
            boxShadow: darkMode
              ? "0 4px 15px rgba(0, 255, 255, 0.1)"
              : "0 4px 15px rgba(0, 119, 255, 0.1)",
          }}
        >
          <div className="flex justify-center mb-4">{service.icon}</div>
          <CardContent>
            <Typography variant="h6" className="font-semibold">
              {service.title}
            </Typography>
            <Typography variant="body2" className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {service.desc}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};