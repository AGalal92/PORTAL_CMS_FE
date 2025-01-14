import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import { fetchApi } from "@/utils/api";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
};

export default async function Home() {
  try {
    // Fetch the 'abouts' data from your API
    const abouts = await fetchApi("abouts");
    const services = await fetchApi("services");
    const works = await fetchApi("works");

    return (
      <>
        <ScrollUp />
        <section id="Home">
          <Intro /> {/* Add your intro component here */}
        </section>
        <section id="blog">
          <Blog works={works} />
        </section>
        <section id="hero">
          <Hero about={abouts} /> {/* Pass abouts data to the Hero component */}
        </section>
        <section id="video">
          <Video />
        </section>
        <section id="features">
          <Features services={services} />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </>
    );
    
  } catch (error) {
    console.error("Error fetching abouts data:", error);

    return (
      <>
        <p>Error loading data.</p>
      </>
    );
  }
}
