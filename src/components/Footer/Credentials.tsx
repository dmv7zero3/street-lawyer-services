// src/components/Footer/Credentials.tsx
import React from "react";

const Credentials: React.FC = () => {
  return (
    <div className="pt-6 border-t border-sls-gold/20">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Copyright */}
        <div className="text-sm text-sls-marble-400">
          <p>© 2025 Street Lawyer Services. All rights reserved.</p>
        </div>

        {/* Developer Credit */}
        <div className="text-sm text-sls-marble-400">
          <p>
            Website design from{" "}
            <a
              href="https://www.marketbrewer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sls-gold transition-all duration-300 hover:tracking-[0.1em]"
              style={{
                textShadow: "0 0 5px rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease, text-shadow 0.3s ease",
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
              MarketBrewer
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
