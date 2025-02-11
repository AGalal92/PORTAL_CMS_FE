"use client";
import { useState } from "react";
import { useTheme } from "../layout";
import { TextField, Button, Container, Typography, Box, Grid } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Contact() {
  const { darkMode } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      toast.success(data.success);
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error(data.error);
    }
  };

  return (
    <section
      id="contact"
      className={`py-16 transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`}
    >
      <div className="container mx-auto px-6">
        {/* ✅ Left-aligned Title with Underline */}
        <div className="mb-8">
          <p className="text-xs uppercase font-light tracking-widest relative inline-block">
            Contact Us
            <span className="absolute left-24 top-1/2 w-24 h-[2px] bg-yellow-500"></span>
          </p>
          <h2 className={`text-5xl font-extrabold text-left font-raleway ${darkMode ? "text-white" : "text-black"}`}>
            WE WILL REACH YOU
          </h2>
        </div>

        {/* ✅ Form with Two Columns */}
        <Box component="form" className="space-y-6" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <FormField label="Your Name" name="name" value={form.name} handleChange={handleChange} darkMode={darkMode} />
            <FormField label="Subject" name="subject" value={form.subject} handleChange={handleChange} darkMode={darkMode} />
            <FormField label="Your Email" name="email" type="email" value={form.email} handleChange={handleChange} darkMode={darkMode} fullWidth />
            <FormField label="Your Message" name="message" multiline rows={5} value={form.message} handleChange={handleChange} darkMode={darkMode} fullWidth />
          </Grid>

          {/* ✅ Submit Button with Motion */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#FFC107", // Yellow color
                color: "#ffffff",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#FFA000", // Slightly darker yellow on hover
                },
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </Box>
      </div>

      {/* ✅ Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}

// ✅ Separate Component for Animated Input Fields
const FormField = ({ label, name, value, handleChange, darkMode, type = "text", multiline = false, rows, fullWidth = false }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <Grid item xs={12} sm={fullWidth ? 12 : 6}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <TextField
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
            background: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
              },
              "&:hover fieldset": {
                borderColor: "#FFC107",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFC107",
              },
            },
          }}
        />
      </motion.div>
    </Grid>
  );
};
