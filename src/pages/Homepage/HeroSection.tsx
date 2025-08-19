// src/pages/Homepage/HeroSection.tsx
import React, { useEffect, useState } from "react";
import HeroBackground from "./components/HeroBackground";
import HeroLogo from "./components/HeroLogo";
import HeroContent from "./components/HeroContent";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background with brick wall and smoke effects */}
      <HeroBackground />

      {/* Hero Content */}
      <div
        className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Logo */}
        <HeroLogo />

        {/* Main Content */}
        <HeroContent />
      </div>
    </section>
  );
};

export default HeroSection;
