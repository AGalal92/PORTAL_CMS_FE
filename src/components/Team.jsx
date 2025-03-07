import React from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

// Translation object
const translations = {
  en: {
    team: "Team",
    checkOurTeam: "CHECK OUR TEAM",
    teamMembers: [
      {
        name: "Abdelrhman Galal",
        role: "Tech Leader",
        level: "System Designer",
        image: "/images/abdelrhmanGalal.jpg",
        socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" },
      },
      {
        name: "Ahmed Hashim",
        role: "Business Manager",
        level: "Project Management",
        image: "/images/ahmedHashim.jpg",
        socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" },
      },
      {
        name: "Ahmed Adel",
        role: "Lead Developer",
        level: "Application Developer",
        image: "/images/ahmedAdel.jpg",
        socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" },
      },
      {
        name: "Abanob Wagih",
        role: "Senior Developer",
        level: "Full Stack Developer",
        image: "/images/abanobWagih.png",
        socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" },
      },
    ],
  },
  ar: {
    team: "الفريق",
    checkOurTeam: "تحقق من فريقنا",
    teamMembers: [
      {
        name: "عبد الرحمن جلال",
        role: "قائد تقني",
        level: "مصمم أنظمة",
        image: "/images/abdelrhmanGalal.jpg",
        socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" },
      },
      {
        name: "أحمد هاشم",
        role: "مدير أعمال",
        level: "إدارة المشاريع",
        image: "/images/ahmedHashim.jpg",
        socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" },
      },
      {
        name: "أحمد عادل",
        role: "مطور رئيسي",
        level: "مطور تطبيقات",
        image: "/images/ahmedAdel.jpg",
        socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" },
      },
      {
        name: "أبانوب وجيه",
        role: "مطور أول",
        level: "مطور شامل",
        image: "/images/abanobWagih.png",
        socials: { linkedin: "#", github: "#", twitter: "#", facebook: "#" },
      },
    ],
  },
};

function Team() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];

  return (
    <section
      id="team"
      className={`py-10 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            {t.team}
            <span
              className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                language === "ar" ? "right-20" : "left-20"
              }`}
            ></span>
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === "ar" ? "text-right" : "text-left"
            } font-raleway ${darkMode ? "text-white" : "text-black"}`}
          >
            {t.checkOurTeam}
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {t.teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              member={member}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const TeamCard = ({ member, darkMode, isMobile, isTablet, language }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.3,
  });

  const width = isMobile ? 250 : isTablet ? 300 : 350;
  const height = isMobile ? 200 : isTablet ? 250 : 300;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-[20px] shadow-lg overflow-hidden group flex flex-col"
    >
      {/* Team Member Image */}
      <img
        src={member.image}
        alt={member.name}
        width={width}
        height={height}
        className="rounded-t-[20px] object-cover w-full transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Content */}
      {isMobile ? (
        // Mobile: Static content below image
        <div
          className={`p-4 flex flex-col items-center ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          } rounded-b-[20px]`}
        >
          <h3 className="text-sm font-semibold font-raleway mb-1">{member.name}</h3>
          <p className="text-xs">{member.role}</p>
          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {member.level}
          </p>
          <div
            className={`flex gap-3 mt-3 ${
              language === "ar" ? "justify-start" : "justify-end"
            }`}
          >
            <motion.a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className="text-blue-300 transition-all"
            >
              <LinkedIn fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 transition-all"
            >
              <GitHub fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className="text-blue-400 transition-all"
            >
              <Twitter fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className="text-blue-500 transition-all"
            >
              <Facebook fontSize="small" />
            </motion.a>
          </div>
        </div>
      ) : (
        // Desktop/Tablet: Hover overlay
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="text-center">
            <h3 className="text-white text-sm sm:text-lg md:text-xl font-semibold font-raleway mb-1">
              {member.name}
            </h3>
            <p className="text-white text-xs sm:text-sm md:text-base">{member.role}</p>
            <p className="text-gray-300 text-xs sm:text-sm">{member.level}</p>
          </div>
          <div
            className={`flex gap-3 mt-3 ${
              language === "ar" ? "justify-start" : "justify-end"
            }`}
          >
            <motion.a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-blue-300 transition-all"
            >
              <LinkedIn fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 transition-all"
            >
              <GitHub fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-blue-400 transition-all"
            >
              <Twitter fontSize="small" />
            </motion.a>
            <motion.a
              href={member.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-blue-500 transition-all"
            >
              <Facebook fontSize="small" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Team;