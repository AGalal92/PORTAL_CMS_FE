import React from "react";
import { useTheme, useLanguage } from "../App";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScreenSize } from "../hooks/useScreenSize";
import { Link } from "react-router-dom";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import { gaEvent } from "../analytics/gtag";

// Translation object
const translations = {
  en: {
    aboutUs: "Our Process",
    whoWeAre: "How We Work",
    title: "A People-First, Results-Driven Process",
    description: "Our streamlined approach is built to connect you with top software developers to augment your team.",
    bookCall: "Book a Call",
    step1: "Share Your Needs",
    step1Desc: "We start with a deep-dive discovery call, listening closely to your vision, required skills, timeline, and budget.",
    step2: "Meet Your Talent",
    step2Desc: "We present a handpicked selection of meticulously vetted developers, chosen to align perfectly with your team’s culture and technical needs.",
    step3: "Hit the Ground Running",
    step3Desc: "With clear milestones and timelines in place, we help you onboard and integrate new developers into your existing team structure.",
    step4: "Keep Moving Forward",
    step4Desc: "We provide ongoing mentorship, access to top-tier professional development resources, and support from our vibrant community to keep your developers engaged, growing, and consistently delivering great results.",
  },
  ar: {
    aboutUs: "عمليتنا",
    whoWeAre: "كيف نعمل",
    title: "عملية تركز على الأشخاص ومدفوعة بالنتائج",
    description: "نهجنا المبسط مصمم لربطك بأفضل مطوري البرمجيات لتعزيز فريقك.",
    bookCall: "حجز مكالمة",
    step1: "شارك احتياجاتك",
    step1Desc: "نبدأ بمكالمة استكشافية عميقة، نستمع بعناية لرؤيتك، المهارات المطلوبة، الجدول الزمني، والميزانية.",
    step2: "تعرف على مواهبك",
    step2Desc: "نقدم مجموعة مختارة بعناية من المطورين الذين تم فحصهم بدقة، تم اختيارهم ليتناسبوا تمامًا مع ثقافة فريقك واحتياجاته التقنية.",
    step3: "ابدأ العمل فورًا",
    step3Desc: "مع وضع معالم وجداول زمنية واضحة، نساعدك على إدخال المطورين الجدد ودمجهم في هيكل فريقك الحالي.",
    step4: "واصل التقدم",
    step4Desc: "نقدم الإرشاد المستمر، والوصول إلى موارد تطوير مهنية من الدرجة الأولى، والدعم من مجتمعنا النابض بالحياة للحفاظ على تفاعل المطورين ونموهم وتقديم نتائج رائعة باستمرار.",
  },
};

function TeamProcess() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  return (
    <section
      id="process"
      className="py-10"
      style={{
        backgroundColor: 'var(--tertiary-color)',
        color: 'var(--text-default-color)',
        transition: 'var(--transition-default)',
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p
            className={`${language === "ar" ? "rtl" : "ltr"} text-xs uppercase font-extrabold tracking-widest relative inline-block`}
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

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8`}
        >
          {/* Left Section */}
          <div
            className={`w-full ${isMobile ? '' : 'w-1/2'} backdrop-blur-sm bg-opacity-30 p-8`}
            style={{
              borderRadius: 'var(--border-radius-md)',
              border: '15px solid var(--bg-color)',
            }}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: 'var(--text-heading-color)' }}
            >
              {t.title}
            </h2>
            <h5
              className="text-lg sm:text-xl md:text-2xl font-medium mb-6"
              style={{ color: 'var(--primary-color)' }}
            >
              {t.description}
            </h5>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/contact"
                onClick={() => gaEvent('generate_lead', { 
                  method: 'book_call_button', 
                  location: 'team_process_section',
                  value: 1 
                })}
              >
                <motion.button
                  style={{
                    backgroundColor: "#0c59db",
                    color: "var(--secondary-color, #ffffff)",
                    transition: "all 0.3s ease",
                    fontSize: isMobile ? "1.25rem" : "1.5rem",
                    fontWeight: "bold",
                    padding: "1rem 2.5rem",
                    cursor: "pointer",
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--secondary-color, #ffffff)",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 style={{ color: "white" }}>{t.bookCall}</h3>
                </motion.button>
              </Link>
            </motion.div>
            <img
              src="images/step_img.webp"
              alt="process illustration"
              className="mt-6 w-full"
            />
          </div>

          {/* Right Section - Steps */}
          <div className={`w-full ${isMobile ? '' : 'w-1/2'} space-y-6`}>
            {[
              { title: t.step1, desc: t.step1Desc, icon: <LooksOneIcon sx={{ fontSize: 40 }} /> },
              { title: t.step2, desc: t.step2Desc, icon: <LooksTwoIcon sx={{ fontSize: 40 }} /> },
              { title: t.step3, desc: t.step3Desc, icon: <Looks3Icon sx={{ fontSize: 40 }} /> },
              { title: t.step4, desc: t.step4Desc, icon: <Looks4Icon sx={{ fontSize: 40 }} /> },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-sm bg-opacity-30 p-6"
                style={{
                  borderRadius: 'var(--border-radius-md)',
                  border: '15px solid var(--bg-color)',
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div style={{ color: 'var(--primary-color)' }}>{step.icon}</div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: 'var(--text-heading-color)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-base"
                      style={{ color: 'var(--text-default-color)' }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TeamProcess;