// src/components/Galleries/FlipGallery/animations/flipAnimations.ts
import { gsap } from "gsap";
import type { FlipAnimationOptions } from "../types";

/**
 * Initialize flip animations for all gallery cards
 *
 * Based on your original example.js implementation but with TypeScript
 * and improved error handling and cleanup.
 */
export function initializeFlipAnimations(
  cards: HTMLDivElement[],
  options: FlipAnimationOptions
): void {
  if (!cards.length) {
    console.warn("FlipGallery: No cards provided for animation initialization");
    return;
  }

  cards.forEach((card, index) => {
    try {
      createFlipAnimation(card, options);
    } catch (error) {
      console.error(
        `FlipGallery: Failed to initialize animation for card ${index}:`,
        error
      );
    }
  });
}

/**
 * Create flip animation for a single card
 *
 * Sets up 3D transform styles and click/hover event handlers
 */
function createFlipAnimation(
  card: HTMLDivElement,
  options: FlipAnimationOptions
): void {
  const { enableHoverFlip, flipDuration } = options;

  // Set up 3D container styles
  gsap.set(card, {
    transformStyle: "preserve-3d",
    perspective: 1000,
  });

  // Get front and back elements
  const front = card.children[0] as HTMLElement;
  const back = card.children[1] as HTMLElement;

  if (!front || !back) {
    console.warn("FlipGallery: Card missing front or back image element");
    return;
  }

  // Set up front and back image styles
  gsap.set([front, back], {
    position: "absolute",
    width: "100%",
    height: "100%",
    transformOrigin: "center",
    backfaceVisibility: "hidden",
  });

  // Initially hide the back image (rotated 180 degrees)
  gsap.set(back, {
    rotationY: -180,
  });

  // Track animation state to prevent conflicts
  let isAnimating = false;
  let isFlipped = false;

  // Animation function
  const performFlip = () => {
    if (isAnimating) return;

    isAnimating = true;
    isFlipped = !isFlipped;

    // Create flip timeline
    const flipTimeline = gsap
      .timeline({
        onComplete: () => {
          isAnimating = false;
        },
      })
      .to(card, {
        duration: flipDuration,
        rotationY: isFlipped ? "+=180" : "-=180",
        ease: "power2.out",
      });

    flipTimeline.play();
  };

  // Add click event listener
  card.addEventListener("click", performFlip);

  // Add hover event listener for desktop if enabled
  if (enableHoverFlip) {
    const screenWidth = window.screen.width;

    // Only enable hover on larger screens
    if (screenWidth > 992) {
      card.addEventListener("mouseenter", performFlip);
    }
  }

  // Store cleanup function on the element for later removal
  (card as any).__flipCleanup = () => {
    card.removeEventListener("click", performFlip);
    if (enableHoverFlip) {
      card.removeEventListener("mouseenter", performFlip);
    }
    gsap.killTweensOf(card);
  };
}

/**
 * Cleanup function to remove event listeners and kill animations
 */
export function cleanupFlipAnimations(cards: HTMLDivElement[]): void {
  cards.forEach((card) => {
    if (card && (card as any).__flipCleanup) {
      (card as any).__flipCleanup();
      delete (card as any).__flipCleanup;
    }
  });
}
