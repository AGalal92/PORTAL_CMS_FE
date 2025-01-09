"use client"; // Required to use hooks and client-side features

import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";
import Slider from "react-slick";
type Work = {
  id: number;
  name: string;
  slug: string;
  description: { type: string; children: { type: string; text: string }[] }[];
  image: string[];
  link: { id: number; url: string }[];
};

type Works = {
  data: Work[];
};
const Blog = ({ works }: { works: Works }) => {
    // Extract the `data` array from `works`
    const { data } = works;

    if (!data || data.length === 0) {
      console.error("The 'works.data' array is undefined or empty.");
      return <div>No works available</div>;
    }
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="slick-dots slick-thumb   ">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white"></div>
    ),
  };

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Projects"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        {/* Blog Slider */}
        <Slider {...sliderSettings} className="mt-8">
          {data.map((work: any) => (
            <div key={work.id} className="px-4">
              <SingleBlog work={work} />
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

export default Blog;
