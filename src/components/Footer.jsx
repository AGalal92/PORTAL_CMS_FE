import React from "react";
import { useLanguage } from "../App";
import { LinkedIn, Facebook, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { gaEvent } from "../analytics/gtag";

// Custom hook for screen size detection
const useScreen = () => {
  const [screenSize, setScreenSize] = React.useState({
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: window.innerWidth > 1024,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth <= 768,
        isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop: window.innerWidth > 1024,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

// Translation object
const translations = {
  en: {
    paragraph: "Legion Software provides innovative solutions for your business.",
    contactInfo: {
      phone: "Phone: +201115067610",
      email: "Email: info@legionagency.tech",
    },
    copyright:
      '© {year} <span style="font-weight: bold; color: #81a3bb;">Legion</span> Software. All Rights Reserved.',
    termsAndPolicies: "Terms and Policies",
    socials: [
      { label: "LinkedIn", icon: <LinkedIn />, href: "#" },
      { label: "Facebook", icon: <Facebook />, href: "#" },
      { label: "Twitter", icon: <Twitter />, href: "#" },
    ],
  },
  ar: {
    paragraph: "تقدم ليجيون للبرمجيات حلولًا مبتكرة لأعمالك.",
    contactInfo: {
      phone: "الهاتف: +201115067610",
      email: "البريد الإلكتروني: info@legionagency.tech",
    },
    copyright:
      '© {year} <span style="font-weight: bold; color: #81a3bb;">ليجيون</span> للبرمجيات. جميع الحقوق محفوظة.',
    termsAndPolicies: "الشروط والسياسات",
    socials: [
      { label: "لينكد إن", icon: <LinkedIn />, href: "#" },
      { label: "فيسبوك", icon: <Facebook />, href: "#" },
      { label: "تويتر", icon: <Twitter />, href: "#" },
    ],
  },
};

// Header links
const headerLinks = [
  { id: "home", path: "/#home", labelEn: "Home", labelAr: "الرئيسية" },
  { id: "about-us", path: "/about-us", labelEn: "About Us", labelAr: "من نحن" },
  { id: "projects", path: "/projects", labelEn: "Projects", labelAr: "المشاريع" },
  { id: "services", path: "/services", labelEn: "Services", labelAr: "الخدمات" },
  { id: "contact", path: "/contact", labelEn: "Contact Us", labelAr: "اتصل بنا" },
];

function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const { isMobile, isTablet, isDesktop } = useScreen();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "Var(--secondary-color)",
        color: "#FFFFFF",
        padding: isMobile ? "2rem 0" : "2.5rem 0",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          maxWidth: "1480px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: isMobile ? "1rem" : "1.5rem",
          paddingRight: isMobile ? "1rem" : "1.5rem",
        }}
      >
        {/* Main Footer Content */}
        {isMobile ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Logo and Paragraph Section */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <img
                src="/images/logoFooter.png"
                alt="Legion Logo"
                style={{
                  width: "10rem",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#81a3bb",
                  textAlign: "left",
                  marginLeft: "1rem",
                  flexGrow: 1,
                }}
              >
                {t.paragraph}
              </p>
            </div>

            {/* Pages and Contact Us Section */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              {/* Pages Section (Left on Mobile) */}
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "#81a3bb",
                  }}
                >
                  {language === "en" ? "Pages" : "الصفحات"}
                </h3>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    fontSize: "0.875rem",
                    textAlign: "left",
                  }}
                >
                  {headerLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        to={link.path}
                        onClick={() => gaEvent('footer_link_click', { 
                          page: link.id, 
                          label: language === "en" ? link.labelEn : link.labelAr 
                        })}
                        style={{
                          color: "#FFFFFF",
                          transition: "color 0.3s",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#60A5FA")}
                        onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
                      >
                        {language === "en" ? link.labelEn : link.labelAr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Us Section (Right on Mobile) */}
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "#81a3bb",
                  }}
                >
                  {language === "en" ? "Contact Us" : "اتصل بنا"}
                </h3>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#D1D5DB",
                    marginBottom: "1rem",
                    textAlign: "left",
                  }}
                >
                  <p>{t.contactInfo.phone}</p>
                  <p>{t.contactInfo.email}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  {t.socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      onClick={() => gaEvent('social_media_click', { 
                        platform: social.label, 
                        location: 'footer_mobile' 
                      })}
                      style={{
                        color: "#FFFFFF",
                        transition: "color 0.3s",
                      }}
                      title={social.label}
                      onMouseEnter={(e) => (e.target.style.color = "#60A5FA")}
                      onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
                    >
                      {React.cloneElement(social.icon, {
                        style: { fontSize: "28px" },
                      })}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            {/* Left Section: Logo and Paragraph */}
            <div
              style={{
                width: "33.33%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <img
                src="/images/logoFooter.png"
                alt="Legion Logo"
                style={{
                  width: isTablet ? "14rem" : "16rem",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#81a3bb",
                  padding: "0.75rem",
                  textAlign: "left",
                }}
              >
                {t.paragraph}
              </p>
            </div>

            {/* Pages Section */}
            <div
              style={{
                width: "33.33%",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  color: "#81a3bb",
                }}
              >
                {language === "en" ? "Pages" : "الصفحات"}
              </h3>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  fontSize: "1.125rem",
                  textAlign: "left",
                }}
              >
                {headerLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      onClick={() => gaEvent('footer_link_click', { 
                        page: link.id, 
                        label: language === "en" ? link.labelEn : link.labelAr 
                      })}
                      style={{
                        color: "#FFFFFF",
                        transition: "color 0.3s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#60A5FA")}
                      onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
                    >
                      {language === "en" ? link.labelEn : link.labelAr}
                    </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Contact Us Section */}
            <div
              style={{
                width: "33.33%",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  color: "#81a3bb",
                }}
              >
                {language === "en" ? "Contact Us" : "اتصل بنا"}
              </h3>
              <div
                style={{
                  fontSize: "1.125rem",
                  color: "#D1D5DB",
                  marginBottom: "1rem",
                  textAlign: "left",
                }}
              >
                <p>{t.contactInfo.phone}</p>
                <p>{t.contactInfo.email}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                }}
              >
                {t.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    onClick={() => gaEvent('social_media_click', { 
                      platform: social.label, 
                      location: 'footer_desktop' 
                    })}
                    style={{
                      color: "#FFFFFF",
                      transition: "color 0.3s",
                    }}
                    title={social.label}
                    onMouseEnter={(e) => (e.target.style.color = "#60A5FA")}
                    onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
                  >
                    {React.cloneElement(social.icon, {
                      style: { fontSize: "36px" },
                    })}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HR Line and Copyright */}
        <hr
          style={{
            margin: isMobile ? "2rem 0" : "2.5rem 0",
            borderColor: "var(--tertiary-color)",
            borderWidth: "1px",
          }}
        />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: isMobile ? "0.875rem" : "1.125rem",
              color: "#FFFFFF",
            }}
            dangerouslySetInnerHTML={{
              __html: t.copyright.replace("{year}", year),
            }}
          />
          <Link
            to="/terms-condition"
            onClick={() => gaEvent('footer_link_click', { 
              page: 'terms-condition', 
              label: t.termsAndPolicies 
            })}
            style={{
              fontSize: isMobile ? "0.875rem" : "1rem",
              color: "#FFFFFF",
              transition: "color 0.3s",
              textDecoration: "none",
              marginTop: "0.1rem",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#60A5FA")}
            onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
          >
            {t.termsAndPolicies}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;