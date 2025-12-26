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

export class ErrorBoundaryCyberpunk extends Component<Props, State> {
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
        <main className="w-full h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          </div>

          <h1 className="text-9xl font-sans font-bold text-accent opacity-20 select-none">
            ERROR
          </h1>
          <div className="absolute flex flex-col items-center gap-4 z-10">
            <h2 className="text-2xl md:text-4xl font-mono font-bold text-accent">
              // SYSTEM_ERROR
            </h2>
            <p className="text-foreground/60 font-mono text-center max-w-md">
              An unexpected error occurred in the system. The transaction has
              failed.
            </p>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-white text-black font-mono font-bold hover:bg-accent transition-colors"
              >
                RELOAD_SYSTEM
              </button>
              <Link
                href="/"
                className="px-8 py-4 border border-accent text-accent font-mono font-bold hover:bg-accent/10 transition-colors"
              >
                RETURN_TO_ROOT
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left max-w-2xl">
                <summary className="cursor-pointer text-xs text-accent/50 mb-2 font-mono">
                  ERROR_DETAILS (DEV_MODE)
                </summary>
                <pre className="text-xs bg-surface/50 p-4 rounded border border-white/10 overflow-auto font-mono">
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


