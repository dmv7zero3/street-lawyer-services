// src/pages/Homepage/components/LonnySection/TitleBlock.tsx
import React, { forwardRef } from "react";

interface TitleBlockProps {
  className?: string;
}

const TitleBlock = forwardRef<HTMLHeadingElement, TitleBlockProps>(
  ({ className = "" }, ref) => {
    return (
      <h2
        ref={ref}
        className={`text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-sls-marble-200 mb-8 tracking-[0.05em] ${className}`}
        style={{
          textShadow: "0 0 10px rgba(248, 246, 243, 0.2)",
        }}
      >
        Meet{" "}
        <span
          className="text-sls-gold animate-glowPulse"
          style={{
            textShadow: "0 0 15px #d4af37, 0 0 30px #d4af37",
          }}
        >
          Lonny
        </span>
      </h2>
    );
  }
);

TitleBlock.displayName = "TitleBlock";

export default TitleBlock;
