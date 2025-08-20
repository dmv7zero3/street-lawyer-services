// src/components/Galleries/FlipGallery/FlipGallery.tsx
import React, { useState } from "react";
import "./FlipGallery.css";

interface FlipCardData {
  id: number;
  frontImage: string;
  backImage: string;
  altText?: string;
}

interface FlipGalleryProps {
  cards: FlipCardData[];
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

const FlipGallery: React.FC<FlipGalleryProps> = ({
  cards,
  columns = { mobile: 2, tablet: 3, desktop: 3 },
}) => {
  // Track which cards are flipped
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardClick = (cardId: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  // Generate grid class based on columns prop
  const gridClass = `
    grid-cols-${columns.mobile} 
    md:grid-cols-${columns.tablet} 
    lg:grid-cols-${columns.desktop}
  `;

  return (
    <div className={`gallery-grid max-w-7xl w-11/12  mx-auto ${gridClass}`}>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`flip-card ${flippedCards.has(card.id) ? "flipped" : ""}`}
          onClick={() => handleCardClick(card.id)}
          role="button"
          tabIndex={0}
          aria-label={card.altText || `Flip card ${card.id}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCardClick(card.id);
            }
          }}
        >
          <div className="flip-card-inner">
            {/* Front of card */}
            <div
              className="flip-card-front"
              style={{ backgroundImage: `url(${card.frontImage})` }}
              aria-hidden={flippedCards.has(card.id)}
            >
              <span className="sr-only">Front image</span>
            </div>

            {/* Back of card */}
            <div
              className="flip-card-back"
              style={{ backgroundImage: `url(${card.backImage})` }}
              aria-hidden={!flippedCards.has(card.id)}
            >
              <span className="sr-only">Back image</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlipGallery;
