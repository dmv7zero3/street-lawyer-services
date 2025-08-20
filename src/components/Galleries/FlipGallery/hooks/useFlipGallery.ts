// src/components/Galleries/FlipGallery/hooks/useFlipGallery.ts
import { useRef, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";
import {
  initializeFlipAnimations,
  cleanupFlipAnimations,
} from "../animations/flipAnimations";
import type { FlipAnimationOptions } from "../types";

/**
 * Custom hook for managing FlipGallery animations and lifecycle
 *
 * Provides clean separation of animation logic from component rendering.
 * Handles initialization, cleanup, and responsive behavior.
 */
export const useFlipGallery = (
  cardCount: number,
  options: FlipAnimationOptions
) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationsInitialized = useRef(false);
  const currentOptions = useRef<FlipAnimationOptions>(options);

  // Set card ref helper function
  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardsRef.current[index] = el;
    },
    []
  );

  // Reset refs when card count changes
  useLayoutEffect(() => {
    cardsRef.current = new Array(cardCount).fill(null);
    animationsInitialized.current = false;
  }, [cardCount]);

  // Initialize animations when cards are ready
  useLayoutEffect(() => {
    if (animationsInitialized.current) return;

    const validCards = cardsRef.current.filter(
      (card) => card !== null
    ) as HTMLDivElement[];

    if (validCards.length === cardCount && validCards.length > 0) {
      // Double RAF to ensure DOM stability
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializeFlipAnimations(validCards, options);
          animationsInitialized.current = true;
          currentOptions.current = options;
        });
      });
    }
  }, [cardCount, options.enableHoverFlip, options.flipDuration]);

  // Handle options changes without full reinitialization
  useLayoutEffect(() => {
    if (!animationsInitialized.current) return;

    const hasOptionsChanged =
      currentOptions.current.enableHoverFlip !== options.enableHoverFlip ||
      currentOptions.current.flipDuration !== options.flipDuration;

    if (hasOptionsChanged) {
      const validCards = cardsRef.current.filter(
        (card) => card !== null
      ) as HTMLDivElement[];
      if (validCards.length > 0) {
        cleanupFlipAnimations(validCards);
        requestAnimationFrame(() => {
          initializeFlipAnimations(validCards, options);
          currentOptions.current = options;
        });
      }
    }
  }, [options.enableHoverFlip, options.flipDuration]);

  // Cleanup on unmount
  useLayoutEffect(() => {
    return () => {
      const validCards = cardsRef.current.filter(
        (card) => card !== null
      ) as HTMLDivElement[];
      if (validCards.length > 0) {
        cleanupFlipAnimations(validCards);
        gsap.killTweensOf(validCards);
      }
    };
  }, []);

  return {
    galleryRef,
    setCardRef,
    isReady: animationsInitialized.current,
  };
};
