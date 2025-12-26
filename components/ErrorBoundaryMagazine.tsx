"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundaryMagazine extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-[#f0f0f0] text-black p-8">
          <div className="max-w-2xl text-center">
            <h1
              className="text-8xl md:text-9xl leading-none mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Error
            </h1>
            <div className="h-px w-24 bg-black mx-auto mb-8" />
            <p className="text-lg text-black/60 mb-12 max-w-md mx-auto">
              An unexpected error occurred while loading this page. Please try
              refreshing or return to the home page.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-black text-white font-mono text-sm uppercase tracking-widest hover:bg-black/80 transition-colors"
              >
                Refresh Page
              </button>
              <Link
                href="/"
                className="px-8 py-4 border border-black text-black font-mono text-sm uppercase tracking-widest hover:bg-black/5 transition-colors"
              >
                Home
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-12 text-left">
                <summary className="cursor-pointer text-xs text-black/40 mb-4 font-mono uppercase tracking-widest">
                  Error Details (Development)
                </summary>
                <pre className="text-xs bg-white p-6 border border-black/10 overflow-auto font-mono">
                  {this.state.error.toString()}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}


