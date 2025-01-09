// import SectionTitle from "../Common/SectionTitle";
// import SingleFeature from "./SingleFeature";
// import featuresData from "./featuresData";

// const Features = () => {
//   return (
//     <>
//       <section id="features" className="py-16 md:py-20 lg:py-28">
//         <div className="container">
//           <SectionTitle
//             title="Main Features"
//             paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
//             center
//           />

//           <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
//             {featuresData.map((feature) => (
//               <SingleFeature key={feature.id} feature={feature} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Features;

import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";

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

  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          {/* SectionTitle with services data */}
          <SectionTitle
            title={services?.data?.[0]?.title || "Default Features Title"}
            paragraph={
              services?.data?.[0]?.description?.[0]?.children?.[0]?.text ||
              "Default description for the services."
            }
            center
          />

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {services.data.map((service) => (
              <SingleFeature
                key={service.id}
                feature={{
                  id: service.id,
                  title: service.title,
                  paragraph:
                    service.description?.[0]?.children?.[0]?.text ||
                    "Default service description.",
                  icon: service.icon?.[0], // Pass the first icon
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;

