"use client";

import { projects } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function Work() {
  return (
    <section
      id="work"
      className="relative w-full bg-[#f0f0f0] text-black py-32"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-40">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const isEven = index % 2 === 0;

  // Extract year from stats or default to current year
  const yearStat = project.stats.find((s) => s.label === "DATE");
  const year = yearStat ? yearStat.value.split("/")[1] : "2024";

  // Use first tech as category
  const category = project.tech[0] || "Development";

  return (
    <div
      ref={ref}
      className={`relative flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 md:gap-0 items-center py-12`}
    >
      <Link
        href={`/magazine/${project.slug}`}
        className={`w-full md:w-[60%] aspect-[16/9] relative overflow-hidden group ${
          isEven ? "md:mr-[-10%]" : "md:ml-[-10%]"
        } z-0 block`}
      >
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-700 ease-out"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          >
            {/* Placeholder video - would be dynamic in real app */}
            <source
              src="https://cdn.coverr.co/videos/coverr-abstract-digital-tunnel-4508/1080p.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
      </Link>

      <div
        className={`w-full md:w-[50%] z-10 bg-white p-8 md:p-12 shadow-2xl ${
          isEven ? "md:mt-24" : "md:mb-24"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-baseline gap-4 border-b border-black/10 pb-4">
            <span className="font-mono text-xs">{project.id}</span>
            <span className="font-mono text-xs uppercase">{category}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[0.9]">
            <Link
              href={`/magazine/${project.slug}`}
              className="hover:opacity-70 transition-opacity"
            >
              {project.title}
            </Link>
          </h2>
          <p className="font-sans text-lg leading-relaxed opacity-80">
            {project.description}
          </p>
          <div className="pt-8 flex justify-between items-end">
            <span className="font-mono text-xs text-neutral-400">{year}</span>
            <Link
              href={`/magazine/${project.slug}`}
              className="font-mono text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
            >
              Read Case Study
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
