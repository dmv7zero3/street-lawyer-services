import ContactFormSection from "./ContactForm/ContactFormSection";
// src/pages/Homepage/index.tsx
import "../../components/Galleries/FlipGallery/FlipGallery.css";

import React, { Suspense } from "react";
import HeroSection from "./HeroSection";
const FlipGallery = React.lazy(
  () => import("../../components/Galleries/FlipGallery/FlipGallery")
);
import { galleryData } from "../../components/Galleries/FlipGallery/galleryData";

// Lazy load the other sections
const LonnySection = React.lazy(() => import("./LonnySection"));
const MapsSection = React.lazy(() => import("./MapsSection"));

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-32">
            Loading...
          </div>
        }
      >
        <LonnySection />
      </Suspense>
      {/* Flip Gallery Section */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-32">
            Loading gallery...
          </div>
        }
      >
        <div className="relative py-8 overflow-hidden shadow-lg rounded-xl bg-sls-charcoal-950">
          {/* Background Elements (match LonnySection) */}
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
            {/* Gradient overlay (match LonnySection) */}
            <div className="absolute inset-0 bg-gradient-to-r from-sls-charcoal-950/90 via-sls-charcoal-950/70 to-sls-charcoal-950/90" />
          </div>
          <section className="relative z-10">
            <FlipGallery cards={galleryData.slice(0, 6)} />
          </section>
        </div>
      </Suspense>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-32">
            Loading...
          </div>
        }
      >
        <MapsSection />
      </Suspense>

      <ContactFormSection />
    </div>
  );
};

export default HomePage;
