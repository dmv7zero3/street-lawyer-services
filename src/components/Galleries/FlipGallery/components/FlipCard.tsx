// src/components/Galleries/FlipGallery/components/FlipCard.tsx
import React, { useState, useEffect } from "react";
import type { FlipCardProps } from "../types";

// Extend FlipCardProps to include the cardRef prop explicitly
interface FlipCardPropsWithRef extends FlipCardProps {
  cardRef: (el: HTMLDivElement | null) => void;
}

/**
 * Individual flip card component
 *
 * Contains front and back images that will be animated by GSAP.
 * Accepts a function ref via cardRef prop from the parent component.
 */
const FlipCard: React.FC<FlipCardPropsWithRef> = ({
  frontImage,
  backImage,
  altText = "Gallery image",
  cardHeight,
  cardRef,
}) => {
  const [frontLoaded, setFrontLoaded] = useState(false);
  const [backLoaded, setBackLoaded] = useState(false);

  // Generate dynamic height classes
  const getHeightClasses = () => {
    // Use custom CSS variables for precise height control
    return {
      "--mobile-height": cardHeight.mobile,
      "--tablet-height": cardHeight.tablet,
      "--desktop-height": cardHeight.desktop,
    } as React.CSSProperties;
  };

  // Handle image load events
  const handleImageLoad = (imageType: "front" | "back") => {
    if (imageType === "front") setFrontLoaded(true);
    if (imageType === "back") setBackLoaded(true);
  };

  // Debug: log when cardRef function is called
  const handleRef = (el: HTMLDivElement | null) => {
    console.debug("[FlipCard] CardRef function called with element:", el);
    if (cardRef) {
      cardRef(el);
    }
  };

  return (
    <div
      ref={handleRef}
      className="cursor-pointer flipImgCard"
      style={getHeightClasses()}
    >
      {/* Front Image */}
      <div
        className={`flipImg front-image ${frontLoaded ? "loaded" : "loading"}`}
        style={{
          backgroundImage: `url("${frontImage}")`,
        }}
        role="img"
        aria-label={`${altText} - front`}
      />

      {/* Back Image */}
      <div
        className={`flipImg back-image ${backLoaded ? "loaded" : "loading"}`}
        style={{
          backgroundImage: `url("${backImage}")`,
        }}
        role="img"
        aria-label={`${altText} - back`}
      />

      {/* Hidden image elements to detect loading */}
      <img
        src={frontImage}
        alt=""
        style={{ display: "none" }}
        onLoad={() => handleImageLoad("front")}
        onError={() => setFrontLoaded(true)} // Stop loading state on error
      />
      <img
        src={backImage}
        alt=""
        style={{ display: "none" }}
        onLoad={() => handleImageLoad("back")}
        onError={() => setBackLoaded(true)} // Stop loading state on error
      />
    </div>
  );
};

FlipCard.displayName = "FlipCard";

export default FlipCard;
