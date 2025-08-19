// src/pages/Homepage/components/HeroCTA.tsx
import React from "react";

const HeroCTA: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <button className="relative overflow-hidden btn-primary group">
        <span className="relative z-10 flex items-center gap-2">
          Shop Now
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </button>

      <button className="btn-secondary group">
        <span className="flex items-center gap-2">
          Learn More
          <svg
            className="w-5 h-5 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default HeroCTA;
