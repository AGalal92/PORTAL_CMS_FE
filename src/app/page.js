import dynamic from "next/dynamic";
import Header from "./components/Header"; // Header is usually needed immediately, so no lazy loading
import Footer from "./components/Footer"; // Footer is usually needed immediately, so no lazy loading

// Lazy load components
const Hero = dynamic(() => import("./components/Hero"), {
  loading: () => <p>Loading Hero...</p>,
});

const About = dynamic(() => import("./components/About"), {
  loading: () => <p>Loading About...</p>,
});

const Services = dynamic(() => import("./components/Services"), {
  loading: () => <p>Loading Services...</p>,
});

const Projects = dynamic(() => import("./components/Projects"), {
  loading: () => <p>Loading Projects...</p>,
});

const Team = dynamic(() => import("./components/Team"), {
  loading: () => <p>Loading Team...</p>,
});

const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <p>Loading Contact...</p>,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen max-w-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header is loaded immediately */}
      <Header />

      {/* Lazy loaded components */}
      <Hero />
      <About />
      <Services />
      <Projects />
      <Team />
      <Contact />

      {/* Footer is loaded immediately */}
      <Footer />
    </div>
  );
}