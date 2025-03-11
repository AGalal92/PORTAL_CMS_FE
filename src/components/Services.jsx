import React from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";
import {
  Computer, // For Computer icon
  Apple, // For Apple Logo Icon
  Android, // For Android Logo Icon
  DesignServices, // For Design Icon
  DeveloperMode, // For Development Icon
  Devices, // For Computer and Phone Icon
  ShoppingCart, // For Shopping cart icon
  BugReport, // For Software Testing & QA
  Build, // For Maintenance & Support
  Handyman, // For Tools/Modernization
  Security, // For Security icon
  Speed, // For DevOps (Number icon alternative)
  Sync, // For Migration/Communication icon
  Cloud, // For Cloud icon
  Lock, // For Blockchain icon
  Language, // For Internet icon (IoT)
  AccountBalanceWallet, // For Wallet icon
  Autorenew, // For Process Automation
  Psychology, // For Machine Learning
  SmartToy, // For AI icon
  Storage, // For Database icon
  BarChart, // For Data Science
} from "@mui/icons-material";

// Translation object
const translations = {
  en: {
    services: "Services",
    checkOurServices: "CHECK OUR SERVICES",
    servicesData: [
      {
        title: "Software Development & Design",
        desc: "Bring your product vision to life with end-to-end development expertise and innovative design solutions.",
        subServices: [
          { title: "Front-End Development", icon: <Computer fontSize="large" className="text-yellow-500" /> },
          { title: "Back-End Development", icon: <Computer fontSize="large" className="text-yellow-500" /> },
          { title: "Web Application Development", icon: <Computer fontSize="large" className="text-yellow-500" /> },
          { title: "iOS App Development", icon: <Apple fontSize="large" className="text-yellow-500" /> },
          { title: "Android App Development", icon: <Android fontSize="large" className="text-yellow-500" /> },
          { title: "UI/UX Design", icon: <DesignServices fontSize="large" className="text-yellow-500" /> },
          { title: "MVP Development", icon: <DeveloperMode fontSize="large" className="text-yellow-500" /> },
          { title: "Progressive Web Applications (PWAs)", icon: <Devices fontSize="large" className="text-yellow-500" /> },
          { title: "E-commerce Development", icon: <ShoppingCart fontSize="large" className="text-yellow-500" /> },
        ],
      },
      {
        title: "QA, Testing, Maintenance & Modernization",
        desc: "Secure your systems, streamline development, and ensure smooth migrations with our specialized services.",
        subServices: [
          { title: "Software Testing & QA", icon: <BugReport fontSize="large" className="text-yellow-500" /> },
          { title: "Maintenance & Support", icon: <Build fontSize="large" className="text-yellow-500" /> },
          { title: "Modernization", icon: <Handyman fontSize="large" className="text-yellow-500" /> },
          { title: "Cybersecurity", icon: <Security fontSize="large" className="text-yellow-500" /> },
          { title: "DevOps", icon: <Speed fontSize="large" className="text-yellow-500" /> },
          { title: "Migration", icon: <Sync fontSize="large" className="text-yellow-500" /> },
        ],
      },
      {
        title: "Cloud & Advanced Technologies",
        desc: "Leverage advanced software development solutions to stay ahead of the competition.",
        subServices: [
          { title: "Cloud Computing", icon: <Cloud fontSize="large" className="text-yellow-500" /> },
          { title: "Blockchain Software Development", icon: <Lock fontSize="large" className="text-yellow-500" /> },
          { title: "Internet of Things (IoT)", icon: <Language fontSize="large" className="text-yellow-500" /> },
          { title: "Digital Wallets & Cryptocurrency", icon: <AccountBalanceWallet fontSize="large" className="text-yellow-500" /> },
          { title: "Process Automation", icon: <Autorenew fontSize="large" className="text-yellow-500" /> },
          { title: "Machine Learning", icon: <Psychology fontSize="large" className="text-yellow-500" /> },
          { title: "Artificial Intelligence", icon: <SmartToy fontSize="large" className="text-yellow-500" /> },
          { title: "Database Development", icon: <Storage fontSize="large" className="text-yellow-500" /> },
          { title: "Data Science", icon: <BarChart fontSize="large" className="text-yellow-500" /> },
        ],
      },
    ],
  },
  ar: {
    services: "الخدمات",
    checkOurServices: "تحقق من خدماتنا",
    servicesData: [
      {
        title: "تطوير وتصميم البرمجيات",
        desc: "اجعل رؤية منتجك تنبض بالحياة مع خبرة تطوير شاملة وحلول تصميم مبتكرة.",
        subServices: [
          { title: "تطوير الواجهة الأمامية", icon: <Computer fontSize="large" className="text-yellow-500" /> },
          { title: "تطوير الواجهة الخلفية", icon: <Computer fontSize="large" className="text-yellow-500" /> },
          { title: "تطوير تطبيقات الويب", icon: <Computer fontSize="large" className="text-yellow-500" /> },
          { title: "تطوير تطبيقات iOS", icon: <Apple fontSize="large" className="text-yellow-500" /> },
          { title: "تطوير تطبيقات Android", icon: <Android fontSize="large" className="text-yellow-500" /> },
          { title: "تصميم UI/UX", icon: <DesignServices fontSize="large" className="text-yellow-500" /> },
          { title: "تطوير MVP", icon: <DeveloperMode fontSize="large" className="text-yellow-500" /> },
          { title: "تطبيقات الويب التدريجية (PWAs)", icon: <Devices fontSize="large" className="text-yellow-500" /> },
          { title: "تطوير التجارة الإلكترونية", icon: <ShoppingCart fontSize="large" className="text-yellow-500" /> },
        ],
      },
      {
        title: "ضمان الجودة، الاختبار، الصيانة والتحديث",
        desc: "أمن أنظمتك، وتبسيط التطوير، وضمان الهجرة السلسة مع خدماتنا المتخصصة.",
        subServices: [
          { title: "اختبار البرمجيات وضمان الجودة", icon: <BugReport fontSize="large" className="text-yellow-500" /> },
          { title: "الصيانة والدعم", icon: <Build fontSize="large" className="text-yellow-500" /> },
          { title: "التحديث", icon: <Handyman fontSize="large" className="text-yellow-500" /> },
          { title: "الأمن السيبراني", icon: <Security fontSize="large" className="text-yellow-500" /> },
          { title: "DevOps", icon: <Speed fontSize="large" className="text-yellow-500" /> },
          { title: "الهجرة", icon: <Sync fontSize="large" className="text-yellow-500" /> },
        ],
      },
      {
        title: "الحوسبة السحابية والتقنيات المتقدمة",
        desc: "استفد من حلول تطوير البرمجيات المتقدمة لتبقى في صدارة المنافسة.",
        subServices: [
          { title: "الحوسبة السحابية", icon: <Cloud fontSize="large" className="text-yellow-500" /> },
          { title: "تطوير برمجيات البلوك تشين", icon: <Lock fontSize="large" className="text-yellow-500" /> },
          { title: "إنترنت الأشياء (IoT)", icon: <Language fontSize="large" className="text-yellow-500" /> },
          { title: "المحافظ الرقمية والعملات المشفرة", icon: <AccountBalanceWallet fontSize="large" className="text-yellow-500" /> },
          { title: "أتمتة العمليات", icon: <Autorenew fontSize="large" className="text-yellow-500" /> },
          { title: "التعلم الآلي", icon: <Psychology fontSize="large" className="text-yellow-500" /> },
          { title: "الذكاء الاصطناعي", icon: <SmartToy fontSize="large" className="text-yellow-500" /> },
          { title: "تطوير قواعد البيانات", icon: <Storage fontSize="large" className="text-yellow-500" /> },
          { title: "علم البيانات", icon: <BarChart fontSize="large" className="text-yellow-500" /> },
        ],
      },
    ],
  },
};

function Services() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];

  return (
    <section
      id="services"
      className={`py-10 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            {t.services}
            <span
              className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                language === "ar" ? "right-20" : "left-27"
              }`}
            ></span>
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === "ar" ? "text-right" : "text-left"
            } font-raleway ${darkMode ? "text-white" : "text-black"}`}
          >
            {t.checkOurServices}
          </h2>
        </div>

        {/* Grid Layout */}
        {t.servicesData.map((category, index) => (
          <div key={index} className="mb-12">
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-4 ${
                language === "ar" ? "text-center" : "text-center"
              } font-raleway ${darkMode ? "text-yellow-500" : "text-yellow-500"}`}
            >
              {category.title}
            </h3>
            <p
              className={`text-sm md:text-base mb-6 ${
                language === "ar" ? "text-right" : "text-left"
              } ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {category.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {category.subServices.map((service, subIndex) => (
                <ServiceCard
                  key={subIndex}
                  service={service}
                  darkMode={darkMode}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ServiceCard = ({ service, darkMode, isMobile, isTablet }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="group rounded-[20px] shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300"
      style={{
        background: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="mb-4">{service.icon}</div>
      <h3 className="text-sm sm:text-lg md:text-xl font-semibold font-raleway mb-2 text-center">
        {service.title}
      </h3>
    </motion.div>
  );
};

export default Services;