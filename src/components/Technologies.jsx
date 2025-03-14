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
      className={`technologies_area py-10 transition-all duration-500 `}
      style={{
        backgroundColor: 'var(--tertiary-color)',
        color: 'var(--text-default-color)',
        transition: 'var(--transition-default)',
      }}
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
         className={`${language === "ar" ? "rtl" : "ltr"} container mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <div className="mb-8">
          <p
            className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-extrabold  tracking-widest relative inline-block`}
            style={{ color: 'var(--text-muted-color)' }}
          >   
              {t.technologies}
              <span
              className={`absolute top-1/2 w-24 h-[2px] ${
                language === "ar" ? "right-24" : "left-40"
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
              {t.technologies}
            </h2>
            {/* <p
            className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-light tracking-widest relative inline-block`}
            style={{ color: 'var(--text-muted-color)' }}
          >      
              {t.description}
            </p> */}
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
                      className="tech-item rounded-[10px] shadow-sm p-4 mx-2 flex items-center justify-center"
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
                          darkMode ? "text-white" : "var(--secondary-color)"
                        }`}
                        style={{ color: 'var(--secondary-color)' }}

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
                      className="tech-item rounded-[10px] shadow-sm p-4 mx-2 flex items-center justify-center"
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
                          darkMode ? "text-white" : "var(--secondary-color)"
                        }`}
                        style={{ color: 'var(--secondary-color)' }}
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