"use client";

import { projects } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function ClientPage({
  project,
}: {
  project: (typeof projects)[0];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Extract year from stats or default to current year
  const yearStat = project.stats.find((s) => s.label === "DATE");
  const year = yearStat ? yearStat.value.split("/")[1] : "2024";

  return (
    <main className="w-full min-h-screen bg-[#f0f0f0] text-black">
      {/* Hero */}
      <section
        ref={containerRef}
        className="relative h-[80vh] w-full overflow-hidden flex items-end p-8 md:p-16"
      >
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="w-full h-full bg-neutral-800">
            {/* Placeholder for hero image/video */}
            <div className="w-full h-full opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
        </motion.div>

        <div className="relative z-10 w-full">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-6xl md:text-9xl leading-[0.8] text-white mix-blend-difference mb-8"
          >
            {project.title}
          </motion.h1>

          <div className="flex justify-between items-end text-white mix-blend-difference font-mono text-xs uppercase tracking-widest border-t border-white/50 pt-4">
            <span>Case Study {project.id}</span>
            <span>{year}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-32 flex flex-col gap-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest mb-4 block opacity-50">
                  Role
                </span>
                <p className="font-sans text-xl">
                  Lead Developer
                  <br />
                  UI/UX Design
                </p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest mb-4 block opacity-50">
                  Stack
                </span>
                <ul className="font-sans text-xl flex flex-col gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
              {project.link && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest mb-4 block opacity-50">
                    Live
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xl underline hover:opacity-50 transition-opacity"
                  >
                    View Project ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Main Text */}
          <div className="w-full md:w-2/3">
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-12">
              {project.description}
            </h2>
            <div className="font-sans text-lg md:text-xl leading-relaxed opacity-80 flex flex-col gap-8">
              <p>{project.longDescription || project.description}</p>

              {project.features && (
                <div className="mt-8">
                  <h3 className="font-serif text-2xl mb-6">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 pb-24">
        <Link
          href="/magazine"
          className="font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
        >
          ← Back to Overview
        </Link>
      </div>
    </main>
  );
}
