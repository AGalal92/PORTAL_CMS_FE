"use client";
import { Card, CardContent, Typography, Grid, Avatar, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../layout"; // Import Dark Mode Context
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material"; // Social Icons
import { useInView } from "react-intersection-observer";

const teamMembers = [
  { name: "John Doe", role: "CEO", level: "Senior Executive", image: "/images/hero1.jpg", socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" } },
  { name: "Jane Smith", role: "CTO", level: "Technology Leader", image: "/images/hero2.jpg", socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" } },
  { name: "Mike Johnson", role: "Lead Developer", level: "Senior Engineer", image: "/images/hero3.jpg", socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" } },
];

export default function Team() {
  const { darkMode } = useTheme(); // Use Dark Mode Context

  return (
    <section
      id="team"
      className={`py-16 transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`}
    >
      <div className="container mx-auto px-6">
        {/* ✅ Left-Aligned "Check Our Team" Title with Underline */}
        <div className="mb-10">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            Team
            <span className="absolute left-24 top-1/2 w-24 h-[2px] bg-yellow-500"></span>
          </p>
          <h2 className={`text-5xl font-extrabold text-left font-raleway ${darkMode ? "text-white" : "text-black"}`}>
            CHECK OUR TEAM
          </h2>
        </div>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} darkMode={darkMode} />
          ))}
        </Grid>
      </div>
    </section>
  );
}

// ✅ Animated Team Card Component
const TeamCard = ({ member, darkMode }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
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
          {/* ✅ Team Member Image */}
          <Avatar
            alt={member.name}
            src={member.image}
            sx={{
              width: 200,
              height: 200,
              margin: "auto",
            }}
          />

          <CardContent className="text-left">
            {/* ✅ Name */}
            <Typography variant="h6" className="font-semibold mt-2">
              {member.name}
            </Typography>

            {/* ✅ Divider */}
            <div className={`w-12 h-1 my-2 ${darkMode ? "bg-yellow-500" : "bg-yellow-500"}`}></div>

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
              <LinkedIn fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.github}
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className={`${darkMode ? "text-gray-300" : "text-gray-800"} transition-all`}
            >
              <GitHub fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.twitter}
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className={`${darkMode ? "text-blue-400" : "text-blue-500"} transition-all`}
            >
              <Twitter fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.facebook}
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className={`${darkMode ? "text-blue-500" : "text-blue-700"} transition-all`}
            >
              <Facebook fontSize="small" />
            </motion.a>
          </div>
        </Card>
      </motion.div>
    </Grid>
  );
};
