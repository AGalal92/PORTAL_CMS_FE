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
      email: "Drop me a mail",
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
    const threshold = 50; // Minimum drag distance to trigger slide change
    if (info.offset.x < -threshold) {
      // Dragged left, go to next slide
      nextSlide();
    } else if (info.offset.x > threshold) {
      // Dragged right, go to previous slide
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
        <div className="slide-content flex flex-row items-center justify-between">
          <div className="text-container">
            <motion.h1
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-raleway"
            >
              {t.heyo}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-raleway"
            >
              {t.intro}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-raleway"
            >
              {t.role}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm md:text-base max-w-lg"
            >
              {t.description}
            </motion.p>
            <motion.div
              className="contact-links"
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <button
                onClick={handleEmailClick}
                className="email-button flex items-center gap-2 text-yellow-500 bg-transparent border border-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-white transition"
              >
                <EmailIcon fontSize="small" />
                {t.email}
              </button>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon fontSize="large" className="social-icon" />
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                  <SportsBasketballIcon fontSize="large" className="social-icon" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon fontSize="large" className="social-icon" />
                </a>
              </div>
            </motion.div>
          </div>
          <div className="image-container flex flex-col items-end relative">
            <motion.img
              src="/images/hero5.jpg"
              alt="John Artur"
              className="hero-image"
              initial={{ opacity: 0, y: -1200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Features",
      content: (
        <div className="slide-content flex flex-row items-center justify-between">
          <div className="text-container">
            <motion.h1
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-raleway"
            >
              {t.featuresTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-base max-w-lg"
            >
              {t.featuresDescription}
            </motion.p>
            <motion.button
              onClick={handleSeeWorksClick}
              className="see-works-button flex items-center gap-2 text-yellow-500 bg-transparent border border-yellow-500 px-2 py-2 rounded hover:bg-yellow-500 hover:text-white transition custom-width" // Added custom-width
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {t.seeWorks}
              <ArrowForwardIcon fontSize="small" />
            </motion.button>
           
          </div>
          <div className="image-container flex flex-col items-end relative">
          <motion.div
              className="features-grid"
              initial={{ opacity: 0, x: language === "ar" ? 400 : -400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <img src="/images/iconbutton_rocket.png" alt="Website" width="48" height="48" />
                <h3 className="text-lg font-semibold font-raleway text-yellow-500">| {t.website}</h3>
                <p className="text-xs md:text-sm">{t.websiteText}</p>
              </div>
              <div>
                <img src="/images/iconbutton_email.png" alt="Email" width="48" height="48" />
                <h3 className="text-lg font-semibold font-raleway text-yellow-500">| {t.emailTemplates}</h3>
                <p className="text-xs md:text-sm">{t.emailText}</p>
              </div>
              <div>
                <img src="/images/iconbutton_spark.png" alt="Video" width="48" height="48" />
                <h3 className="text-lg font-semibold font-raleway text-yellow-500">| {t.videoEffects}</h3>
                <p className="text-xs md:text-sm">{t.videoText}</p>
              </div>
              <div>
                <img src="/images/iconbutton_image.png" alt="Graphics" width="48" height="48" />
                <h3 className="text-lg font-semibold font-raleway text-yellow-500">| {t.graphics}</h3>
                <p className="text-xs md:text-sm">{t.graphicsText}</p>
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Content",
      content: (
        <div className="slide-content">
          <div className="text-container">
            <motion.div
              className="stats-grid"
              initial={{ opacity: 0, x: language === "ar" ? -400 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-raleway">8k+</h2>
                <h3 className="text-lg font-semibold font-raleway text-yellow-500">| {t.companies}</h3>
                <p className="text-xs md:text-sm">{t.companiesText}</p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-raleway">140k+</h2>
                <h3 className="text-lg font-semibold font-raleway text-yellow-500">| {t.downloads}</h3>
                <p className="text-xs md:text-sm">{t.downloadsText}</p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-raleway">98%</h2>
                <h3 className="text-lg font-semibold font-raleway text-yellow-500">| {t.satisfaction}</h3>
                <p className="text-xs md:text-sm">{t.satisfactionText}</p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-raleway">112k+</h2>
                <h3 className="text-lg font-semibold font-raleway text-yellow-500">| {t.tickets}</h3>
                <p className="text-xs md:text-sm">{t.ticketsText}</p>
              </div>
            </motion.div>
          </div>
          <div className="image-container">
            <motion.img
              src="/images/monolith_image_fullfull.png"
              alt="Monolith"
              className="content-image"
              initial={{ opacity: 0, x: language === "ar" ? 400 : -400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      className={`slider transition-all duration-500 cursor-grab ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
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

      <div className="arrows">
        <ArrowButton direction="prev" onClick={prevSlide} />
        <ArrowButton direction="next" onClick={nextSlide} />
      </div>

      <div className="bullets">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`bullet ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            role="button"
            aria-label={slides[index].title}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;