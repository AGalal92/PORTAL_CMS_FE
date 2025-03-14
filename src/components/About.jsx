import React from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";

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
      className="py-10"
      style={{
        backgroundColor: 'var(--bg-white-color)',
        color: 'var(--text-default-color)',
        transition: 'var(--transition-default)',
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className={`${language === "ar" ? "rtl" : "ltr"} container mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="mb-8">
          <p
            className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-extrabold  tracking-widest relative inline-block`}
            style={{ color: 'var(--text-muted-color)' }}
          >
            {t.aboutUs}
            <span
              className={`absolute top-1/2 w-24 h-[2px] ${
                language === "ar" ? "right-22" : "left-27"
              }`}
              style={{ backgroundColor: 'var(--primary-color)' }}
            ></span>
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === "ar" ? "text-right" : "text-left"
            } font-raleway`}
            style={{ color: 'var(--text-heading-color)' }}
          >
            {t.whoWeAre}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side: Text Content */}
          <TextContent
            title1={t.weAreLegion}
            text1={t.weAreLegionText[0]}
            title2={t.ourMission}
            text2={t.ourMissionText[0]}
            darkMode={darkMode}
            isMobile={isMobile}
            isTablet={isTablet}
            language={language}
          />
          {/* Right Side: Single Cover Image */}
          {!isMobile && (
            <CoverImage
              src="/images/human1.jpg"
              alt={language === "en" ? "About Legion" : "عن ليجيون"}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          )}
        </div>
      </div>
    </section>
  );
}

const TextContent = ({ title1, text1, title2, text2, darkMode, isMobile, isTablet, language }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col p-4"
      style={{
        color: 'var(--text-default-color)',
        borderRadius: 'var(--border-radius-md)',
        borderLeft: '15px solid var(--tertiary-color)',
        borderBottom: '15px solid var(--tertiary-color)',
      }}
    >
      <h3
        style={{ color: 'var(--text-heading-color)' }}
        className="text-lg sm:text-xl md:text-2xl font-semibold font-raleway mb-2"
      >
        | {title1}
      </h3>
      <p style={{ color: 'var(--text-muted-color)' }} className="text-sm sm:text-base md:text-lg">
        {text1}
      </p>
      <h3
        style={{ color: 'var(--text-heading-color)' }}
        className="text-lg sm:text-xl md:text-2xl font-semibold font-raleway mb-2"
      >
        | {title2}
      </h3>
      <p style={{ color: 'var(--text-muted-color)' }} className="text-sm sm:text-base md:text-lg">
        {text2}
      </p>
    </motion.div>
  );
};

const CoverImage = ({ src, alt, isMobile, isTablet }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });
  const width = isTablet ? 400 : 800; // Adjust width for tablet and desktop
  const height = isTablet ? 300 : 700; // Adjust height for tablet and desktop

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="group h-full"
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          borderRadius: 'var(--border-radius-md)',
          borderTop: '10px solid var(--tertiary-color)',
          borderRight: '10px solid var(--tertiary-color)',
          marginTop: -120,
          objectFit: 'cover', // Ensures the image covers the area
        }}
        className="shadow-[var(--shadow-default)] transition-transform duration-300 group-hover:scale-101"
        loading="lazy"
      />
    </motion.div>
  );
};

export default About;