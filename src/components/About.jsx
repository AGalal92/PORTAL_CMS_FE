import React from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";

// Translation object
const translations = {
  en: {
    aboutUs: "About Us",
    whoWeAre: "WHO WE ARE",
    weAreLegion: "We Are Legion",
    weAreLegionText: [
      "At Legion Agency, we specialize in crafting innovative web and Android applications that drive success for businesses and entrepreneurs. Our team has quickly established itself as a trusted partner in the digital landscape, delivering user-friendly solutions and cutting-edge technology tailored to meet our clients’ unique needs.",
    ],
    ourMission: "Our Mission",
    ourMissionText: [
      "Our passion for excellence and commitment to quality is at the heart of everything we do. Whether it’s building responsive web platforms or developing seamless mobile applications, we bring creativity, technical expertise, and a collaborative spirit to every project. Our goal is to empower your business through digital transformation, ensuring you stay ahead in an ever-evolving market.",
      "Join us on our journey as we continue to push the boundaries of innovation and deliver exceptional digital experiences.",
    ],
  },
  ar: {
    aboutUs: "من نحن",
    whoWeAre: "من نحن",
    weAreLegion: "نحن ليجيون",
    weAreLegionText: [
      "في وكالة ليجيون، نحن متخصصون في صياغة تطبيقات الويب وأندرويد المبتكرة التي تدفع النجاح للشركات ورجال الأعمال. لقد أثبت فريقنا نفسه بسرعة كشريك موثوق في المشهد الرقمي، حيث يقدم حلولًا سهلة الاستخدام وتكنولوجيا متطورة مصممة لتلبية احتياجات عملائنا الفريدة.",
    ],
    ourMission: "مهمتنا",
    ourMissionText: [
      "شغفنا بالتميز والالتزام بالجودة هما في صميم كل ما نقوم به. سواء كان ذلك في بناء منصات ويب متجاوبة أو تطوير تطبيقات جوال سلسة، نحن نجلب الإبداع والخبرة التقنية وروح التعاون إلى كل مشروع. هدفنا هو تمكين عملك من خلال التحول الرقمي، مما يضمن بقاءك في صدارة السوق المتطور باستمرار.",
      "انضم إلينا في رحلتنا بينما نواصل دفع حدود الابتكار وتقديم تجارب رقمية استثنائية.",
    ],
  },
};

function About() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];

  return (
    <section
      id="about"
      className={`py-10 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'} // Set direction based on language
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned Title with Underline */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            {t.aboutUs}
            <span
              className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                language === "ar" ? "right-20" : "left-20"
              }`} // Adjust underline position based on language
            ></span>{" "}
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === "ar" ? "text-right" : "text-left"
            } font-raleway ${darkMode ? "text-white" : "text-black"}`} // Adjust text alignment
          >
            {" "}
            {t.whoWeAre}
          </h2>
        </div>

        {/* Alternating Text & Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <AnimatedText
            darkMode={darkMode}
            title={t.weAreLegion}
            text={t.weAreLegionText}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <AnimatedImage
            src="/images/hero1.jpg"
            alt={language === "en" ? "About Legion" : "عن ليجيون"}
            isMobile={isMobile}
            isTablet={isTablet}
          />

          <AnimatedImage
            src="/images/hero2.jpg"
            alt={language === "en" ? "Our Team at Work" : "فريقنا في العمل"}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <AnimatedText
            darkMode={darkMode}
            title={t.ourMission}
            text={t.ourMissionText}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      </div>
    </section>
  );
}

const AnimatedText = ({ darkMode, title, text, isMobile, isTablet }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className="space-y-4"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl font-semibold">{title}</h3>
      {text.map((paragraph, index) => (
        <p
          key={index}
          className={`text-base sm:text-lg ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {paragraph}
        </p>
      ))}
    </motion.div>
  );
};

const AnimatedImage = ({ src, alt, isMobile, isTablet }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.3,
  });
  const width = isMobile ? 300 : isTablet ? 400 : 500;
  const height = isMobile ? 200 : isTablet ? 250 : 300;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg shadow-lg"
        loading="lazy"
      />
    </motion.div>
  );
};

export default About;
