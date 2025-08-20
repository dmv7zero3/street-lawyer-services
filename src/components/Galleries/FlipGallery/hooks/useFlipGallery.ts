// src/components/Galleries/FlipGallery/hooks/useFlipGallery.ts
import { useRef, useLayoutEffect, useCallback, useEffect } from "react";
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

  // Set card ref helper function with animation triggering
  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      console.debug(`[useFlipGallery] Setting ref for index ${index}:`, el);
      cardsRef.current[index] = el;

      // Check if all refs are now populated and trigger animation initialization
      const validCards = cardsRef.current.filter(
        (card) => card !== null
      ) as HTMLDivElement[];

      console.debug(
        `[useFlipGallery] Valid cards count: ${validCards.length}, Expected: ${cardCount}`
      );

      // Only initialize if we have all cards and haven't initialized yet
      if (validCards.length === cardCount && !animationsInitialized.current) {
        console.debug(
          "[useFlipGallery] All cards ready, initializing animations..."
        );

        // Use double RAF for safety
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            initializeFlipAnimations(validCards, options);
            animationsInitialized.current = true;
            currentOptions.current = options;
            console.debug(
              "[useFlipGallery] Animations initialized successfully"
            );
          });
        });
      }
    },
    [cardCount, options]
  );

  // Reset refs when card count changes
  useLayoutEffect(() => {
    console.debug(`[useFlipGallery] Resetting refs for ${cardCount} cards`);
    cardsRef.current = new Array(cardCount).fill(null);
    animationsInitialized.current = false;
  }, [cardCount]);

  // Handle options changes after initialization
  useEffect(() => {
    if (!animationsInitialized.current) return;

    const hasOptionsChanged =
      currentOptions.current.enableHoverFlip !== options.enableHoverFlip ||
      currentOptions.current.flipDuration !== options.flipDuration;

    if (hasOptionsChanged) {
      console.debug(
        "[useFlipGallery] Options changed, reinitializing animations"
      );
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
        console.debug("[useFlipGallery] Cleaning up animations on unmount");
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
