//tailwind.config.js
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssForms from "@tailwindcss/forms";
import tailwindcssTypography from "@tailwindcss/typography";

// Design tokens - can be externalized to JSON/Figma in the future
const designTokens = {
  colors: {
    "sls-forest": {
      50: "#f4f7f1",
      100: "#e6ede0",
      200: "#cfdcc3",
      300: "#adc19c",
      400: "#84a16f",
      500: "#648150",
      600: "#4e663e",
      700: "#3e5132",
      800: "#2d5016", // Primary
      900: "#253f15",
      950: "#13220b",
      DEFAULT: "#2d5016",
    },
    "sls-purple": {
      50: "#faf7fc",
      100: "#f3ecf8",
      200: "#e8ddf2",
      300: "#d6c3e8",
      400: "#bc9bd9",
      500: "#a172c8",
      600: "#8754b4",
      700: "#6b2c91", // Primary
      800: "#5d2d7e",
      900: "#4e2866",
      950: "#321443",
      DEFAULT: "#6b2c91",
    },
    "sls-marble": {
      50: "#fdfdfc",
      100: "#fcfbf9",
      200: "#f8f6f3", // Primary
      300: "#f3f0eb",
      400: "#ebe5dd",
      500: "#ddd4c8",
      600: "#cbbfad",
      700: "#b5a68f",
      800: "#948677",
      900: "#7a6f62",
      950: "#403932",
      DEFAULT: "#f8f6f3",
    },
    "sls-charcoal": {
      50: "#f6f6f6",
      100: "#e7e7e7",
      200: "#d1d1d1",
      300: "#b0b0b0",
      400: "#888888",
      500: "#6d6d6d",
      600: "#5d5d5d",
      700: "#4f4f4f",
      800: "#454545",
      900: "#3d3d3d",
      950: "#1a1a1a", // Primary
      DEFAULT: "#1a1a1a",
    },
    "sls-gold": {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
      950: "#d4af37", // Primary
      DEFAULT: "#d4af37",
    },
  },
  typography: {
    fontFamily: {
      heading: ["Oswald", "ui-sans-serif", "system-ui", "sans-serif"],
      body: ["Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    fontSize: {
      hero: [
        "clamp(2.5rem, 8vw, 4rem)",
        { lineHeight: "1.1", letterSpacing: "-0.02em" },
      ],
      display: [
        "clamp(2rem, 6vw, 3rem)",
        { lineHeight: "1.2", letterSpacing: "-0.02em" },
      ],
      "heading-1": [
        "clamp(1.75rem, 4vw, 2.5rem)",
        { lineHeight: "1.2", letterSpacing: "-0.01em" },
      ],
      "heading-2": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.3" }],
      "heading-3": ["clamp(1.25rem, 2.5vw, 1.5rem)", { lineHeight: "1.4" }],
      "body-lg": ["1.125rem", { lineHeight: "1.6" }],
      body: ["1rem", { lineHeight: "1.6" }],
      "body-sm": ["0.875rem", { lineHeight: "1.5" }],
      caption: ["0.75rem", { lineHeight: "1.4" }],
    },
  },
};

export default {
  darkMode: ["class"],

  // Optimized content paths for maximum performance
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue,svelte}",
    "./components/**/*.{js,jsx,ts,tsx,vue,svelte}",
    "./app/**/*.{js,jsx,ts,tsx,vue,svelte}",
    "./pages/**/*.{js,jsx,ts,tsx,vue,svelte}",
    "./layouts/**/*.{js,jsx,ts,tsx,vue,svelte}",
    "./lib/**/*.{js,jsx,ts,tsx}", // For utility components
    "./styles/**/*.css", // For @apply usage
    // Add specific patterns to avoid false positives
    "!./node_modules/**/*",
    "!./dist/**/*",
    "!./build/**/*",
  ],

  theme: {
    extend: {
      // Centralized design tokens
      colors: {
        ...designTokens.colors,

        // Semantic aliases for consistent usage
        primary: {
          ...designTokens.colors["sls-gold"],
          foreground: designTokens.colors["sls-charcoal"][950],
        },
        secondary: {
          ...designTokens.colors["sls-forest"],
          foreground: designTokens.colors["sls-marble"][200],
        },
        accent: {
          ...designTokens.colors["sls-purple"],
          foreground: designTokens.colors["sls-marble"][200],
        },

        // Background system
        background: {
          DEFAULT: designTokens.colors["sls-marble"][200],
          dark: designTokens.colors["sls-charcoal"][950],
          light: designTokens.colors["sls-marble"][50],
          muted: designTokens.colors["sls-marble"][400],
        },

        // Foreground system
        foreground: {
          DEFAULT: designTokens.colors["sls-charcoal"][950],
          muted: designTokens.colors["sls-charcoal"][600],
          light: designTokens.colors["sls-marble"][200],
          subtle: designTokens.colors["sls-marble"][800],
        },

        // Status colors (using design system)
        success: designTokens.colors["sls-forest"][600],
        warning: designTokens.colors["sls-gold"][500],
        error: designTokens.colors["sls-purple"][700],
        info: designTokens.colors["sls-charcoal"][600],
      },

      // Typography system
      fontFamily: designTokens.typography.fontFamily,
      fontSize: designTokens.typography.fontSize,

      // Consistent spacing system (8px grid)
      spacing: {
        18: "4.5rem", // 72px
        22: "5.5rem", // 88px
        26: "6.5rem", // 104px
        30: "7.5rem", // 120px
        34: "8.5rem", // 136px
        38: "9.5rem", // 152px
      },

      // Container system for consistent layouts
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1400px",
        },
      },

      // Enhanced shadow system
      boxShadow: {
        street: "0 4px 20px rgba(26, 26, 26, 0.08)",
        "street-lg": "0 8px 40px rgba(26, 26, 26, 0.12)",
        luxe: "0 8px 32px rgba(212, 175, 55, 0.15)",
        "luxe-lg": "0 16px 48px rgba(212, 175, 55, 0.2)",
        premium: "0 12px 40px rgba(107, 44, 145, 0.15)",
        "premium-lg": "0 20px 60px rgba(107, 44, 145, 0.2)",
        "glow-gold": "0 0 20px rgba(212, 175, 55, 0.3)",
        "glow-purple": "0 0 20px rgba(107, 44, 145, 0.3)",
        "inner-soft": "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
      },

      // Performance-optimized animations
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": {
            textShadow: "0 0 5px currentColor",
            opacity: "1",
          },
          "50%": {
            textShadow: "0 0 20px currentColor, 0 0 30px currentColor",
            opacity: "0.8",
          },
        },
      },

      // Responsive breakpoints
      screens: {
        xs: "475px",
        "3xl": "1600px",
      },
    },
  },

  plugins: [
    tailwindcssAnimate,
    tailwindcssForms,
    tailwindcssTypography,

    // Street Lawyer Services Design System Plugin
    function ({ addBase, addComponents, addUtilities, theme }) {
      // Base layer - foundational styles
      addBase({
        // Reset and base typography
        html: {
          fontFamily: theme("fontFamily.body"),
          fontSize: theme("fontSize.body"),
          lineHeight: theme("fontSize.body[1].lineHeight"),
          color: theme("colors.foreground.DEFAULT"),
          backgroundColor: theme("colors.background.DEFAULT"),
        },
        "h1, h2, h3, h4, h5, h6": {
          fontFamily: theme("fontFamily.heading"),
          fontWeight: theme("fontWeight.semibold"),
          lineHeight: "1.2",
        },
        h1: { fontSize: theme("fontSize.heading-1") },
        h2: { fontSize: theme("fontSize.heading-2") },
        h3: { fontSize: theme("fontSize.heading-3") },

        // Focus styles for accessibility
        "*:focus-visible": {
          outline: `2px solid ${theme("colors.primary.DEFAULT")}`,
          outlineOffset: "2px",
        },
      });

      // Component layer - reusable patterns (use sparingly)
      addComponents({
        // Button system
        ".btn": {
          "@apply inline-flex items-center justify-center font-heading font-semibold uppercase tracking-wider transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed":
            {},
        },
        ".btn-sm": {
          "@apply btn px-4 py-2 text-sm rounded-lg": {},
        },
        ".btn-md": {
          "@apply btn px-6 py-3 text-body rounded-lg": {},
        },
        ".btn-lg": {
          "@apply btn px-8 py-4 text-body-lg rounded-xl": {},
        },
        ".btn-primary": {
          "@apply btn-md bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50 shadow-luxe hover:shadow-luxe-lg hover:-translate-y-0.5":
            {},
        },
        ".btn-secondary": {
          "@apply btn-md bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary/50":
            {},
        },
        ".btn-ghost": {
          "@apply btn-md bg-transparent text-foreground hover:bg-foreground/5 focus:ring-foreground/20":
            {},
        },

        // Card system
        ".card": {
          "@apply bg-background border border-sls-marble-300/50 rounded-xl shadow-street":
            {},
        },
        ".card-interactive": {
          "@apply card transition-all duration-300 hover:shadow-street-lg hover:-translate-y-1 cursor-pointer":
            {},
        },
        ".card-premium": {
          "@apply card bg-gradient-to-br from-sls-marble-50 to-sls-marble-100 shadow-premium":
            {},
        },

        // Layout helpers
        ".layout-container": {
          "@apply container mx-auto px-4 sm:px-6 lg:px-8": {},
        },
        ".section-padding": {
          "@apply py-16 sm:py-20 lg:py-24": {},
        },
        ".section-light": {
          "@apply section-padding bg-background": {},
        },
        ".section-dark": {
          "@apply section-padding bg-background-dark text-foreground-light": {},
        },
        ".section-accent": {
          "@apply section-padding bg-secondary text-secondary-foreground": {},
        },
      });

      // Utility layer - single-purpose classes
      addUtilities({
        // Text utilities
        ".text-gradient-primary": {
          background: `linear-gradient(135deg, ${theme("colors.primary.DEFAULT")} 0%, ${theme("colors.accent.DEFAULT")} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        ".text-gradient-forest": {
          background: `linear-gradient(135deg, ${theme("colors.secondary.DEFAULT")} 0%, ${theme("colors.secondary.500")} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },

        // Background utilities
        ".bg-gradient-primary": {
          background: `linear-gradient(135deg, ${theme("colors.primary.DEFAULT")} 0%, ${theme("colors.accent.DEFAULT")} 100%)`,
        },
        ".bg-gradient-forest": {
          background: `linear-gradient(135deg, ${theme("colors.secondary.DEFAULT")} 0%, ${theme("colors.secondary.500")} 100%)`,
        },
        ".bg-gradient-smoke": {
          background: `linear-gradient(135deg, ${theme("colors.sls-charcoal.950")} 0%, ${theme("colors.sls-charcoal.800")} 100%)`,
        },

        // Animation utilities
        ".animate-on-scroll": {
          "@apply opacity-0 translate-y-4 transition-all duration-700 ease-out":
            {},
        },
        ".animate-on-scroll.is-visible": {
          "@apply opacity-100 translate-y-0": {},
        },
      });
    },
  ],
};
