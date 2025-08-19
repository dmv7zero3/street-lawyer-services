// src/pages/Homepage/components/HeroLogo.tsx
import React from "react";

const HeroLogo: React.FC = () => {
  return (
    <div className="mb-8 animate-scaleIn">
      <div className="relative w-48 h-48 mx-auto sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
        {/* Glow effect behind logo */}
        <div className="absolute inset-0 scale-110 rounded-full bg-sls-gold-950/30 blur-xl animate-pulse" />

        {/* Logo container */}
        <div className="relative w-full h-full overflow-hidden border-4 rounded-full shadow-2xl border-sls-gold-950/50">
          <img
            src="/images/logo/street-lawyer-services-logo.jpg"
            alt="Street Lawyer Services"
            className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroLogo;
