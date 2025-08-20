// src/components/Galleries/FlipGallery/galleryData.ts

export interface FlipCardData {
  id: number;
  frontImage: string;
  backImage: string;
  altText?: string;
}

/**
 * Gallery data with 6 flip cards using Lonny square images
 * Each card has different front and back images
 */
export const galleryData: FlipCardData[] = [
  {
    id: 1,
    frontImage: "/images/lonny/squares/lonny-1-optimized.webp",
    backImage: "/images/lonny/squares/lonny-7-optimized.webp",
    altText: "Lonny photography - Card 1",
  },
  {
    id: 2,
    frontImage: "/images/lonny/squares/lonny-2-optimized.webp",
    backImage: "/images/lonny/squares/lonny-8-optimized.webp",
    altText: "Lonny photography - Card 2",
  },
  {
    id: 3,
    frontImage: "/images/lonny/squares/lonny-3-optimized.webp",
    backImage: "/images/lonny/squares/lonny-9-optimized.webp",
    altText: "Lonny photography - Card 3",
  },
  {
    id: 4,
    frontImage: "/images/lonny/squares/lonny-4-optimized.webp",
    backImage: "/images/lonny/squares/lonny-10-optimized.webp",
    altText: "Lonny photography - Card 4",
  },
  {
    id: 5,
    frontImage: "/images/lonny/squares/lonny-5-optimized.webp",
    backImage: "/images/lonny/squares/lonny-11-optimized.webp",
    altText: "Lonny photography - Card 5",
  },
  {
    id: 6,
    frontImage: "/images/lonny/squares/lonny-6-optimized.webp",
    backImage: "/images/lonny/squares/lonny-12-optimized.webp",
    altText: "Lonny photography - Card 6",
  },
];
