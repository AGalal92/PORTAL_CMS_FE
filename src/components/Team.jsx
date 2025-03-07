import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme, useLanguage } from '../App'; // Import useLanguage
import { Facebook, Twitter, LinkedIn, GitHub } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { useScreenSize } from '../hooks/useScreenSize';

// Translation object
const translations = {
  en: {
    team: 'Team',
    checkOurTeam: 'CHECK OUR TEAM',
    teamMembers: [
      { name: 'Abdelrhman Galal', role: 'Tech Leader', level: 'System Designer', image: '/images/abdelrhmanGalal.jpg', socials: { linkedin: '#', github: '#', twitter: '#', facebook: '#' } },
      { name: 'Ahmed Hashim', role: 'Business Manager', level: 'Project Management', image: '/images/ahmedHashim.jpg', socials: { linkedin: '#', github: '#', twitter: '#', facebook: '#' } },
      { name: 'Ahmed Adel', role: 'Lead Developer', level: 'Application Developer', image: '/images/ahmedAdel.jpg', socials: { linkedin: '#', github: '#', twitter: '#', facebook: '#' } },
      { name: 'Abanob Wagih', role: 'Senior Developer', level: 'Full Stack Developer', image: '/images/abanobWagih.png', socials: { linkedin: '#', github: '#', twitter: '#', facebook: '#' } },
    ],
  },
  ar: {
    team: 'الفريق',
    checkOurTeam: 'تحقق من فريقنا',
    teamMembers: [
      { name: 'عبد الرحمن جلال', role: 'قائد تقني', level: 'مصمم أنظمة', image: '/images/abdelrhmanGalal.jpg', socials: { linkedin: '#', github: '#', twitter: '#', facebook: '#' } },
      { name: 'أحمد هاشم', role: 'مدير أعمال', level: 'إدارة المشاريع', image: '/images/ahmedHashim.jpg', socials: { linkedin: '#', github: '#', twitter: '#', facebook: '#' } },
      { name: 'أحمد عادل', role: 'مطور رئيسي', level: 'مطور تطبيقات', image: '/images/ahmedAdel.jpg', socials: { linkedin: '#', github: '#', twitter: '#', facebook: '#' } },
      { name: 'أبانوب وجيه', role: 'مطور أول', level: 'مطور شامل', image: '/images/abanobWagih.png', socials: { linkedin: '#', github: '#', twitter: '#', facebook: '#' } },
    ],
  },
};

function Team() {
  const { darkMode } = useTheme();
  const { language } = useLanguage(); // Access language from context
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language]; // Select translations based on language

  return (
    <section
      id="team"
      className={`py-16 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'} // Set direction based on language
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned "Check Our Team" Title with Underline */}
        <div className="mb-10">
        <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            {t.team}
            <span
              className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                language === 'ar' ? 'right-20' : 'left-20'
              }`} // Adjust underline position based on language
            ></span>
                      </p>
                      <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === 'ar' ? 'text-right' : 'text-left'
            } font-raleway ${darkMode ? 'text-white' : 'text-black'}`} // Adjust text alignment
          >            {t.checkOurTeam}
          </h2>
        </div>

        {/* Team Member Grid */}
        <Grid container spacing={4} justifyContent="center">
          {t.teamMembers.map((member, index) => (
            <TeamCard
            language={language}
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

const TeamCard = ({ member, darkMode, isMobile, isTablet,language }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

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
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease-in-out',
            boxShadow: darkMode
              ? '0 4px 15px rgba(0, 255, 255, 0.1)'
              : '0 4px 15px rgba(0, 119, 255, 0.1)',
          }}
        >
          {/* Team Member Image */}
          <Avatar
            alt={member.name}
            src={member.image}
            sx={{
              width: isMobile ? 120 : isTablet ? 160 : 200,
              height: isMobile ? 120 : isTablet ? 160 : 200,
              margin: 'auto',
            }}
          />

          <CardContent  className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === 'ar' ? 'text-right' : 'text-left'
            } font-raleway ${darkMode ? 'text-white' : 'text-black'}`}>
            {/* Name */}
            <Typography variant="h6" className="font-semibold mt-2">
              {member.name}
            </Typography>

            {/* Divider */}
            <div className={`w-12 h-1 my-2 ${darkMode ? 'bg-yellow-500' : 'bg-yellow-500'}`}></div>

            {/* Job Title & Level */}
            <Typography variant="body2" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {member.role}
            </Typography>
            <Typography variant="body2" className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {member.level}
            </Typography>
          </CardContent>

          {/* Social Media Icons (Bottom Right) */}
         {/* Social Media Icons (Bottom Right) */}
<div className={`flex gap-3 mt-4 ${
  language === 'en' ? 'justify-end text-right' : 'justify-end text-left'
} font-raleway ${darkMode ? 'text-white' : 'text-black'}`}>
  
  <motion.a
    href={member.socials.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2 }}
    className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} transition-all`}
  >
    <LinkedIn fontSize="small" />
  </motion.a>

  <motion.a
    href={member.socials.github}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2 }}
    className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} transition-all`}
  >
    <GitHub fontSize="small" />
  </motion.a>

  <motion.a
    href={member.socials.twitter}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2 }}
    className={`${darkMode ? 'text-blue-400' : 'text-blue-500'} transition-all`}
  >
    <Twitter fontSize="small" />
  </motion.a>

  <motion.a
    href={member.socials.facebook}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2 }}
    className={`${darkMode ? 'text-blue-500' : 'text-blue-700'} transition-all`}
  >
    <Facebook fontSize="small" />
  </motion.a>
</div>

        </Card>
      </motion.div>
    </Grid>
  );
};

export default Team;