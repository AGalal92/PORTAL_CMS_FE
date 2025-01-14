"use client"; // Required to use hooks and client-side features

import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import Slider from "react-slick";

interface FeaturesProps {
  services: {
    data: Array<{
      id: number;
      title: string;
      slug: string;
      description: Array<{
        type: string;
        children: Array<{ type: string; text: string }>;
      }>;
      image: string[];
      icon: string[];
    }>;
  };
}

const Features = ({ services }: FeaturesProps) => {
  const sliderSettings = {
    dots: true,
    infinite: services.data.length > 1, // Only make it infinite if more than 1 item
    speed: 500,
    slidesToShow: Math.min(3, services.data.length), // Show the number of slides based on items
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, services.data.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(1, services.data.length),
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="slick-dots slick-thumb">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white"></div>
    ),
  };

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* Section Title */}
        <SectionTitle
          title={services?.data?.[0]?.title || "Default Features Title"}
          paragraph={
            services?.data?.[0]?.description?.[0]?.children?.[0]?.text ||
            "Default description for the services."
          }
          center
        />

        {/* Features Slider */}
        <Slider {...sliderSettings} className="mt-8">
          {services.data.map((service) => (
            <div key={service.id} className="px-4">
              <SingleFeature
                feature={{
                  id: service.id,
                  title: service.title,
                  paragraph:
                    service.description?.[0]?.children?.[0]?.text ||
                    "Default service description.",
                  icon: service.icon?.[0], // Pass the first icon
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// Custom Arrow Components for Slider
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="slick-arrow slick-next bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-400 dark:hover:bg-gray-600"
      aria-label="Next"
    >
      →
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="slick-arrow slick-prev bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-400 dark:hover:bg-gray-600"
      aria-label="Previous"
    >
      ←
    </button>
  );
};

export default Features;
