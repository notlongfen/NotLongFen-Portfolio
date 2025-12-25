"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "01_GENESIS", path: "/", id: "hero" },
  { name: "02_STACK", path: "#stack", id: "stack" },
  { name: "03_WORK", path: "#work", id: "work" },
  { name: "04_CONSENSUS", path: "#contact", id: "contact" },
];

export default function TerminalNav() {
  const [activeId, setActiveId] = useState("hero");
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when element is in the middle of viewport
      }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (id === "hero") {
      e.preventDefault();
      lenis?.scrollTo(0);
      return;
    }

    const element = document.getElementById(id);
    if (element && lenis) {
      e.preventDefault();
      lenis.scrollTo(element);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 p-1 bg-surface/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl shadow-black/50">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => handleNavClick(e, item.id)}
              className={clsx(
                "relative px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-mono tracking-widest transition-colors duration-300",
                isActive
                  ? "text-background font-bold"
                  : "text-foreground/60 hover:text-accent hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="hidden md:inline relative z-10">
                {item.name}
              </span>
              <span className="md:hidden relative z-10">
                {item.name.split("_")[1]}
              </span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
