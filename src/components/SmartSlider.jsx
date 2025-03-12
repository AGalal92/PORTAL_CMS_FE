import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, useLanguage } from "../App";
import { useScreenSize } from "../hooks/useScreenSize";
import "./Slider.css";
import ArrowButton from './ArrowButtons';
import GitHubIcon from '@mui/icons-material/GitHub';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'; // Substitute for Dribbble
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Slider = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const translations = {
    en: {
      heyo: "Heyo!",
      intro: "I'm John Artur.",
      role: "Web designer.",
      description:
        "From wireframing to prototyping and everything in between, the ultimate designer tool has everything you need to create stunning websites and digital experiences.",
      email: "Get a consultant",
      featuresTitle: "I design and make awesome products",
      featuresDescription:
        "From concept to creation, witness the process of turning your ideas into awesome products that exceed every expectation.",
      seeWorks: "See all works",
      website: "Website",
      websiteText: "Build your online presence with stunning websites.",
      emailTemplates: "Email templates",
      emailText: "Elevate your email marketing with professional templates.",
      videoEffects: "Video effects",
      videoText: "Transform your footage into captivating visuals.",
      graphics: "Graphics",
      graphicsText: "Create impactful graphics that grab attention.",
      companies: "Companies",
      companiesText: "Join 8,000+ satisfied companies.",
      downloads: "Downloads",
      downloadsText: "Join 140k+ users trusting our solutions.",
      satisfaction: "Satisfaction",
      satisfactionText: "Proven track record of 98% client satisfaction.",
      tickets: "Tickets",
      ticketsText: "Completed over 112k+ tickets.",
    },
    ar: {
      heyo: "مرحبًا!",
      intro: "أنا جون أرتور.",
      role: "مصمم ويب.",
      description:
        "من التصميم الأولي إلى النماذج الأولية وكل شيء بينهما، أداة التصميم النهائية لديها كل ما تحتاجه لإنشاء مواقع ويب مذهلة وتجارب رقمية.",
      email: "أرسل لي بريدًا",
      featuresTitle: "أصمم وأصنع منتجات رائعة",
      featuresDescription:
        "من الفكرة إلى الإنشاء، شاهد عملية تحويل أفكارك إلى منتجات رائعة تتجاوز كل التوقعات.",
      seeWorks: "شاهد جميع الأعمال",
      website: "موقع ويب",
      websiteText: "ابني حضورك الإلكتروني بمواقع ويب مذهلة.",
      emailTemplates: "قوالب البريد الإلكتروني",
      emailText: "ارفع مستوى تسويق بريدك الإلكتروني بقوالب احترافية.",
      videoEffects: "تأثيرات الفيديو",
      videoText: "حول لقطاتك إلى تجارب بصرية آسرة.",
      graphics: "الرسومات",
      graphicsText: "أنشئ رسومات مؤثرة تجذب الانتباه.",
      companies: "الشركات",
      companiesText: "انضم إلى أكثر من 8000 شركة راضية.",
      downloads: "التنزيلات",
      downloadsText: "انضم إلى أكثر من 140 ألف مستخدم يثقون بحلولنا.",
      satisfaction: "الرضا",
      satisfactionText: "سجل مثبت بمعدل رضا العملاء 98%.",
      tickets: "التذاكر",
      ticketsText: "أكملنا أكثر من 112 ألف تذكرة.",
    },
  };

  const t = translations[language];

  const handleEmailClick = () => {
    window.location.href = "mailto:example@example.com";
  };

  const handleSeeWorksClick = () => {
    console.log("See all works clicked");
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const handleDragEnd = (event, info) => {
    const threshold = isMobile ? 30 : 50; // Smaller threshold for mobile
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? (language === "ar" ? -1000 : 1000) : (language === "ar" ? 1000 : -1000),
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? (language === "ar" ? -1000 : 1000) : (language === "ar" ? 1000 : -1000),
      opacity: 0,
    }),
  };

  const slides = [
    {
      title: "Hero",
      content: (
        <div className={`slide-content flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-between`}>
          <div className="text-container" style={{ width: isMobile ? "100%" : "50%" }}>
            <motion.h1
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`font-extrabold font-raleway ${isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-5xl"}`}
              style={{ color: 'var(--tertiary-color)' }}
            >
              {t.heyo}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`font-extrabold font-raleway ${isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-5xl"}`}
              style={{ color: 'var(--tertiary-color)' }}
            >
              {t.intro}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`font-extrabold font-raleway ${isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-5xl"}`}
              style={{ color: 'var(--tertiary-color)' }}
            >
              {t.role}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`${isMobile ? "text-xs" : "text-sm md:text-base"} max-w-lg`}
              style={{ color: 'var(--tertiary-color)' }}
            >
              {t.description}
            </motion.p>
            <motion.div
              className={`contact-links ${isMobile ? "flex-col" : "flex-row"} flex gap-4 mt-4`}
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <button
                onClick={handleEmailClick}
                className="email-button flex items-center gap-2 bg-transparent border px-4 py-2 rounded transition"
                style={{
                  color: 'var(--primary-color)',
                  borderColor: 'var(--primary-color)',
                  transition: 'var(--transition-default)',
                }}
              >
                <EmailIcon style={{ color: 'var(--primary-color)' }} fontSize={isMobile ? "small" : "medium"} />
                <h3 className={`${isMobile ? "text-xs" : "text-sm"}`}>{t.email}</h3>
              </button>
            </motion.div>
          </div>
          <div className={`${isMobile ? "mt-4 w-full" : "w-1/2"}`}>
            <motion.img
              src="/images/human1.jpg"
              alt="John Artur"
              className="hero-image"
              initial={{ opacity: 0, y: -1200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ maxWidth: isMobile ? "100%" : isTablet ? "80%" : "100%", height: "auto" }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Features",
      content: (
        <div className={`slide-content flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-between`}>
          <div className="text-container" style={{ width: isMobile ? "100%" : "50%" }}>
            <motion.h1
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`font-extrabold font-raleway ${isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-5xl"}`}
              style={{ color: 'var(--tertiary-color)' }}
            >
              {t.featuresTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`${isMobile ? "text-xs" : "text-sm md:text-base"} max-w-lg`}
              style={{ color: 'var(--tertiary-color)' }}
            >
              {t.featuresDescription}
            </motion.p>
            <motion.button
              onClick={handleSeeWorksClick}
              className="see-works-button flex items-center gap-2 bg-transparent border px-2 py-2 rounded transition custom-width mt-4"
              style={{
                color: 'var(--primary-color)',
                borderColor: 'var(--primary-color)',
                transition: 'var(--transition-default)',
              }}
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {t.seeWorks}
              <ArrowForwardIcon fontSize={isMobile ? "small" : "medium"} style={{ color: 'var(--primary-color)' }} />
            </motion.button>
          </div>
          <div className={`image-container flex flex-col items-end relative ${isMobile ? "mt-4 w-full" : "w-1/2"}`}>
            <motion.div
              className={`features-grid ${isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-6"}`}
              initial={{ opacity: 0, x: language === "ar" ? 400 : -400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <img src="/images/iconbutton_rocket.png" alt="Website" width={isMobile ? 32 : 48} height={isMobile ? 32 : 48} />
                <h3 className={`font-semibold font-raleway ${isMobile ? "text-sm" : "text-lg"}`} style={{ color: 'var(--primary-color)' }}>| {t.website}</h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"}`} style={{ color: 'var(--tertiary-color)' }}>{t.websiteText}</p>
              </div>
              <div>
                <img src="/images/iconbutton_email.png" alt="Email" width={isMobile ? 32 : 48} height={isMobile ? 32 : 48} />
                <h3 className={`font-semibold font-raleway ${isMobile ? "text-sm" : "text-lg"}`} style={{ color: 'var(--primary-color)' }}>| {t.emailTemplates}</h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"}`} style={{ color: 'var(--tertiary-color)' }}>{t.emailText}</p>
              </div>
              <div>
                <img src="/images/iconbutton_spark.png" alt="Video" width={isMobile ? 32 : 48} height={isMobile ? 32 : 48} />
                <h3 className={`font-semibold font-raleway ${isMobile ? "text-sm" : "text-lg"}`} style={{ color: 'var(--primary-color)' }}>| {t.videoEffects}</h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"}`} style={{ color: 'var(--tertiary-color)' }}>{t.videoText}</p>
              </div>
              <div>
                <img src="/images/iconbutton_image.png" alt="Graphics" width={isMobile ? 32 : 48} height={isMobile ? 32 : 48} />
                <h3 className={`font-semibold font-raleway ${isMobile ? "text-sm" : "text-lg"}`} style={{ color: 'var(--primary-color)' }}>| {t.graphics}</h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"}`} style={{ color: 'var(--tertiary-color)' }}>{t.graphicsText}</p>
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Content",
      content: (
        <div className={`slide-content flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-between`}>
          <div className="text-container" style={{ width: isMobile ? "100%" : "50%" }}>
            <motion.div
              className={`stats-grid ${isMobile ? "grid grid-cols-2 gap-4" : "grid grid-cols-2 md:grid-cols-4 gap-6"}`}
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h2 className={`font-extrabold font-raleway ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`} style={{ color: 'var(--tertiary-color)' }}>8k+</h2>
                <h3 className={`font-semibold font-raleway ${isMobile ? "text-sm" : "text-lg"}`} style={{ color: 'var(--primary-color)' }}>| {t.companies}</h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"}`} style={{ color: 'var(--tertiary-color)' }}>{t.companiesText}</p>
              </div>
              <div>
                <h2 className={`font-extrabold font-raleway ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`} style={{ color: 'var(--tertiary-color)' }}>140k+</h2>
                <h3 className={`font-semibold font-raleway ${isMobile ? "text-sm" : "text-lg"}`} style={{ color: 'var(--primary-color)' }}>| {t.downloads}</h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"}`} style={{ color: 'var(--tertiary-color)' }}>{t.downloadsText}</p>
              </div>
              <div>
                <h2 className={`font-extrabold font-raleway ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`} style={{ color: 'var(--tertiary-color)' }}>98%</h2>
                <h3 className={`font-semibold font-raleway ${isMobile ? "text-sm" : "text-lg"}`} style={{ color: 'var(--primary-color)' }}>| {t.satisfaction}</h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"}`} style={{ color: 'var(--tertiary-color)' }}>{t.satisfactionText}</p>
              </div>
              <div>
                <h2 className={`font-extrabold font-raleway ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`} style={{ color: 'var(--tertiary-color)' }}>112k+</h2>
                <h3 className={`font-semibold font-raleway ${isMobile ? "text-sm" : "text-lg"}`} style={{ color: 'var(--primary-color)' }}>| {t.tickets}</h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"}`} style={{ color: 'var(--tertiary-color)' }}>{t.ticketsText}</p>
              </div>
            </motion.div>
          </div>
          <div className={`${isMobile ? "mt-4 w-full" : "w-1/2"}`}>
            <motion.img
              src="/images/human2.jpg"
              alt="Monolith"
              className="content-image"
              initial={{ opacity: 0, x: language === "ar" ? 400 : -400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ maxWidth: isMobile ? "100%" : isTablet ? "80%" : "100%", height: "auto" }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      className={`slider transition-all duration-500 cursor-grab`}
      style={{
        backgroundColor: 'var(--secondary-color)',
        color: 'var(--text-default-color)',
        transition: 'var(--transition-default)',
        padding: isMobile ? "1rem" : "2rem",
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Animated Background Layer */}
      <div className="animated-background" />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="slide"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          onDragEnd={handleDragEnd}
          dragElastic={0.2}
        >
          {slides[currentSlide].content}
        </motion.div>
      </AnimatePresence>

      <div className="arrows" style={{ marginTop: isMobile ? "1rem" : "2rem" }}>
        <ArrowButton direction="prev" onClick={prevSlide} />
        <ArrowButton direction="next" onClick={nextSlide} />
      </div>

      <div className="bullets" style={{ marginTop: isMobile ? "1rem" : "2rem" }}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`bullet ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            role="button"
            aria-label={slides[index].title}
            style={{ width: isMobile ? "8px" : "10px", height: isMobile ? "8px" : "10px" }}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;