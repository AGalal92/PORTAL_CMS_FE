import React from 'react';
import { useLanguage } from '../App'; // Import useLanguage

// Translation object
const translations = {
  en: {
    copyright: '© {year} <span className="font-bold text-yellow-500">Legion</span> Software. All Rights Reserved.',
    socials: [
      { label: 'LinkedIn', icon: '🔗', href: '#' },
      { label: 'Facebook', icon: '📘', href: '#' },
      { label: 'Twitter', icon: '🐦', href: '#' },
    ],
  },
  ar: {
    copyright: '© {year} <span className="font-bold text-yellow-500">ليجيون</span> للبرمجيات. جميع الحقوق محفوظة.',
    socials: [
      { label: 'لينكد إن', icon: '🔗', href: '#' },
      { label: 'فيسبوك', icon: '📘', href: '#' },
      { label: 'تويتر', icon: '🐦', href: '#' },
    ],
  },
};

function Footer() {
  const { language } = useLanguage(); // Access language from context
  const t = translations[language]; // Select translations based on language
  const year = new Date().getFullYear(); // Get current year

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: t.copyright.replace('{year}', year) }}
        />
        <div className="flex space-x-4">
          {t.socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="hover:text-blue-400"
            >
              {/* {social.icon} {social.label} */}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;