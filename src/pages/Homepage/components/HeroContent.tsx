// src/pages/Homepage/components/HeroContent.tsx
import React from "react";

const HeroContent: React.FC = () => {
  return (
    <>
      {/* Main Heading */}
      <h1 className="mb-8 font-bold leading-none text-hero font-heading text-sls-marble-200">
        <span
          className="block mb-3 tracking-[0.1em] transition-all duration-700"
          style={{
            textShadow: "0 0 8px rgba(248, 246, 243, 0.3)",
          }}
        >
          STREET LAWYER
        </span>
        <span
          className="block text-sls-gold animate-glowPulse tracking-[0.15em]"
          style={{
            textShadow: "0 0 20px #d4af37, 0 0 40px #d4af37, 0 0 60px #d4af37",
          }}
        >
          SERVICES
        </span>
      </h1>

      {/* Premier Tagline */}
      <div className="mb-6">
        <p
          className="max-w-4xl mx-auto font-light leading-relaxed text-body-lg sm:text-xl lg:text-2xl text-sls-marble-300 tracking-[0.05em]"
          style={{
            textShadow: "0 0 5px rgba(248, 246, 243, 0.2)",
          }}
        >
          Washington DC's Premier Cannabis Dispensary
        </p>
      </div>

      {/* Address with Enhanced Styling */}
      <div className="mb-12">
        <p
          className="max-w-2xl mx-auto text-body sm:text-lg text-sls-marble-400 tracking-[0.08em] font-light"
          style={{
            textShadow: "0 0 3px rgba(248, 246, 243, 0.15)",
          }}
        >
          <span className="inline-block">3400 Connecticut Avenue NW</span>
          <span className="hidden mx-3 sm:inline-block text-sls-gold/40">
            •
          </span>
          <span className="inline-block">Washington, DC 20008</span>
        </p>
      </div>

      {/* Premium Service Highlights */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          <span
            className="text-sm sm:text-base font-medium text-sls-marble-400 tracking-[0.1em] uppercase transition-all duration-300 hover:text-sls-gold"
            style={{
              textShadow: "0 0 2px rgba(248, 246, 243, 0.1)",
            }}
          >
            Premium Products
          </span>

          <div className="hidden w-1 h-1 rounded-full bg-sls-gold animate-pulse sm:inline-block"></div>

          <span
            className="text-sm sm:text-base font-medium text-sls-marble-400 tracking-[0.1em] uppercase transition-all duration-300 hover:text-sls-gold"
            style={{
              textShadow: "0 0 2px rgba(248, 246, 243, 0.1)",
            }}
          >
            Cannabis Dispensary
          </span>

          <div className="hidden w-1 h-1 rounded-full bg-sls-gold animate-pulse sm:inline-block"></div>

          <span
            className="text-sm sm:text-base font-medium text-sls-marble-400 tracking-[0.1em] uppercase transition-all duration-300 hover:text-sls-gold"
            style={{
              textShadow: "0 0 2px rgba(248, 246, 243, 0.1)",
            }}
          >
            Legendary Service
          </span>
        </div>
      </div>
    </>
  );
};

export default HeroContent;
