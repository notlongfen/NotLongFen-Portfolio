"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SidebarNav() {
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    lenis?.scrollTo(`#${id}`);
  };

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 mix-blend-difference text-white">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group flex items-center gap-4"
        >
          <div className="relative flex items-center justify-center w-3 h-3">
            <motion.div
              animate={{
                scale: activeSection === section.id ? 1 : 0,
                opacity: activeSection === section.id ? 1 : 0,
              }}
              className="absolute w-2 h-2 bg-white rounded-full"
            />
            <div className="w-1 h-1 bg-white/50 rounded-full group-hover:bg-white transition-colors" />
          </div>
          <span
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
              activeSection === section.id
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 group-hover:opacity-50 group-hover:translate-x-0"
            }`}
          >
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
