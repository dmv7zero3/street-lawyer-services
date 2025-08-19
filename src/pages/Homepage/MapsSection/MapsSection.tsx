// src/pages/Homepage/components/MapsSection/SectionTitle.tsx
import React, { forwardRef } from "react";

interface SectionTitleProps {
  className?: string;
}

const SectionTitle = forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ className = "" }, ref) => {
    return (
      <div ref={ref} className={`text-center mb-12 ${className}`}>
        <h2
          className="text-4xl lg:text-5xl font-bold font-heading text-sls-marble-200 mb-4 tracking-[0.05em]"
          style={{
            textShadow: "0 0 10px rgba(248, 246, 243, 0.2)",
          }}
        >
          Visit{" "}
          <span
            className="text-sls-gold animate-glowPulse"
            style={{
              textShadow: "0 0 15px #d4af37, 0 0 30px #d4af37",
            }}
          >
            Street Lawyer Services
          </span>
        </h2>

        <p
          className="text-xl text-sls-marble-300 tracking-[0.02em] max-w-2xl mx-auto"
          style={{
            textShadow: "0 0 5px rgba(248, 246, 243, 0.1)",
          }}
        >
          Located in the heart of Washington DC's Connecticut Avenue corridor
        </p>
      </div>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
