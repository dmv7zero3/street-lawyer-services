import "../../components/Galleries/FlipGallery/styles.css";
// src/pages/Homepage/index.tsx

import React, { Suspense } from "react";
import HeroSection from "./HeroSection";
import FlipGallery from "../../components/Galleries/FlipGallery";
import { lonnyGalleryData } from "../../components/Galleries/FlipGallery/data/lonnyGalleryData";

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
      <section className="my-8">
        <FlipGallery cards={lonnyGalleryData.slice(0, 6)} />
      </section>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-32">
            Loading...
          </div>
        }
      >
        <MapsSection />
      </Suspense>

      {/* Future sections will go here */}
    </div>
  );
};

export default HomePage;
