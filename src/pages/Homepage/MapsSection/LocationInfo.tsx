// src/pages/Homepage/components/MapsSection/LocationInfo.tsx
import React, { forwardRef } from "react";

interface LocationInfoProps {
  className?: string;
}

const LocationInfo = forwardRef<HTMLDivElement, LocationInfoProps>(
  ({ className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-sls-charcoal-900/50 backdrop-blur-sm border border-sls-gold/20 rounded-xl p-8 ${className}`}
      >
        {/* Address */}
        <div className="mb-6">
          <h3
            className="text-2xl font-bold font-heading text-sls-gold mb-3 tracking-[0.05em]"
            style={{
              textShadow: "0 0 8px #d4af37",
            }}
          >
            Address
          </h3>
          <p
            className="text-lg text-sls-marble-300 tracking-[0.02em]"
            style={{
              textShadow: "0 0 5px rgba(248, 246, 243, 0.1)",
            }}
          >
            3400 Connecticut Avenue NW
            <br />
            Washington, DC 20008
          </p>
        </div>

        {/* Hours */}
        <div className="mb-6">
          <h3
            className="text-2xl font-bold font-heading text-sls-gold mb-3 tracking-[0.05em]"
            style={{
              textShadow: "0 0 8px #d4af37",
            }}
          >
            Hours
          </h3>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-sls-gold animate-pulse"></div>
              <span className="text-sls-marble-300">Hours Coming Soon</span>
            </div>
            <p className="mt-2 text-sm text-sls-marble-400">
              We will announce our operating hours closer to our opening.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3
            className="text-2xl font-bold font-heading text-sls-gold mb-3 tracking-[0.05em]"
            style={{
              textShadow: "0 0 8px #d4af37",
            }}
          >
            Contact
          </h3>
          <div className="space-y-2">
            {/* <p className="text-lg text-sls-marble-300">
              <span className="text-sls-gold">Phone:</span> (202) 555-HERB
            </p> */}
            <p className="text-lg text-sls-marble-300">
              <span className="text-sls-gold">Email:</span>{" "}
              info@streetlawyerservices.com
            </p>
          </div>
        </div>

        {/* Directions Button */}
        <div className="mt-8">
          <a
            href="https://maps.google.com/maps?q=3400+Connecticut+Avenue+NW,+Washington,+DC+20008"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 font-semibold tracking-wider uppercase transition-all duration-300 rounded-lg bg-sls-gold text-sls-charcoal-950 hover:bg-sls-gold/90 group"
            style={{
              boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
            }}
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    );
  }
);

LocationInfo.displayName = "LocationInfo";

export default LocationInfo;
