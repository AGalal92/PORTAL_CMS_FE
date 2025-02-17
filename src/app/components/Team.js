"use client";
import { useState } from "react";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../layout"; // Import Dark Mode Context
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material"; // Social Icons
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize"; // Import the custom hook

const teamMembers = [
  { 
    name: "Abdelrahman Galal", 
    role: "Commander", 
    level: "Warrior Leader", 
    image: "/images/hero4.png", 
    hoverImage: "/images/commander4.png", 
    socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" }
  },
  { 
    name: "Ahmed Hashim", 
    role: "Scouter", 
    level: "Battle-Scouter", 
    image: "/images/hero5.png", 
    hoverImage: "/images/scouter3.png", 
    socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" }
  },
  { 
    name: "Abanob Wagih", 
    role: "Full Warrior Developer", 
    level: "Battle-Warrior", 
    image: "/images/hero6.png", 
    hoverImage: "/images/commander3.png", 
    socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" }
  },
];

export default function Team() {
  const { darkMode } = useTheme(); // Use Dark Mode Context
  const { isMobile, isTablet } = useScreenSize(); // Get screen size info

  return (
    <section
      id="team"
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
            Team
            <span className="absolute left-24 top-1/2 w-24 h-[2px] bg-yellow-500"></span>
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-extrabold text-left font-cinzel ${
              darkMode ? "text-yellow-400" : "text-gray-800"
            }`}
          >
            🏛️ MEET OUR WARRIORS 🏛️
          </h2>
        </div>

        {/* ✅ Team Member Grid */}
        <Grid container spacing={6} justifyContent="center">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              member={member}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </Grid>
      </div>
    </section>
  );
}

// ✅ Animated Spartan-Themed Team Card Component with Full Card Hover Image Swap
const TeamCard = ({ member, darkMode, isMobile, isTablet }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });
  const [hover, setHover] = useState(false); // State to track hover

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Card
          className="relative p-6 text-center rounded-lg overflow-hidden group transition-transform duration-300 hover:scale-105 border-2 border-yellow-500 shadow-lg hover:shadow-yellow-500"
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
          {/* ✅ Spartan Warrior Image with Full Card Hover Effect */}
          <Avatar
            alt={member.name}
            src={hover ? member.hoverImage : member.image}
            sx={{
              width: isMobile ? 120 : isTablet ? 160 : 200,
              height: isMobile ? 120 : isTablet ? 160 : 200,
              margin: "auto",
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />

          <CardContent className="text-left">
            {/* ✅ Name */}
            <Typography variant="h6" className="font-bold text-yellow-500 uppercase mt-3">
              {member.name}
            </Typography>

            {/* ✅ Divider */}
            <div className="w-16 h-1 my-2 bg-yellow-500 "></div>

            {/* ✅ Job Title & Level */}
            <Typography variant="body2" className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {member.role}
            </Typography>
            <Typography variant="body2" className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {member.level}
            </Typography>
          </CardContent>

          {/* ✅ Social Media Icons (Bottom Right) */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <motion.a
              href={member.socials.linkedin}
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className={`${darkMode ? "text-blue-300" : "text-blue-600"} transition-all`}
            >
              <LinkedIn fontSize="medium" />
            </motion.a>
            <motion.a
              href={member.socials.github}
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className={`${darkMode ? "text-gray-300" : "text-gray-800"} transition-all`}
            >
              <GitHub fontSize="medium" />
            </motion.a>
            <motion.a
              href={member.socials.twitter}
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className={`${darkMode ? "text-blue-400" : "text-blue-500"} transition-all`}
            >
              <Twitter fontSize="medium" />
            </motion.a>
            <motion.a
              href={member.socials.facebook}
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className={`${darkMode ? "text-blue-500" : "text-blue-700"} transition-all`}
            >
              <Facebook fontSize="medium" />
            </motion.a>
          </div>
        </Card>
      </motion.div>
    </Grid>
  );
};
