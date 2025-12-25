"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stack = [
  "POLKADOT",
  "SUBSTRATE",
  "RUST",
  "NEXT.JS",
  "TYPESCRIPT",
  "SOLIDITY",
  "BIFROST",
  "OPENAI",
  "TAILWIND",
  "THREE.JS",
];

export default function Stack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full py-20 md:py-32 overflow-hidden bg-background"
      id="stack"
    >
      <div className="container mx-auto px-8 mb-16">
        <h2 className="text-xs font-mono tracking-widest text-accent mb-4">
          // SYSTEM_ARCHITECTURE
        </h2>
        <p className="text-2xl md:text-4xl font-sans max-w-2xl leading-tight">
          BUILT ON DECENTRALIZED PRIMITIVES. <br />
          OPTIMIZED FOR TRUSTLESS EXECUTION.
        </p>
      </div>

      <div className="relative flex whitespace-nowrap overflow-hidden border-y border-white/5 py-8 bg-surface/30 backdrop-blur-sm">
        <motion.div style={{ x: x1 }} className="flex gap-16 items-center">
          {[...stack, ...stack, ...stack].map((tech, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-sans font-bold text-transparent stroke-text opacity-50 hover:opacity-100 hover:text-accent transition-all duration-300 cursor-crosshair"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative flex whitespace-nowrap overflow-hidden border-b border-white/5 py-8 bg-surface/30 backdrop-blur-sm">
        <motion.div style={{ x: x2 }} className="flex gap-16 items-center">
          {[...stack, ...stack, ...stack].reverse().map((tech, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-sans font-bold text-foreground opacity-20 hover:opacity-100 transition-opacity duration-300 cursor-crosshair"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </section>
  );
}
