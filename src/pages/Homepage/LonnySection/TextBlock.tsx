// src/pages/Homepage/components/LonnySection/TextBlock.tsx
import React, { forwardRef } from "react";

interface TextBlockProps {
  children: React.ReactNode;
  variant?: "default" | "highlight";
  className?: string;
}

const TextBlock = forwardRef<HTMLParagraphElement, TextBlockProps>(
  ({ children, variant = "default", className = "" }, ref) => {
    const baseClasses = "tracking-[0.02em]";

    const variantClasses = {
      default: "text-lg lg:text-xl text-sls-marble-300 leading-relaxed",
      highlight: "text-sls-gold font-semibold tracking-[0.05em]",
    };

    const textShadowStyle = {
      default: { textShadow: "0 0 5px rgba(248, 246, 243, 0.1)" },
      highlight: { textShadow: "0 0 8px #d4af37" },
    };

    return (
      <p
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={textShadowStyle[variant]}
      >
        {children}
      </p>
    );
  }
);

TextBlock.displayName = "TextBlock";

export default TextBlock;
