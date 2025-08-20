// src/components/Galleries/FlipGallery/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary for FlipGallery component
 * Catches GSAP initialization errors and other component failures
 */
export class FlipGalleryErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("FlipGallery Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="mb-4 text-4xl">📷</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Gallery Unavailable
              </h3>
              <p className="text-sm text-gray-500">
                Unable to load the image gallery. Please refresh the page.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
