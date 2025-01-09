import React from "react";
import Image from "next/image";

interface ImageComponentProps {
    url: string; // The relative URL for the image (e.g., "/uploads/image.jpg")
    alt?: string; // Alt text for the image
    width?: number; // Optional width
    height?: number; // Optional height
    className?: string; // Optional CSS class
}

const BASE_URL = "http://localhost:1337"; // Define the base URL for the images

const ImageComponent: React.FC<ImageComponentProps> = ({
    url,
    alt = "Image",
    width = 400,
    height = 300,
    className = "",
}) => {
    // Construct the full URL by combining the base URL and the relative path
    const fullImageUrl = `${BASE_URL}${url}`;

    return (
        <div className={`relative ${className}`}>
            <Image
                src={fullImageUrl}
                alt={alt}
                width={width}
                height={height}
                layout="intrinsic" // Use intrinsic layout to respect width and height
                objectFit="cover" // Ensure the image fits properly
                priority // Optimize for LCP if it's above the fold
            />
        </div>
    );
};

export default ImageComponent;
