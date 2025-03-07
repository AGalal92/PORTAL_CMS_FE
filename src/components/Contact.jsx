import React, { useState } from 'react';
import { useTheme, useLanguage } from '../App'; // Import useLanguage
import { TextField, Button, Grid } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScreenSize } from '../hooks/useScreenSize';
import emailjs from 'emailjs-com';

// Translation object
const translations = {
  en: {
    contactUs: 'Contact Us',
    weWillReachYou: 'WE WILL REACH YOU',
    formFields: {
      name: 'Your Name',
      subject: 'Subject',
      email: 'Your Email',
      message: 'Your Message',
    },
    sendMessage: 'Send Message',
    sending: 'Sending...',
    successMessage: 'Message sent successfully!',
    errorMessage: 'Failed to send message.',
  },
  ar: {
    contactUs: 'اتصل بنا',
    weWillReachYou: 'سنتواصل معك',
    formFields: {
      name: 'اسمك',
      subject: 'الموضوع',
      email: 'بريدك الإلكتروني',
      message: 'رسالتك',
    },
    sendMessage: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال...',
    successMessage: 'تم إرسال الرسالة بنجاح!',
    errorMessage: 'فشل في إرسال الرسالة.',
  },
};

function Contact() {
  const { darkMode } = useTheme();
  const { language } = useLanguage(); // Access language from context
  const t = translations[language]; // Select translations based on language
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { isMobile, isTablet } = useScreenSize();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        'service_84gh9zo', // Replace with your EmailJS Service ID
        'template_7vmmrtk', // Replace with your EmailJS Template ID
        {
          to_name: language === 'en' ? 'Legion Agency' : 'وكالة ليجيون',
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        '44ImNqv1CQtTUBhkg' // Replace with your EmailJS Public Key
      );

      toast.success(t.successMessage);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(t.errorMessage);
      console.error('EmailJS Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-16 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'} // Set direction based on language
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned Title with Underline */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            {t.contactUs}
            <span
              className={`absolute top-1/2 w-24 h-[2px] bg-yellow-500 ${
                language === 'ar' ? 'right-20' : 'left-20'
              }`} // Adjust underline position based on language
            ></span>
                      </p>
                      <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${
              language === 'ar' ? 'text-right' : 'text-left'
            } font-raleway ${darkMode ? 'text-white' : 'text-black'}`} // Adjust text alignment
          > 
                     {t.weWillReachYou}
          </h2>
        </div>

        {/* Form with Two Columns */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <FormField
              label={t.formFields.name}
              name="name"
              value={form.name}
              handleChange={handleChange}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
            />
            <FormField
              label={t.formFields.subject}
              name="subject"
              value={form.subject}
              handleChange={handleChange}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
            />
            <FormField
              label={t.formFields.email}
              name="email"
              type="email"
              value={form.email}
              handleChange={handleChange}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
              fullWidth
            />
            <FormField
              label={t.formFields.message}
              name="message"
              multiline
              rows={isMobile ? 3 : 5}
              value={form.message}
              handleChange={handleChange}
              darkMode={darkMode}
              isMobile={isMobile}
              isTablet={isTablet}
              fullWidth
            />
          </Grid>

          {/* Submit Button with Motion */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Button
              title={t.sendMessage}
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: '#FFC107',
                color: '#ffffff',
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'none',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#FFA000',
                },
              }}
            >
              {loading ? t.sending : t.sendMessage}
            </Button>
          </motion.div>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={language === 'ar'} // Enable RTL for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
    </section>
  );
}

const FormField = ({
  label,
  name,
  value,
  handleChange,
  darkMode,
  type = 'text',
  multiline = false,
  rows,
  fullWidth = false,
  isMobile,
  isTablet,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: isMobile ? 0.1 : 0.3 });

  return (
    <Grid item xs={12} sm={fullWidth ? 12 : 6}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <TextField
          id={name}
          fullWidth
          label={label}
          variant="outlined"
          required
          name={name}
          type={type}
          multiline={multiline}
          rows={rows}
          value={value}
          onChange={handleChange}
          sx={{
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            transition: 'all 0.3s ease-in-out',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: '#FFC107',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFC107',
              },
            },
          }}
        />
      </motion.div>
    </Grid>
  );
};

export default Contact;