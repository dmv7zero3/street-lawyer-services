// src/components/Galleries/FlipGallery/types.ts

export interface FlipCardData {
  id?: string | number;
  frontImage: string;
  backImage: string;
  altText?: string;
}

export interface GridColumns {
  mobile: number;
  tablet: number;
  desktop: number;
}

export interface CardHeight {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface FlipGalleryProps {
  cards: FlipCardData[];
  gridColumns?: GridColumns;
  className?: string;
  enableHoverFlip?: boolean;
  flipDuration?: number;
  cardHeight?: CardHeight;
}

export interface FlipCardProps {
  frontImage: string;
  backImage: string;
  altText?: string;
  cardHeight: CardHeight;
}

export interface FlipAnimationOptions {
  enableHoverFlip: boolean;
  flipDuration: number;
}
