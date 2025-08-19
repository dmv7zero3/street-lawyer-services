// src/components/Header/MobileHeader/index.tsx

import React from "react";
import { Link } from "react-router-dom";

/**
 * Main mobile header component for Street Lawyer Services
 * Renders the mobile navigation bar with logo and coming soon indicator
 */
const MobileHeader: React.FC = () => {
  return (
    <header className="relative z-50 block bg-transparent lg:hidden">
      <div className="relative flex items-center justify-between px-4 py-4 mx-4">
        {/* Street Lawyer Services Logo on left */}
        <Link to="/" className="flex items-center group">
          <h1
            className="text-lg font-bold tracking-[0.15em] uppercase text-sls-gold animate-glowPulse transition-all duration-300 group-hover:tracking-[0.2em]"
            style={{
              textShadow:
                "0 0 10px #d4af37, 0 0 20px #d4af37, 0 0 30px #d4af37",
            }}
          >
            STREET LAWYER
          </h1>
        </Link>

        {/* Coming Soon Pulse */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-semibold tracking-[0.1em] uppercase text-sls-gold/70 animate-glow-pulse"
              style={{
                textShadow: "0 0 5px #d4af37, 0 0 10px #d4af37",
              }}
            >
              Coming Soon
            </span>
          </div>

          {/* Subtle ambient glow */}
          <div
            className="absolute inset-0 animate-glowPulse opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 80px 15px at center, rgba(212, 175, 55, 0.3), transparent)",
            }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
