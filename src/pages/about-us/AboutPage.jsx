import React from "react";
import { useTheme, useLanguage } from "../../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../../hooks/useScreenSize";
import Team from "../../components/Team";

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
      className={`py-20 min-h-screen transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className={`${language === "ar" ? "rtl" : "ltr"} container mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Title */}
        <div className="mb-8">
          <p className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-light tracking-widest relative inline-block`}>
            {t.aboutUs}
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
            {t.whoWeAre}
          </h2>
        </div>

        {/* Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Single Large Image with Text */}
          <div className="md:col-span-2">
            <GalleryImageWithText
              src="/images/hero5.jpg"
              alt={language === "en" ? "About Legion" : "عن ليجيون"}
              title1={t.weAreLegion}
              text1={t.weAreLegionText[0]}
              title2={t.ourMission}
              text2={t.ourMissionText[0]}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
              language={language}
            />
          </div>

          {/* Right Column: Two Stacked Images */}
          {!isMobile  && (<div className="flex flex-col gap-6">
            <GalleryImage
              src="/images/hero7.jpg"
              alt={language === "en" ? "Our Work 1" : "عملنا 1"}
              isMobile={isMobile}
              isTablet={isTablet}
            />
            <GalleryImage
              src="/images/hero1.jpg"
              alt={language === "en" ? "Our Work 2" : "عملنا 2"}
              isMobile={isMobile}
              isTablet={isTablet}
            />
             {isTablet  && (<div className="flex flex-col gap-6">
            <GalleryImage
              src="/images/hero8.jpg"
              alt={language === "en" ? "Our Work 1" : "عملنا 1"}
              isMobile={isMobile}
              isTablet={isTablet}
            />
           
             
          </div> )}
          </div> )}
         
        </div>
      </div>
      <Team />
    </section>
  );
}

const GalleryImageWithText = ({ src, alt, title1, text1, title2, text2, darkMode, isMobile, isTablet,language }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.3,
  });

  const width = isMobile ? 280 : isTablet ? 400 : 600;
  const height = isMobile ? 180 : isTablet ? 250 : 650;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="relative group flex flex-col"
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{minHeight: height, borderRadius: width / 40}}
        className={`rounded-t-[20px] shadow-lg object-cover w-full h-full transition-transform duration-300 ${
          !isMobile ? "group-hover:scale-101" : ""
        }`}
        loading="lazy"
      />

      {isMobile || isTablet ? (
        // Mobile: Static content below image
        <div
          className={`p-4 rounded-b-[20px] shadow-lg ${language === "ar" ? "rtl" : "ltr"}  ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          }`}
        >
          <h3 className="  text-yellow-500 text-sm font-semibold font-raleway mb-1">| {title1}</h3>
          <p className="text-xs mb-3">{text1}</p>
          <h3 className="text-yellow-500 text-sm font-semibold font-raleway mb-1">| {title2}</h3>
          <p className="text-xs">{text2}</p>
        </div>
      ) : (
        // Desktop/Tablet: Overlay at bottom left
        <motion.div
          className={`${language === "ar" ? "rtl" : "ltr"} absolute bottom-0 left-0 p-4 w-full transition-all duration-300`}
        >
          <div
            className={`bg-black/60 backdrop-blur-sm rounded-lg p-3 text-left ${
              darkMode ? "text-white" : "text-white"
            }`}
          >
            <h3 className={`${language === "ar" ? "rtl" : "ltr"} text-yellow-500 text-sm sm:text-lg md:text-xl font-semibold mb-1`}>| {title1}</h3>
            <p className={`${language === "ar" ? "rtl" : "ltr"} text-xs sm:text-sm md:text-base`}>{text1}</p>
            <h3 className={`${language === "ar" ? "rtl" : "ltr"} text-yellow-500 text-sm sm:text-lg md:text-xl font-semibold mt-3 mb-1 `}>| {title2}</h3>
            <p className={`${language === "ar" ? "rtl" : "ltr"} text-xs sm:text-sm md:text-base `}>{text2}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const GalleryImage = ({ src, alt, isMobile, isTablet }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.3,
  });

  const width = isMobile ? 200 : isTablet ? 300 : 750;
  const height = isMobile ? 150 : isTablet ? 200 : 250;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="group"
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-[20px] shadow-lg object-cover  transition-transform duration-300 ${
          !isMobile ? "group-hover:scale-101" : ""
        }`}
        loading="lazy"
      />
    </motion.div>
  );
};

export default About;