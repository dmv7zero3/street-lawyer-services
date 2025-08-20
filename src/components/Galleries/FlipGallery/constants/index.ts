// src/components/Galleries/FlipGallery/constants/index.ts

/**
 * Default configuration constants for FlipGallery component
 */

import type { GridColumns, CardHeight } from "../types";

// Default grid configurations
export const DEFAULT_GRID_COLUMNS: GridColumns = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
};

// Default card heights
export const DEFAULT_CARD_HEIGHT: CardHeight = {
  mobile: "165px",
  tablet: "195px",
  desktop: "245px",
};

// Animation constants
export const ANIMATION_DEFAULTS = {
  FLIP_DURATION: 0.85,
  FLIP_EASE: "power2.out",
  PERSPECTIVE: 1000,
  HOVER_BREAKPOINT: 992,
} as const;

// CSS class names
export const CSS_CLASSES = {
  CARD_CONTAINER: "flipImgCard",
  CARD_IMAGE: "flipImg",
  FRONT_IMAGE: "front-image",
  BACK_IMAGE: "back-image",
  ANIMATING: "is-animating",
  FLIPPED: "is-flipped",
} as const;

// Responsive breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  MOBILE: 0,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1440,
} as const;

// Performance optimization constants
export const PERFORMANCE = {
  RAF_DELAY_COUNT: 2, // Number of requestAnimationFrame calls for timing
  DEBOUNCE_DELAY: 100, // Milliseconds for resize debouncing
  PRELOAD_BATCH_SIZE: 4, // Number of images to preload at once
  MAX_CONCURRENT_ANIMATIONS: 3, // Limit simultaneous flip animations
} as const;

// Accessibility constants
export const A11Y = {
  REDUCED_MOTION_DURATION: 0.2,
  DEFAULT_ALT_TEXT: "Gallery image",
  CARD_ROLE: "img",
  INTERACTIVE_ROLE: "button",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NO_CARDS: "FlipGallery: No cards provided",
  INVALID_GRID: "FlipGallery: Invalid grid configuration",
  ANIMATION_FAILED: "FlipGallery: Animation initialization failed",
  IMAGE_LOAD_FAILED: "FlipGallery: Failed to load image",
} as const;
