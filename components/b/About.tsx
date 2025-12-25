"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-[200vh] bg-[#f0f0f0] text-black"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative">
          <motion.div style={{ y }} className="absolute inset-0">
            <div className="w-full h-full bg-neutral-300 flex items-center justify-center text-neutral-500 font-mono">
              [PORTRAIT_PLACEHOLDER]
            </div>
            {/* 
             <Image
              src="/path/to/portrait.jpg"
              alt="Portrait"
              fill
              className="object-cover grayscale contrast-125"
            /> 
            */}
          </motion.div>
        </div>

        {/* Right: Manifesto */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center p-8 md:p-16 bg-white z-10">
          <div className="max-w-lg">
            <span className="font-mono text-xs uppercase tracking-widest mb-8 block">
              The Manifesto
            </span>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-8">
              Digital craftsmanship for the decentralized era.
            </h1>
            <p className="font-sans text-lg md:text-xl leading-relaxed opacity-80 mb-8">
              I build interfaces that feel inevitable. Bridging the gap between
              complex protocols and human intuition.
            </p>
            <div className="grid grid-cols-2 gap-8 font-mono text-xs uppercase tracking-widest opacity-60">
              <div>
                <span className="block mb-2 text-black opacity-100">Stack</span>
                <ul className="flex flex-col gap-1">
                  <li>Next.js</li>
                  <li>TypeScript</li>
                  <li>Solidity</li>
                  <li>WebGL</li>
                </ul>
              </div>
              <div>
                <span className="block mb-2 text-black opacity-100">
                  Services
                </span>
                <ul className="flex flex-col gap-1">
                  <li>Frontend Dev</li>
                  <li>Smart Contracts</li>
                  <li>Creative Dev</li>
                  <li>Consulting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content to allow the sticky effect to work */}
      <div className="h-screen"></div>
    </section>
  );
}
