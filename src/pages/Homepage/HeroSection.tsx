import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-sls-charcoal-950">
      {/* Animated Smoke Background */}
      <div className="absolute inset-0 z-0">
        {/* Smoke GIF background layer */}
        <img
          src="/images/gif/smoke.gif"
          alt="smoke background"
          className="absolute inset-0 object-cover w-[100%] h-[100%] pointer-events-none select-none opacity-40"
          style={{ zIndex: 0 }}
        />

        {/* Base gradient background */}
        <div className="absolute inset-0 " />

        {/* Animated smoke layers */}
        <div className="absolute inset-0 opacity-60">
          {/* Smoke layer 1 */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-sls-charcoal-700/30 to-transparent animate-pulse"
            style={{
              background:
                "radial-gradient(ellipse 800px 600px at 20% 80%, rgba(109, 109, 109, 0.15) 0%, transparent 50%)",
              animation: "smokeFloat1 20s ease-in-out infinite",
            }}
          />

          {/* Smoke layer 2 */}
          <div
            className="absolute top-0 right-0 w-full h-full opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 600px 800px at 80% 20%, rgba(79, 79, 79, 0.12) 0%, transparent 60%)",
              animation: "smokeFloat2 25s ease-in-out infinite reverse",
            }}
          />

          {/* Smoke layer 3 */}
          <div
            className="absolute bottom-0 w-full h-full transform -translate-x-1/2 left-1/2 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 1000px 400px at 50% 100%, rgba(61, 61, 61, 0.1) 0%, transparent 70%)",
              animation: "smokeRise 30s ease-in-out infinite",
            }}
          />

          {/* Additional floating particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-sls-charcoal-600/20 animate-ping"
                style={{
                  width: Math.random() * 4 + 2 + "px",
                  height: Math.random() * 4 + 2 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 5 + "s",
                  animationDuration: Math.random() * 3 + 2 + "s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-sls-charcoal-950/60 via-transparent to-sls-charcoal-950/30" />
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Logo */}
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

        {/* Main Heading */}
        <h1 className="mb-6 font-bold leading-none text-hero font-heading text-sls-marble-200">
          <span className="block mb-2">STREET LAWYER</span>
          <span className="block text-sls-gold-950 animate-glowPulse">
            SERVICES
          </span>
        </h1>

        {/* Tagline */}
        <p className="max-w-3xl mx-auto mb-4 font-light leading-relaxed text-body-lg sm:text-xl lg:text-2xl text-sls-marble-300">
          Washington DC's Premier Cannabis Dispensary
        </p>

        <p className="max-w-2xl mx-auto mb-12 text-body sm:text-lg text-sls-marble-400">
          Premium products • Expert guidance • Legendary service since day one
        </p>

        {/* Call to Action Buttons */}
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

        {/* Scroll Indicator */}
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
      </div>
    </section>
  );
};

export default HeroSection;
