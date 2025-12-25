"use client";

import GenesisBlock from "@/components/canvas/GenesisBlock";
import GlitchText from "@/components/dom/GlitchText";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Code-split the 3D Scene component to reduce initial bundle size
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-background animate-pulse" />
  ),
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] flex flex-col justify-end p-8 md:p-16 overflow-hidden"
    >
      {/* R3F Background */}
      <Scene className="fixed inset-0 z-0 pointer-events-none">
        <GenesisBlock />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Scene>

      {/* DOM Overlay */}
      <div className="relative z-10 pointer-events-none mix-blend-difference">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col gap-2"
        >
          <h2 className="text-sm font-mono tracking-widest text-accent">
            <GlitchText text="// GENESIS_BLOCK_INIT" delay={1} />
          </h2>
          <h1 className="text-6xl md:text-9xl font-sans font-bold leading-none tracking-tighter uppercase">
            <GlitchText text="NotLongFen" delay={1.5} />
          </h1>
          <div className="flex flex-col md:flex-row gap-8 mt-4">
            <p className="font-mono text-sm md:text-base max-w-md opacity-80">
              <GlitchText text="BLOCKCHAIN ARCHITECT" delay={2} /> <br />
              <GlitchText text="FULLSTACK WEB3 DEVELOPER" delay={2.2} />
            </p>
            <p className="font-mono text-xs md:text-sm max-w-md opacity-60 self-end">
              HASH: 0x1a...9f2c <br />
              STATUS: BUILDING_PARACHAINS...
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
