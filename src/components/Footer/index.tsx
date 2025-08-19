// src/components/Footer/index.tsx
import React from "react";
import { Link } from "react-router-dom";
import Credentials from "./Credentials";

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t bg-sls-charcoal-950 border-sls-gold/20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/images/background/bricks.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sls-charcoal-950/95 via-sls-charcoal-950/90 to-sls-charcoal-950/95" />
      </div>

      <div className="relative z-10 px-8 py-12 mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid gap-8 mb-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="block group">
              <h3
                className="text-2xl font-bold font-heading text-sls-gold mb-4 tracking-[0.1em] group-hover:tracking-[0.15em] transition-all duration-300"
                style={{
                  textShadow: "0 0 10px #d4af37, 0 0 20px #d4af37",
                }}
              >
                STREET LAWYER SERVICES
              </h3>
            </Link>
            <p
              className="leading-relaxed text-sls-marble-400"
              style={{
                textShadow: "0 0 3px rgba(248, 246, 243, 0.1)",
              }}
            >
              Washington DC's premier cannabis dispensary, coming soon to
              Connecticut Avenue.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4
              className="text-lg font-bold font-heading text-sls-gold mb-4 tracking-[0.05em]"
              style={{
                textShadow: "0 0 8px #d4af37",
              }}
            >
              Contact
            </h4>
            <div className="space-y-2 text-sls-marble-400">
              <p>3400 Connecticut Avenue NW</p>
              <p>Washington, DC 20008</p>
              <p className="mt-4">
                <span className="text-sls-gold">Opening:</span> Fall 2025
              </p>
            </div>
          </div>

          {/* Social & Links */}
          <div className="md:col-span-1">
            <h4
              className="text-lg font-bold font-heading text-sls-gold mb-4 tracking-[0.05em]"
              style={{
                textShadow: "0 0 8px #d4af37",
              }}
            >
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/streetlawyerservices"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-300 text-sls-marble-400 hover:text-sls-gold group"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>

              <a
                href="https://dc101.iheart.com/content/2018-01-16-lonny-the-street-lawyer/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 text-sls-marble-400 hover:text-sls-gold"
              >
                <span className="text-sls-gold">Radio:</span> DC101 "Lonny the
                Street Lawyer"
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <Credentials />
      </div>
    </footer>
  );
};

export default Footer;
