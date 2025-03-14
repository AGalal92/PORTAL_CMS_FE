
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "./App";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Technologies from "./components/Technologies";
import TeamProcess from "./components/TeamProcess";
import SmartSlider from "./components/SmartSlider";

function HomePage() {
    const location = useLocation();
    const { language } = useLanguage();
  
    useEffect(() => {
      const hash = location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);
  
    return (
      <>
        <section id="home" aria-label={language === "ar" ? "الصفحة الرئيسية" : "Home"}>
          <SmartSlider />
        </section>
        {/* <section id="home" aria-label={language === "ar" ? "الصفحة الرئيسية" : "Home"}>
          <Hero />
        </section> */}
        <section id="about" aria-label={language === "ar" ? "من نحن" : "About Us"}>
          <About />
        </section>
        <section id="services" aria-label={language === "ar" ? "الخدمات" : "Services"}>
          <Services />
        </section>
        <section id="projects" aria-label={language === "ar" ? "المشاريع" : "Projects"}>
          <Projects />
        </section>
          <section id="team-process" aria-label={language === "ar" ? "عملية الفريق" : "Team Process"}>
          <TeamProcess />
          <Technologies />
        </section>
        {/* <section id="team" aria-label={language === "ar" ? "الفريق" : "Team"}>
          <Team />
        </section> */}
        <section id="contact" aria-label={language === "ar" ? "اتصل بنا" : "Contact Us"}>
          <Contact />
        </section>
        {/* <Footer /> */}
      </>
    );
  }
  
  export default HomePage;