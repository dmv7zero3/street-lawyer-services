import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background from "./Background";
import SectionTitle from "./SectionTitle";
import GoogleMapComponent from "./GoogleMapComponent";
import LocationInfo from "./LocationInfo";

gsap.registerPlugin(ScrollTrigger);

const MapsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, mapRef.current, infoRef.current], {
        opacity: 0,
        y: 50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        [mapRef.current, infoRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden lg:py-32 bg-sls-charcoal-950"
    >
      {/* Background Elements */}
      <Background />

      <div className="relative z-10 px-8 mx-auto max-w-7xl">
        {/* Section Title */}
        <div ref={titleRef}>
          <SectionTitle />
        </div>

        {/* Maps and Info Grid */}
        <div className="grid items-start gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Google Map */}
          <div className="lg:col-span-2" ref={mapRef}>
            <div style={{ width: "100%", height: "100%" }}>
              <GoogleMapComponent />
            </div>{" "}
          </div>

          {/* Location Information */}
          <div className="lg:col-span-1" ref={infoRef}>
            <LocationInfo />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <p
              className="text-lg text-sls-marble-400 tracking-[0.02em] leading-relaxed"
              style={{
                textShadow: "0 0 5px rgba(248, 246, 243, 0.1)",
              }}
            >
              Conveniently located near the National Zoo and easily accessible
              via Metro's Red Line at Cleveland Park station. Street parking and
              nearby parking garages available for your convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapsSection;
