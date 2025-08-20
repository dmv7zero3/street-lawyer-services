// src/components/Galleries/FlipGallery/utils/galleryUtils.ts
import type { GridColumns, CardHeight } from "../types";

/**
 * Utility functions for FlipGallery component
 */

/**
 * Generate responsive grid CSS classes based on column configuration
 */
export const generateGridClasses = (gridColumns: GridColumns): string => {
  const { mobile, tablet, desktop } = gridColumns;

  // Validate grid columns (must be between 1-12 for Tailwind)
  const validMobile = Math.max(1, Math.min(12, mobile));
  const validTablet = Math.max(1, Math.min(12, tablet));
  const validDesktop = Math.max(1, Math.min(12, desktop));

  return `grid grid-cols-${validMobile} gap-4 sm:grid-cols-${validMobile} md:grid-cols-${validTablet} lg:grid-cols-${validDesktop}`;
};

/**
 * Generate CSS custom properties for responsive card heights
 */
export const generateHeightStyles = (
  cardHeight: CardHeight
): React.CSSProperties => {
  // Cast to 'any' to allow custom CSS variables
  return {
    "--mobile-height": cardHeight.mobile,
    "--tablet-height": cardHeight.tablet,
    "--desktop-height": cardHeight.desktop,
  } as any;
};

/**
 * Validate image URL and provide fallback
 */
export const validateImageUrl = (url: string, fallback?: string): string => {
  if (!url || url.trim() === "") {
    return (
      fallback ||
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+"
    );
  }

  // Basic URL validation
  try {
    new URL(url, window.location.origin);
    return url;
  } catch {
    return (
      fallback ||
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+"
    );
  }
};

/**
 * Generate unique card ID if not provided
 */
export const generateCardId = (
  index: number,
  prefix: string = "flip-card"
): string => {
  return `${prefix}-${index}-${Date.now()}`;
};

/**
 * Check if device supports hover interactions
 */
export const supportsHover = (): boolean => {
  if (typeof window === "undefined") return false;

  // Check for hover capability
  return window.matchMedia("(hover: hover)").matches;
};

/**
 * Get optimal animation duration based on device performance
 */
export const getOptimalDuration = (baseDuration: number): number => {
  if (typeof window === "undefined") return baseDuration;

  // Reduce duration on lower-end devices
  const isLowEndDevice = (navigator as any).hardwareConcurrency < 4;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return 0.2; // Very fast for accessibility
  if (isLowEndDevice) return baseDuration * 0.7; // 30% faster

  return baseDuration;
};

/**
 * Preload images for better performance
 */
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.all(promises);
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get responsive breakpoint information
 */
export const getBreakpointInfo = () => {
  if (typeof window === "undefined") {
    return { isMobile: false, isTablet: false, isDesktop: false };
  }

  const width = window.innerWidth;

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
};

/**
 * Calculate optimal number of columns based on container width
 */
export const calculateOptimalColumns = (
  containerWidth: number,
  minCardWidth: number = 200,
  gap: number = 16
): number => {
  const availableWidth = containerWidth - gap;
  const maxColumns = Math.floor(availableWidth / (minCardWidth + gap));

  return Math.max(1, Math.min(6, maxColumns)); // Between 1-6 columns
};
