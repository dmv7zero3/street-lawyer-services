// src/components/Galleries/FlipGallery/index.tsx
import React from "react";
import type { FlipGalleryProps } from "./types";
import FlipCard from "./components/FlipCard";
import { FlipGalleryErrorBoundary } from "./components/ErrorBoundary";
import { useFlipGallery } from "./hooks/useFlipGallery";
import {
  generateGridClasses,
  generateHeightStyles,
  validateImageUrl,
  generateCardId,
} from "./utils/galleryUtils";

/**
 * FlipGallery Component
 *
 * A responsive gallery with flip card animations using GSAP.
 * Each card shows a front and back image that flips on click/hover.
 *
 * @param cards - Array of card data with front and back images
 * @param gridColumns - Responsive grid configuration
 * @param className - Additional CSS classes
 * @param enableHoverFlip - Enable flip on hover (desktop only)
 * @param flipDuration - Animation duration in seconds
 */
const FlipGallery: React.FC<FlipGalleryProps> = ({
  cards,
  gridColumns = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
  },
  className = "",
  enableHoverFlip = false,
  flipDuration = 0.85,
  cardHeight = {
    mobile: "165px",
    tablet: "195px",
    desktop: "245px",
  },
}) => {
  // Use custom hook for animation management
  const { galleryRef, setCardRef } = useFlipGallery(cards.length, {
    enableHoverFlip,
    flipDuration,
  });

  // Generate responsive styles
  const gridClasses = generateGridClasses(gridColumns);
  const heightStyles = generateHeightStyles(cardHeight);

  return (
    <FlipGalleryErrorBoundary>
      <section
        className={`flex flex-col w-10/12 h-full mx-auto md:max-w-4xl pt-[1.35rem] pb-[1.7rem] md:pt-[3.90rem] md:pb-[1.5rem] ${className}`}
        style={heightStyles}
      >
        <div ref={galleryRef} className={gridClasses}>
          {cards.map((card, index) => (
            <FlipCard
              key={card.id || generateCardId(index)}
              ref={setCardRef(index)}
              frontImage={validateImageUrl(card.frontImage)}
              backImage={validateImageUrl(card.backImage)}
              altText={card.altText || `Gallery image ${index + 1}`}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      </section>
    </FlipGalleryErrorBoundary>
  );
};

export default FlipGallery;
