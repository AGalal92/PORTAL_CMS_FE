import React from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";
import "./Technologies.css"; // Import the CSS file for styling

const translations = {
  en: {
    technologies: "Technologies",
    description: "Get full tech stack coverage as and when you need it.",
  },
  ar: {
    technologies: "التقنيات",
    description: "احصل على تغطية كاملة لمجموعة التقنيات حسب حاجتك.",
  },
};

const Technologies = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];

  const technologies = [
    // First Marquee (Right in EN, Left in AR)
    [
      "React",
      "Angular",
      "Vue.js",
      "JavaScript",
      "TypeScript",
      "CSS",
      "iOS",
      "Android",
      "Flutter",
      "React Native",
      "WordPress",
      "Drupal",
      "Shopify",
      "Joomla",
      "Magento",
      "Streaming",
      "TV",
      "Roku",
      "Android TV",
      "Apple TV",
      "Fire TV",
      "AWS",
      "Azure",
      "GCP",
    ],
    // Second Marquee (Left in EN, Right in AR)
    [
      "Node.js",
      "Java",
      "Python",
      ".NET",
      "PHP",
      "Ruby on Rails",
      "Golang",
      "C/C++",
      "Scala",
      "Erlang",
      "Elixir",
      "Rust",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Scikit-learn",
      "R",
      "LLM",
      "NLP",
      "OCR",
      "Blockchain",
      "AR/VR",
      "Unity",
      "Unreal Engine",
      "Godot",
    ],
    // Third Marquee (Right in EN, Left in AR)
    [
      "Snowflake",
      "Databricks",
      "dbt",
      "Tableau",
      "Power BI",
      "Redshift",
      "Spark",
      "SRE",
      "DevOps",
      "Jenkins",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Ansible",
      "CI/CD",
      "Python/Golang/Bash/Shell Scripting",
      "Selenium",
      "Cypress",
      "Jest",
      "Mocha",
      "TestNG",
      "Appium",
      "JUnit",
      "Tosca",
      "SAP ECC",
      "MySQL",
      "PostgreSQL",
      "Oracle",
      "MongoDB",
      "Redis",
      "NoSQL",
    ],
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.3,
  });

  // Determine marquee direction class based on language
  const getMarqueeClass = (index) => {
    if (language === "ar") {
      return index === 1 ? "marquee-right" : "marquee-left";
    }
    return index === 1 ? "marquee-left" : "marquee-right";
  };

  return (
    <section
      className={`technologies_area py-10 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br bg-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br bg-gray-400 to-gray-100 text-black"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
      data-lang={language} // Add data-lang attribute to apply language-specific styles
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className={`mb-8 ${language === "ar" ? "text-right" : "text-left"}`}
        >
          <div className="mb-8">
            <p className="text-xs uppercase font-light tracking-widest relative inline-block">
              {t.technologies}
              <span
                className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                  language === "ar" ? "right-20" : "left-40"
                }`}
              ></span>
            </p>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold font-raleway ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {t.technologies}
            </h2>
            <p
              className={`text-sm md:text-base mt-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t.description}
            </p>
          </div>
        </motion.div>

        {/* Marquee Lists */}
        <div className="technologies">
          {technologies.map((techList, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 10 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`technologies_list marquee ${getMarqueeClass(index)}`}
            >
              <div className="js-marquee-wrapper">
                <div className="js-marquee">
                  {techList.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="tech-item rounded-[20px] shadow-lg p-4 mx-2 flex items-center justify-center"
                      style={{
                        background: darkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(255, 255, 255, 0.3)",
                        backdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <h3
                        className={`text-sm sm:text-lg font-semibold font-raleway ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {tech}
                      </h3>
                    </div>
                  ))}
                </div>
                <div className="js-marquee">
                  {techList.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="tech-item rounded-[20px] shadow-lg p-4 mx-2 flex items-center justify-center"
                      style={{
                        background: darkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(255, 255, 255, 0.3)",
                        backdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <h3
                        className={`text-sm sm:text-lg font-semibold font-raleway ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {tech}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;