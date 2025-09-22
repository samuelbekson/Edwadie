import React, { useState } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderSrc = "/placeholder.svg",
  className = "",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`relative block overflow-hidden ${className}`} style={{ display: "inline-block" }}>
      {/* Placeholder (blurred) */}
      <img
        src={placeholderSrc}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 blur-sm ${loaded ? "opacity-0" : "opacity-100"}`}
        alt=""
        tabIndex={-1}
      />
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`relative w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </span>
  );
};
