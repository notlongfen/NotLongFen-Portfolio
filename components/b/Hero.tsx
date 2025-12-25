"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#f0f0f0] text-black"
    >
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-black/10 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale contrast-125"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-abstract-digital-tunnel-4508/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center mix-blend-difference text-white"
      >
        <h1 className="font-serif text-[15vw] leading-[0.8] tracking-tighter">
          THE
          <br />
          LEDGER
        </h1>
        <div className="mt-8 flex justify-between w-full max-w-4xl mx-auto px-4 font-mono text-xs tracking-widest uppercase">
          <span>Vol. 01</span>
          <span>2024 — 2025</span>
          <span>Portfolio</span>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center z-10 mix-blend-difference text-white">
        <span className="font-mono text-xs animate-bounce">SCROLL TO READ</span>
      </div>
    </section>
  );
}
