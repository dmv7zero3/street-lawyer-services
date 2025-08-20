// src/pages/Homepage/components/HeroBackground.tsx
import React from "react";

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Brick Wall Background */}
      <img
        src="/images/background/bricks.jpg"
        alt="brick wall background"
        className="absolute inset-0 object-cover w-full h-full pointer-events-none select-none opacity-30"
        style={{ zIndex: 0 }}
      />

      {/* Smoke GIF background layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-40"
        style={{
          zIndex: 1,
          backgroundImage: "url(/images/gif/smoke.gif)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Base gradient background */}
      <div className="absolute inset-0" style={{ zIndex: 2 }} />

      {/* Animated smoke layers */}
      <div className="absolute inset-0 opacity-60" style={{ zIndex: 3 }}>
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
      <div
        className="absolute inset-0 bg-gradient-to-t from-sls-charcoal-950/60 via-transparent to-sls-charcoal-950/30"
        style={{ zIndex: 4 }}
      />
    </div>
  );
};

export default HeroBackground;
