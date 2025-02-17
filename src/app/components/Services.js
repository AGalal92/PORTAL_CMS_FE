"use client";
import { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { 
  Business, 
  School, 
  SportsSoccer, 
  BarChart, 
  Settings, 
  AccountBox 
} from "@mui/icons-material";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "../layout"; // Import Dark Mode Context
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize"; // Import the custom hook

const services = [
  { 
    title: "ERP Solutions", 
    desc: "Comprehensive ERP systems to streamline business operations and improve efficiency.", 
    icon: <Business fontSize="large" className="text-yellow-500" /> 
  },
  { 
    title: "Education Platform", 
    desc: "Innovative e-learning solutions tailored for schools, universities, and training centers.", 
    icon: <School fontSize="large" className="text-yellow-500" /> 
  },
  { 
    title: "Sports Platform", 
    desc: "Customized platforms for sports management, event organization, and athlete tracking.", 
    icon: <SportsSoccer fontSize="large" className="text-yellow-500" /> 
  },
  { 
    title: "Data Analysis", 
    desc: "Advanced data analytics and visualization solutions to drive business insights.", 
    icon: <BarChart fontSize="large" className="text-yellow-500" /> 
  },
  { 
    title: "DevOps Services", 
    desc: "CI/CD pipelines, cloud infrastructure, and automation for seamless software deployment.", 
    icon: <Settings fontSize="large" className="text-yellow-500" /> 
  },
  { 
    title: "Company/Personal Portfolios", 
    desc: "Custom-designed portfolio websites to showcase brands, businesses, and personal projects.", 
    icon: <AccountBox fontSize="large" className="text-yellow-500" /> 
  },
];

export default function Services() {
  const { darkMode } = useTheme();
  const { isMobile, isTablet } = useScreenSize(); // Get screen size info

  return (
    <section
      id="services"
      className="py-16 transition-all duration-500"
      style={{
        backgroundImage: darkMode
          ? "url('/images/spartaTexture8.png')"
          : "url('/images/spartaTexture5.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        {/* ✅ Spartan-Themed Title */}
        <div className="mb-12">
          <p className="text-xs uppercase font-light tracking-widest text-yellow-500 relative inline-block">
            Services
            <span className="absolute left-24 top-1/2 w-24 h-[2px] bg-yellow-500"></span>
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-extrabold text-left font-cinzel ${
              darkMode ? "text-yellow-400" : "text-gray-800"
            }`}
          >
            🏛️ CHECK OUR SERVICES 🏛️
          </h2>
        </div>

        {/* ✅ Spartan-Styled Service Cards */}
        <Grid container spacing={6} justifyContent="center">
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

// ✅ Animated Spartan-Themed Service Card Component
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
          className="relative p-6 text-center rounded-lg overflow-hidden group transition-transform duration-300 hover:scale-105"
          sx={{
            background: darkMode
              ? "rgba(30, 30, 30, 0.9)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(15px)",
            border: "2px solid rgba(255, 204, 0, 0.5)",
            transition: "all 0.3s ease-in-out",
            boxShadow: darkMode
              ? "0 4px 15px rgba(255, 204, 0, 0.2)"
              : "0 4px 15px rgba(255, 153, 0, 0.2)",
          }}
        >
          <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          <CardContent>
            <Typography variant="h6" className="font-bold text-yellow-500 uppercase">
              {service.title}
            </Typography>
            <Typography
              variant="body2"
              className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {service.desc}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};
