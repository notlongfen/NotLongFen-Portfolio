"use client";

import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const handleScroll = (id: string) => {
    setMenuOpen(false);
    lenis?.scrollTo(`#${id}`);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md text-black border-b border-black/5 shadow-sm"
            : "bg-transparent text-black"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link
            href="/magazine"
            className="font-serif text-xl font-bold tracking-tighter"
          >
            NLF
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {["Work", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => handleScroll(item.toLowerCase())}
              className="hover:opacity-50 transition-opacity"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden font-mono text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          Menu
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <Menu onClose={() => setMenuOpen(false)} onNavigate={handleScroll} />
        )}
      </AnimatePresence>
    </>
  );
}

function Menu({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-xl text-black flex flex-col justify-center items-center"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-8 font-mono text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
      >
        Close
      </button>

      <div className="flex flex-col gap-8 text-center">
        {["Work", "About", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item.toLowerCase())}
            className="font-serif text-5xl md:text-7xl hover:italic transition-all duration-300"
          >
            {item}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
