// src/components/Galleries/FlipGallery/data/lonnyGalleryData.ts
import type { FlipCardData } from "../types";

/**
 * Gallery data using Lonny square images
 * All images are 1:1 ratio square format
 */
export const lonnyGalleryData: FlipCardData[] = [
  {
    id: 1,
    frontImage: "/images/lonny/squares/lonny-1-optimized.webp",
    backImage: "/images/lonny/squares/lonny-2-optimized.webp",
    altText: "Lonny photography - Image 1",
  },
  {
    id: 2,
    frontImage: "/images/lonny/squares/lonny-3-optimized.webp",
    backImage: "/images/lonny/squares/lonny-4-optimized.webp",
    altText: "Lonny photography - Image 2",
  },
  {
    id: 3,
    frontImage: "/images/lonny/squares/lonny-5-optimized.webp",
    backImage: "/images/lonny/squares/lonny-6-optimized.webp",
    altText: "Lonny photography - Image 3",
  },
  {
    id: 4,
    frontImage: "/images/lonny/squares/lonny-7-optimized.webp",
    backImage: "/images/lonny/squares/lonny-8-optimized.webp",
    altText: "Lonny photography - Image 4",
  },
  {
    id: 5,
    frontImage: "/images/lonny/squares/lonny-9-optimized.webp",
    backImage: "/images/lonny/squares/lonny-10-optimized.webp",
    altText: "Lonny photography - Image 5",
  },
  {
    id: 6,
    frontImage: "/images/lonny/squares/lonny-11-optimized.webp",
    backImage: "/images/lonny/squares/lonny-12-optimized.webp",
    altText: "Lonny photography - Image 6",
  },
  {
    id: 7,
    frontImage: "/images/lonny/squares/lonny-13-optimized.webp",
    backImage: "/images/lonny/squares/lonny-1-optimized.webp",
    altText: "Lonny photography - Image 7",
  },
  {
    id: 8,
    frontImage: "/images/lonny/squares/lonny-optimized.webp",
    backImage: "/images/lonny/squares/lonny-2-optimized.webp",
    altText: "Lonny photography - Image 8",
  },
];

/**
 * Extended gallery with more image combinations
 */
export const lonnyGalleryDataExtended: FlipCardData[] = [
  ...lonnyGalleryData,
  {
    id: 9,
    frontImage: "/images/lonny/squares/lonny-3-optimized.webp",
    backImage: "/images/lonny/squares/lonny-7-optimized.webp",
    altText: "Lonny photography - Image 9",
  },
  {
    id: 10,
    frontImage: "/images/lonny/squares/lonny-6-optimized.webp",
    backImage: "/images/lonny/squares/lonny-9-optimized.webp",
    altText: "Lonny photography - Image 10",
  },
  {
    id: 11,
    frontImage: "/images/lonny/squares/lonny-8-optimized.webp",
    backImage: "/images/lonny/squares/lonny-11-optimized.webp",
    altText: "Lonny photography - Image 11",
  },
  {
    id: 12,
    frontImage: "/images/lonny/squares/lonny-12-optimized.webp",
    backImage: "/images/lonny/squares/lonny-5-optimized.webp",
    altText: "Lonny photography - Image 12",
  },
];

/**
 * Utility function to create gallery data with fallback support
 * Uses WebP with AVIF fallback for better performance
 */
export const createLonnyGalleryData = (count: number = 8): FlipCardData[] => {
  const baseData = lonnyGalleryDataExtended.slice(0, count);

  return baseData.map((card) => ({
    ...card,
    // Use optimized WebP images with AVIF fallback
    frontImage: card.frontImage.replace("-optimized.webp", "-optimized.avif"),
    backImage: card.backImage.replace("-optimized.webp", "-optimized.avif"),
  }));
};

/**
 * Get gallery data optimized for different use cases
 */
export const getLonnyGalleryData = (
  variant: "webp" | "avif" | "jpg" = "webp"
): FlipCardData[] => {
  return lonnyGalleryData.map((card) => ({
    ...card,
    frontImage: card.frontImage.replace(
      "-optimized.webp",
      `-optimized.${variant}`
    ),
    backImage: card.backImage.replace(
      "-optimized.webp",
      `-optimized.${variant}`
    ),
  }));
};
