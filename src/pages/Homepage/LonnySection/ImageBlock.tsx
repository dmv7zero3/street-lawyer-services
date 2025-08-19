// src/pages/Homepage/components/LonnySection/ImageBlock.tsx
import React, { forwardRef } from "react";

interface ImageBlockProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageBlock = forwardRef<HTMLDivElement, ImageBlockProps>(
  ({ src, alt, className = "" }, ref) => {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {/* Glow effect behind image */}
        <div
          className="absolute inset-0 scale-110 blur-2xl opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at center, #d4af37, transparent)",
          }}
        />

        {/* Image container */}
        <div className="relative">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-w-lg mx-auto transition-transform duration-700 hover:scale-105"
            style={{
              filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))",
            }}
          />
        </div>
      </div>
    );
  }
);

ImageBlock.displayName = "ImageBlock";

export default ImageBlock;
