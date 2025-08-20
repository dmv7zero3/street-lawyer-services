// src/components/BricksBackground.tsx
import React from "react";

interface BricksBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const BricksBackground: React.FC<BricksBackgroundProps> = ({
  className = "",
  children,
  style,
}) => {
  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        backgroundImage: "url('/images/background/bricks.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        borderRadius: "0.75rem", // rounded-xl
        boxShadow:
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)", // shadow-lg
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default BricksBackground;
