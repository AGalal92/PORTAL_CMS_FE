import React from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";
import {
  Business,
  School,
  SportsSoccer,
  BarChart,
  Settings,
  AccountBox,
} from "@mui/icons-material";

// Translation object
const translations = {
  en: {
    services: "Services",
    checkOurServices: "CHECK OUR SERVICES",
    servicesData: [
      {
        title: "ERP Solutions",
        desc: "Comprehensive ERP systems to streamline business operations and improve efficiency.",
        icon: <Business fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "Education Platform",
        desc: "Innovative e-learning solutions tailored for schools, universities, and training centers.",
        icon: <School fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "Sports Platform",
        desc: "Customized platforms for sports management, event organization, and athlete tracking.",
        icon: <SportsSoccer fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "Data Analysis",
        desc: "Advanced data analytics and visualization solutions to drive business insights.",
        icon: <BarChart fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "DevOps Services",
        desc: "CI/CD pipelines, cloud infrastructure, and automation for seamless software deployment.",
        icon: <Settings fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "Company/Personal Portfolios",
        desc: "Custom-designed portfolio websites to showcase brands, businesses, and personal projects.",
        icon: <AccountBox fontSize="large" className="text-yellow-500" />,
      },
    ],
  },
  ar: {
    services: "الخدمات",
    checkOurServices: "تحقق من خدماتنا",
    servicesData: [
      {
        title: "حلول ERP",
        desc: "أنظمة ERP شاملة لتبسيط عمليات الأعمال وتحسين الكفاءة.",
        icon: <Business fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "منصة تعليمية",
        desc: "حلول تعليم إلكتروني مبتكرة مصممة خصيصًا للمدارس والجامعات ومراكز التدريب.",
        icon: <School fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "منصة رياضية",
        desc: "منصات مخصصة لإدارة الرياضة وتنظيم الفعاليات وتتبع الرياضيين.",
        icon: <SportsSoccer fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "تحليل البيانات",
        desc: "حلول تحليلات بيانات متقدمة وتصور بيانات لدفع رؤى الأعمال.",
        icon: <BarChart fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "خدمات DevOps",
        desc: "خطوط أنابيب CI/CD والبنية التحتية السحابية والأتمتة لنشر البرمجيات بسلاسة.",
        icon: <Settings fontSize="large" className="text-yellow-500" />,
      },
      {
        title: "محافظ الشركات/الأفراد",
        desc: "مواقع محافظ مصممة خصيصًا لعرض العلامات التجارية والأعمال والمشاريع الشخصية.",
        icon: <AccountBox fontSize="large" className="text-yellow-500" />,
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
                language === "ar" ? "right-20" : "left-20"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {t.servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </div>
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
      <p
        className={`text-xs sm:text-sm md:text-base text-center ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {service.desc}
      </p>
    </motion.div>
  );
};

export default Services;