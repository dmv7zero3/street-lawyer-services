// src/pages/Homepage/components/LonnySection/Background.tsx
import React from "react";

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/background/bricks.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sls-charcoal-950/90 via-sls-charcoal-950/70 to-sls-charcoal-950/90" />
    </div>
  );
};

export default Background;
