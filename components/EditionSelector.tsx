"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditionSelector() {
  const pathname = usePathname();
  
  const isCyberpunk = pathname?.startsWith("/cyberpunk") || pathname === "/";
  const isMagazine = pathname?.startsWith("/magazine");
  const isHome = pathname === "/";

  // Different styling based on current edition
  const isDarkMode = isCyberpunk;

  return (
    <div className="fixed top-4 right-4 z-[9997] flex items-center gap-2">
      <div
        className={`flex items-center gap-1 p-1 rounded-full backdrop-blur-md transition-all duration-300 ${
          isDarkMode
            ? "bg-black/40 border border-white/10"
            : "bg-white/40 border border-black/10"
        }`}
      >
        {/* Home Button */}
        <Link
          href="/"
          className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
            isHome
              ? isDarkMode
                ? "text-black"
                : "text-white"
              : isDarkMode
              ? "text-white/60 hover:text-white/90"
              : "text-black/60 hover:text-black/90"
          }`}
        >
          {isHome && (
            <motion.div
              layoutId="edition-selector-bg"
              className={`absolute inset-0 rounded-full ${
                isDarkMode ? "bg-[#00f0ff]" : "bg-black"
              }`}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">Home</span>
        </Link>

        {/* Cyberpunk Button */}
        <Link
          href="/cyberpunk"
          className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
            isCyberpunk && !isHome
              ? isDarkMode
                ? "text-black"
                : "text-white"
              : isDarkMode
              ? "text-white/60 hover:text-white/90"
              : "text-black/60 hover:text-black/90"
          }`}
        >
          {isCyberpunk && !isHome && (
            <motion.div
              layoutId="edition-selector-bg"
              className={`absolute inset-0 rounded-full ${
                isDarkMode ? "bg-[#00f0ff]" : "bg-black"
              }`}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">Cyberpunk</span>
        </Link>

        {/* Magazine Button */}
        <Link
          href="/magazine"
          className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
            isMagazine
              ? isDarkMode
                ? "text-black"
                : "text-white"
              : isDarkMode
              ? "text-white/60 hover:text-white/90"
              : "text-black/60 hover:text-black/90"
          }`}
        >
          {isMagazine && (
            <motion.div
              layoutId="edition-selector-bg"
              className={`absolute inset-0 rounded-full ${
                isDarkMode ? "bg-[#00f0ff]" : "bg-black"
              }`}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">Magazine</span>
        </Link>
      </div>
    </div>
  );
}
