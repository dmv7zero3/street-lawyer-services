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
  console.debug(
    "[FlipGallery/initializeFlipAnimations] cards received:",
    cards
  );
  if (!cards.length) {
    console.warn("FlipGallery: No cards provided for animation initialization");
    return;
  }

  cards.forEach((card, index) => {
    try {
      console.debug(
        `[FlipGallery/initializeFlipAnimations] Initializing card #${index}`,
        card
      );
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

  // Set up front and back image styles for proper 3D flip
  gsap.set([front, back], {
    position: "absolute",
    width: "100%",
    height: "100%",
    transformOrigin: "center",
    backfaceVisibility: "hidden",
    top: 0,
    left: 0,
    force3D: true,
  });

  // CRITICAL: Both images need explicit rotationY values
  // Position front image normally (facing forward) - MUST be explicit
  gsap.set(front, {
    rotationY: 0,
    transformOrigin: "center",
    force3D: true,
  });

  // Position back image rotated 180 degrees (facing backward initially)
  gsap.set(back, {
    rotationY: 180,
    transformOrigin: "center",
    force3D: true,
  });

  // Debug: Log the transform values after setting
  console.debug(
    "[FlipGallery] Front image transform after init:",
    front.style.transform
  );
  console.debug(
    "[FlipGallery] Back image transform after init:",
    back.style.transform
  );

  // Track animation state to prevent conflicts
  let isAnimating = false;
  let isFlipped = false;

  // Animation function
  const performFlip = (event?: Event) => {
    console.debug("[FlipGallery] performFlip called", {
      card,
      isAnimating,
      isFlipped,
      eventType: event?.type,
      cardRotation: card.style.transform,
    });
    if (isAnimating) return;

    isAnimating = true;
    isFlipped = !isFlipped;

    // Create flip timeline - rotate the entire card container
    const flipTimeline = gsap
      .timeline({
        onComplete: () => {
          isAnimating = false;
          console.debug("[FlipGallery] Animation complete", {
            card,
            isFlipped,
            cardRotation: card.style.transform,
          });
        },
      })
      .to(card, {
        duration: flipDuration,
        rotationY: isFlipped ? 180 : 0,
        ease: "power2.out",
        onUpdate: () => {
          // Log current transform for debugging
          // console.debug("[FlipGallery] onUpdate", card.style.transform);
        },
      });

    flipTimeline.play();
  };

  // Add click event listener
  card.addEventListener("click", performFlip);
  console.debug("[FlipGallery] Click event listener added", card);

  // Add hover event listener for desktop if enabled
  if (enableHoverFlip) {
    const screenWidth = window.screen.width;

    // Only enable hover on larger screens
    if (screenWidth > 992) {
      card.addEventListener("mouseenter", performFlip);
      console.debug("[FlipGallery] Mouseenter event listener added", card);
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
