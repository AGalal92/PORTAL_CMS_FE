import ImageComponent from "@/components/Image/ImageComponent"; // Assuming you have ImageComponent
import Link from "next/link";

const SingleBlog = ({ work }: { work: any }) => {
  const { name, slug, description, image, link } = work;

  return (
    <div className="card bg-white dark:bg-dark w-96 shadow-xl dark:text-white transition-colors duration-300 h-[450px] flex flex-col justify-between">
      {/* Image Section */}
      <figure className="relative h-[50%]">
        <Link href={`/blog-details/${slug}`}>
          <ImageComponent
            url={image[0]} // Using the first image from the image array
            alt={`${name} Image`}
            width={384}
            height={256}
            className="rounded-t-lg object-cover w-full h-full"
          />
        </Link>
      </figure>

      {/* Card Body */}
      <div className="card-body h-[50%] overflow-hidden p-4 flex flex-col justify-between">
        <h2 className="card-title text-gray-900 dark:text-white">{name}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
          {description?.[0]?.children?.[0]?.text || "No description available"}
        </p>
      </div>

      {/* Footer Section */}
      <div className="card-footer h-[10%] p-4 flex flex-wrap gap-2 justify-start border-t border-gray-200 dark:border-gray-700 overflow-hidden">
        {link.map((l: any) => (
          <Link
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="badge badge-outline text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-xs"
          >
            {l.url}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SingleBlog;
