// src/pages/Homepage/components/ScrollIndicator.tsx
import React from "react";

const ScrollIndicator: React.FC = () => {
  return (
    <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
      <div className="flex flex-col items-center text-sls-marble-400">
        <span className="mb-2 tracking-wider uppercase text-body-sm">
          Scroll
        </span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollIndicator;
