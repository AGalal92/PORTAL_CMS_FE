import React, { useState } from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";

// Translation object (unchanged)
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

// Slider data
const sliderData = [
  {
    image: "/images/hero5.jpg",
    alt: "About Legion",
    altAr: "عن ليجيون",
  },
  {
    image: "/images/hero7.jpg",
    alt: "Our Work 1",
    altAr: "عملنا 1",
  },
  {
    image: "/images/hero1.jpg",
    alt: "Our Work 2",
    altAr: "عملنا 2",
  },
];

function About() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section
      id="about"
      className={`py-10 transition-all duration-500 ${
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

        {/* Slider Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Bullets (Vertical) */}
          {!isMobile && (
            <div className="flex flex-col justify-center items-center space-y-4 md:w-16">
              {sliderData.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    activeSlide === index
                      ? "bg-yellow-500 scale-125"
                      : darkMode
                      ? "bg-gray-500"
                      : "bg-gray-400"
                  }`}
                  onClick={() => setActiveSlide(index)}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text Content */}
            <TextContent
              title1={t.weAreLegion}
              text1={t.weAreLegionText[0]}
              title2={t.ourMission}
              text2={t.ourMissionText}
              darkMode={darkMode}
              language={language}
              isMobile={isMobile}
              activeSlide={activeSlide}
            />

            {/* Image Slider */}
            {!isMobile && (
              <ImageSlider
                slides={sliderData}
                activeSlide={activeSlide}
                language={language}
                isTablet={isTablet}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const TextContent = ({ title1, text1, title2, text2, darkMode, language, isMobile, activeSlide }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger every time it comes into view
    threshold: isMobile ? 0.1 : 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ x: language === "ar" ? 100 : -100, opacity: 0 }}
      animate={
        inView
          ? { x: 0, opacity: 1, y: -activeSlide * 20 } // Move up/down with slider
          : { x: language === "ar" ? 100 : -100, opacity: 0 }
      }
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col p-4"
    >
      <h3 className="text-yellow-500 text-sm sm:text-lg md:text-xl font-semibold font-raleway mb-2">
        | {title1}
      </h3>
      <p className={`${language === "ar" ? "text-right" : "text-left"} text-xs sm:text-sm md:text-base mb-6`}>
        {text1}
      </p>
      <h3 className="text-yellow-500 text-sm sm:text-lg md:text-xl font-semibold font-raleway mb-2">
        | {title2}
      </h3>
      {text2.map((paragraph, index) => (
        <p
          key={index}
          className={`${language === "ar" ? "text-right" : "text-left"} text-xs sm:text-sm md:text-base mb-3`}
        >
          {paragraph}
        </p>
      ))}
    </motion.div>
  );
};

const ImageSlider = ({ slides, activeSlide, language, isTablet }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const width = isTablet ? 400 : 600;
  const height = isTablet ? 500 : 650;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[20px] shadow-lg"
    >
      <motion.img
        src={slides[activeSlide].image}
        alt={language === "en" ? slides[activeSlide].alt : slides[activeSlide].altAr}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        animate={{ y: -activeSlide * 50 }} // Move up when slider goes down
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ minHeight: height, borderRadius: width / 40 }}
        loading="lazy"
      />
    </motion.div>
  );
};

export default About;