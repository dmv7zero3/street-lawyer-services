// src/components/Header/DesktopHeader/index.tsx
import React from "react";
import { Link } from "react-router-dom";

const DesktopHeader: React.FC = () => {
  return (
    <header className="z-40 hidden w-full bg-transparent lg:block">
      <div className="relative flex items-center justify-between w-full px-8 py-8 mx-auto max-w-7xl">
        {/* Logo/Brand Name */}
        <div className="flex items-center">
          <Link to="/" className="block group">
            <h1
              className="text-xl font-bold tracking-[0.2em] uppercase text-sls-gold animate-glowPulse transition-all duration-500 group-hover:tracking-[0.25em]"
              style={{
                textShadow:
                  "0 0 15px #d4af37, 0 0 30px #d4af37, 0 0 45px #d4af37, 0 0 60px #d4af37",
              }}
            >
              STREET LAWYER SERVICES
            </h1>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-16">
          {/* <Link to="/about" className="relative group">
            <span
              className="font-semibold tracking-[0.15em] uppercase text-sls-marble-300 transition-all duration-500 group-hover:text-sls-gold group-hover:tracking-[0.2em]"
              style={{
                textShadow: "0 0 0px transparent",
                transition: "all 0.5s ease, text-shadow 0.5s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow =
                  "0 0 10px #d4af37, 0 0 20px #d4af37, 0 0 30px #d4af37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "0 0 0px transparent";
              }}
            >
              LONNY THE STREET LAWYER
            </span>

            <div
              className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-sls-gold to-transparent transition-all duration-700 group-hover:w-full group-hover:left-0 opacity-0 group-hover:opacity-100"
              style={{
                boxShadow: "0 0 8px #d4af37",
              }}
            ></div>
          </Link> */}

          {/* Contact Link */}
          {/* <Link to="/contact" className="relative group">
            <span
              className=" font-bold tracking-[0.15em] uppercase text-sls-marble-200 transition-all duration-500 group-hover:text-sls-gold group-hover:tracking-[0.2em] group-hover:scale-105"
              style={{
                textShadow: "0 0 5px rgba(212, 175, 55, 0.3)",
                transition:
                  "all 0.5s ease, text-shadow 0.5s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow =
                  "0 0 15px #d4af37, 0 0 25px #d4af37, 0 0 35px #d4af37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow =
                  "0 0 5px rgba(212, 175, 55, 0.3)";
              }}
            >
              CONTACT
            </span>

            <div
              className="absolute bottom-0 w-0 h-1 transition-all duration-700 opacity-0 left-1/2 bg-sls-gold group-hover:w-full group-hover:left-0 group-hover:opacity-100"
              style={{
                boxShadow: "0 0 12px #d4af37, 0 0 20px #d4af37",
                background:
                  "linear-gradient(90deg, transparent, #d4af37, transparent)",
              }}
            ></div>
          </Link> */}

          {/* Coming Soon */}
          <div className="relative">
            <span
              className=" font-semibold tracking-[0.15em] uppercase text-sls-gold/60 animate-pulse"
              style={{
                textShadow: "0 0 5px #d4af37, 0 0 10px #d4af37",
              }}
            >
              COMING SOON
            </span>

            {/* Subtle ambient glow */}
            <div
              className="absolute inset-0 animate-glowPulse opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 100px 20px at center, rgba(212, 175, 55, 0.2), transparent)",
              }}
            ></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
