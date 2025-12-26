"use client";

import { trackEditionSelection } from "@/lib/analytics";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [hoveredSide, setHoveredSide] = useState<"cyberpunk" | "magazine" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<"cyberpunk" | "magazine" | null>(null);
  const router = useRouter();

  const handleTransition = (edition: "cyberpunk" | "magazine", e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(edition);
    
    // Track edition selection
    trackEditionSelection(edition);
    
    // Navigate after animation starts
    setTimeout(() => {
      router.push(`/${edition}`);
    }, 1400);
  };

  return (
    <main className="h-screen w-full overflow-hidden flex relative">
      {/* Cyberpunk Side */}
      <Link
        href="/cyberpunk"
        onClick={(e) => handleTransition("cyberpunk", e)}
        className="relative w-1/2 h-full flex items-center justify-center group transition-all duration-500"
        style={{
          backgroundColor: "#050505",
          width: hoveredSide === "cyberpunk" ? "55%" : hoveredSide === "magazine" ? "45%" : "50%",
        }}
        onMouseEnter={() => setHoveredSide("cyberpunk")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
          <svg className="w-full h-full">
            <filter id="noise-cyberpunk">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-cyberpunk)" />
          </svg>
        </div>

        {/* Glowing grid effect */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(#00f0ff 1px, transparent 1px),
                linear-gradient(90deg, #00f0ff 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 text-center px-8"
        >
          <motion.div
            animate={{
              textShadow:
                hoveredSide === "cyberpunk"
                  ? "0 0 20px #00f0ff, 0 0 40px #00f0ff"
                  : "0 0 0px #00f0ff",
            }}
            transition={{ duration: 0.3 }}
            className="font-sans text-7xl md:text-9xl font-black tracking-tighter mb-6"
            style={{
              color: "#e0e0e0",
              fontFamily: "var(--font-unbounded)",
            }}
          >
            CYBER
            <br />
            PUNK
          </motion.div>
          <p
            className="font-mono text-sm md:text-base tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: "#00f0ff" }}
          >
            Terminal Edition
          </p>
          <motion.div
            className="mt-8 inline-block border border-[#00f0ff] px-6 py-3 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "#00f0ff" }}
          >
            Enter_System →
          </motion.div>
        </motion.div>

        {/* Scanline effect */}
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-1 opacity-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #00f0ff, transparent)",
          }}
        />
      </Link>

      {/* Magazine Side */}
      <Link
        href="/magazine"
        onClick={(e) => handleTransition("magazine", e)}
        className="relative w-1/2 h-full flex items-center justify-center group transition-all duration-500"
        style={{
          backgroundColor: "#f0f0f0",
          width: hoveredSide === "magazine" ? "55%" : hoveredSide === "cyberpunk" ? "45%" : "50%",
        }}
        onMouseEnter={() => setHoveredSide("magazine")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.05) 100%)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center px-8"
        >
          <motion.div
            animate={{
              letterSpacing: hoveredSide === "magazine" ? "0.05em" : "0em",
            }}
            transition={{ duration: 0.3 }}
            className="text-7xl md:text-9xl leading-[0.85] mb-6"
            style={{
              color: "#000000",
              fontFamily: "var(--font-playfair)",
              fontWeight: 400,
            }}
          >
            MAGA
            <br />
            ZINE
          </motion.div>
          <p
            className="font-mono text-sm md:text-base tracking-widest uppercase opacity-40 group-hover:opacity-80 transition-opacity"
            style={{ color: "#000000" }}
          >
            Editorial Edition
          </p>
          <motion.div
            className="mt-8 inline-block border border-black px-6 py-3 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "#000000" }}
          >
            Explore →
          </motion.div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          animate={{ scaleX: hoveredSide === "magazine" ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-black/20 w-1/2 pointer-events-none"
        />
      </Link>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-20 pointer-events-none"
        style={{
          left: hoveredSide === "cyberpunk" ? "55%" : hoveredSide === "magazine" ? "45%" : "50%",
          transition: "left 0.5s ease",
        }}
      />

      {/* Transition Overlays */}
      <AnimatePresence>
        {isTransitioning === "cyberpunk" && (
          <>
            {/* Glitchy digital portal effect */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="fixed inset-0 z-[9999] origin-left"
              style={{
                background: "linear-gradient(90deg, #050505 0%, #001a1a 50%, #050505 100%)",
              }}
            />
            {/* Animated grid overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1.2, times: [0, 0.5, 1] }}
              className="fixed inset-0 z-[9999] origin-left"
              style={{
                backgroundImage: `
                  linear-gradient(#00f0ff 2px, transparent 2px),
                  linear-gradient(90deg, #00f0ff 2px, transparent 2px)
                `,
                backgroundSize: "80px 80px",
              }}
            />
            {/* Scanlines */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.025,
                  ease: "easeInOut",
                }}
                className="fixed left-0 right-0 h-[4vh] z-[10000] origin-left"
                style={{
                  top: `${i * 4}%`,
                  background: "#00f0ff",
                  mixBlendMode: "screen",
                }}
              />
            ))}
            {/* Particle burst effect */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 30) * Math.PI * 2) * 300,
                  y: Math.sin((i / 30) * Math.PI * 2) * 300,
                  opacity: [1, 0.5, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.3 + i * 0.01,
                  ease: "easeOut",
                }}
                className="fixed top-1/2 left-1/2 w-2 h-2 z-[10000] rounded-full"
                style={{ background: "#00f0ff" }}
              />
            ))}
            {/* Glitch text with more dramatic animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1.1, 1, 1],
              }}
              transition={{ duration: 1.2, times: [0, 0.3, 0.7, 1] }}
              className="fixed inset-0 z-[10001] flex items-center justify-center"
            >
              <div className="font-mono text-4xl md:text-6xl text-[#00f0ff] font-black tracking-widest">
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px #00f0ff",
                      "0 0 30px #00f0ff, 0 0 60px #00f0ff",
                      "0 0 10px #00f0ff",
                    ],
                  }}
                  transition={{ duration: 1.2, times: [0, 0.5, 1] }}
                >
                  INITIALIZING...
                </motion.span>
              </div>
            </motion.div>
          </>
        )}

        {isTransitioning === "magazine" && (
          <>
            {/* Elegant triple-layer curtain wipe */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0%)" }}
              transition={{ duration: 1.4, ease: [0.83, 0, 0.17, 1] }}
              className="fixed inset-0 z-[9999]"
              style={{
                background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)",
              }}
            />
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0%)" }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.83, 0, 0.17, 1] }}
              className="fixed inset-0 z-[10000]"
              style={{
                background: "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%)",
              }}
            />
            {/* Soft radial fade overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5] }}
              transition={{ duration: 1.4, times: [0, 0.5, 1], ease: "easeOut" }}
              className="fixed inset-0 z-[10000]"
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)",
              }}
            />
            {/* Elegant text with refined animation */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                y: [30, 0, 0, -30],
                scale: [0.95, 1, 1, 1.05],
              }}
              transition={{ duration: 1.4, times: [0, 0.3, 0.7, 1], ease: [0.83, 0, 0.17, 1] }}
              className="fixed inset-0 z-[10001] flex flex-col items-center justify-center gap-4"
            >
              <div
                className="text-5xl md:text-7xl text-black leading-none tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Entering
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                className="h-px w-32 bg-black origin-center"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, times: [0, 0.3, 0.7, 1] }}
                className="font-mono text-xs uppercase tracking-[0.3em] text-black/60"
              >
                Editorial Edition
              </motion.div>
            </motion.div>
            {/* Subtle particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`mag-particle-${i}`}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  y: [-50, -200],
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.4 + i * 0.08,
                  ease: "easeOut",
                }}
                className="fixed w-1 h-1 rounded-full bg-black/20 z-[10000]"
                style={{
                  left: `${20 + i * 5}%`,
                  top: "60%",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
