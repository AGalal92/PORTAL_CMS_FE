import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { 
  Business, 
  School, 
  SportsSoccer, 
  BarChart, 
  Settings, 
  AccountBox 
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useTheme, useLanguage } from '../App'; // Import useLanguage
import { useInView } from 'react-intersection-observer';
import { useScreenSize } from '../hooks/useScreenSize';

// Translation object
const translations = {
  en: {
    services: 'Services',
    checkOurServices: 'CHECK OUR SERVICES',
    servicesData: [
      { 
        title: 'ERP Solutions', 
        desc: 'Comprehensive ERP systems to streamline business operations and improve efficiency.', 
        icon: <Business fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'Education Platform', 
        desc: 'Innovative e-learning solutions tailored for schools, universities, and training centers.', 
        icon: <School fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'Sports Platform', 
        desc: 'Customized platforms for sports management, event organization, and athlete tracking.', 
        icon: <SportsSoccer fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'Data Analysis', 
        desc: 'Advanced data analytics and visualization solutions to drive business insights.', 
        icon: <BarChart fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'DevOps Services', 
        desc: 'CI/CD pipelines, cloud infrastructure, and automation for seamless software deployment.', 
        icon: <Settings fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'Company/Personal Portfolios', 
        desc: 'Custom-designed portfolio websites to showcase brands, businesses, and personal projects.', 
        icon: <AccountBox fontSize="large" className="text-yellow-500" /> 
      },
    ],
  },
  ar: {
    services: 'الخدمات',
    checkOurServices: 'تحقق من خدماتنا',
    servicesData: [
      { 
        title: 'حلول ERP', 
        desc: 'أنظمة ERP شاملة لتبسيط عمليات الأعمال وتحسين الكفاءة.', 
        icon: <Business fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'منصة تعليمية', 
        desc: 'حلول تعليم إلكتروني مبتكرة مصممة خصيصًا للمدارس والجامعات ومراكز التدريب.', 
        icon: <School fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'منصة رياضية', 
        desc: 'منصات مخصصة لإدارة الرياضة وتنظيم الفعاليات وتتبع الرياضيين.', 
        icon: <SportsSoccer fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'تحليل البيانات', 
        desc: 'حلول تحليلات بيانات متقدمة وتصور بيانات لدفع رؤى الأعمال.', 
        icon: <BarChart fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'خدمات DevOps', 
        desc: 'خطوط أنابيب CI/CD والبنية التحتية السحابية والأتمتة لنشر البرمجيات بسلاسة.', 
        icon: <Settings fontSize="large" className="text-yellow-500" /> 
      },
      { 
        title: 'محافظ الشركات/الأفراد', 
        desc: 'مواقع محافظ مصممة خصيصًا لعرض العلامات التجارية والأعمال والمشاريع الشخصية.', 
        icon: <AccountBox fontSize="large" className="text-yellow-500" /> 
      },
    ],
  },
};

function Services() {
  const { darkMode } = useTheme();
  const { language } = useLanguage(); // Access language from context
  const { isMobile, isTablet } = useScreenSize();
  const t = translations[language]; // Select translations based on language

  return (
    <section
      id="services"
      className={`py-16 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'} // Set direction based on language
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned Title with Underline */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            {t.services}
            <span
              className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                language === 'ar' ? 'right-20' : 'left-20'
              }`} // Adjust underline position based on language
            ></span>          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === 'ar' ? 'text-right' : 'text-left'
            } font-raleway ${darkMode ? 'text-white' : 'text-black'}`} // Adjust text alignment
          >            {t.checkOurServices}
          </h2>
        </div>

        {/* Service Cards with Responsive Layout */}
        <Grid container spacing={4} justifyContent="center">
          {t.servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              darkMode={darkMode}
              index={index}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </Grid>
      </div>
    </section>
  );
}

const ServiceCard = ({ service, darkMode, index, isMobile, isTablet }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: isMobile ? 0.1 : 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: index % 2 === 0 ? 50 : -50 });
    }
  }, [inView, controls, index]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: index % 2 === 0 ? 50 : -50 }}
        animate={controls}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Card
          className="relative p-6 text-center border border-white/20 bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
          sx={{
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease-in-out',
            boxShadow: darkMode
              ? '0 4px 15px rgba(0, 255, 255, 0.1)'
              : '0 4px 15px rgba(0, 119, 255, 0.1)',
          }}
        >
          <div className="flex justify-center mb-4">{service.icon}</div>
          <CardContent>
            <Typography variant="h6" className="font-semibold">
              {service.title}
            </Typography>
            <Typography variant="body2" className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {service.desc}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default Services;