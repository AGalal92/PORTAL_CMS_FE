import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
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
        <Hero about={abouts} /> {/* Pass abouts data to the Hero component */}
        <Features services={services} />
        <Video />
        {/* <Brands /> */}
        {/* <AboutSectionOne /> */}
        {/* <AboutSectionTwo /> */}
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <Blog works={works} />
        <Contact />
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
