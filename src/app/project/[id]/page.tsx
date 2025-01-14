"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import { fetchApi } from "@/utils/api"; // Use your axios-based fetchApi
import ImageComponent from "@/components/Image/ImageComponent";

const BlogDetailsPage = () => {
    const { id } = useParams(); // Extract `id` from the route
    const [blog, setBlog] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchBlogDetails = async () => {
                try {
                    // Fetch all works and find the one by `id`
                    const response = await fetchApi("works"); // Fetch all works
                    const work = response.data.find((item: any) => item.id.toString() === id);

                    if (!work) {
                        throw new Error(`Blog with ID ${id} not found.`);
                    }

                    setBlog(work);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchBlogDetails();
        }
    }, [id]);

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                Error: {error}
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-20">
                No blog data found for the given ID.
            </div>
        );
    }

    return (
        <section className="pb-[120px] pt-[150px]">
            <div>
                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-8/12">
                        <div>
                            <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                                {blog.name}
                            </h2>
                            <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                                <div className="flex flex-wrap items-center">
                                    <div className="mb-5 mr-10 flex items-center">
                                        <div className="mr-4">
                                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                                {blog.image?.[0] && (
                                                    <Image
                                                        src={`http://localhost:1337${blog.image[0]}`}
                                                        alt="Author Image"
                                                        width={40}
                                                        height={40}
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <span className="mb-1 text-base font-medium text-body-color">
                                                By <span>{blog.name}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-5 flex items-center">
                                        <p className="text-base font-medium text-body-color">
                                            Published:{" "}
                                            <span className="text-gray-500">
                                                {new Date(blog.publishedAt).toDateString()}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="mb-10 text-base font-medium leading-relaxed text-body-color">
                                    {blog.description?.[0]?.children?.[0]?.text ||
                                        "No description available"}
                                </p>
                                {blog.project_image?.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
                                        {blog.project_image?.map((image: string, index: number) => (
                                            <div
                                                key={index}
                                                className="relative overflow-hidden rounded-xl"
                                            >
                                                <ImageComponent
                                                    url={image}
                                                    alt={`Project Image ${index + 1}`}
                                                    width={1000} // Increased width
                                                    height={600} // Increased height
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                )}
                                <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white">
                                    Related Links
                                </h3>
                                <ul className="mb-10 list-inside list-disc text-body-color">
                                    {blog.link?.map((l: any) => (
                                        <li key={l.id}>
                                            <a
                                                href={l.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary underline"
                                            >
                                                <TagButton text={l.url} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="items-center justify-between sm:flex">
                                    <div className="mb-5">
                                        <h4 className="mb-3 text-sm font-medium text-body-color">
                                            Popular Tags:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {blog.tag?.map((l: any) => (
                                                <TagButton key={l.id} text={l.tag} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                                            Share this post :
                                        </h5>
                                        <div className="flex items-center sm:justify-end">
                                            <SharePost />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetailsPage;
