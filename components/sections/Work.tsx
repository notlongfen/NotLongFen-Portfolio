"use client";

import { Project, projects } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Work() {
  return (
    <section
      className="relative z-10 w-full py-20 md:py-32 bg-background"
      id="work"
    >
      <div className="container mx-auto px-8">
        <div className="flex flex-col gap-2 mb-32">
          <h2 className="text-xs font-mono tracking-widest text-accent">
            // PROOF_OF_WORK
          </h2>
          <h3 className="text-4xl md:text-6xl font-sans font-bold">
            SELECTED_TRANSACTIONS
          </h3>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/10 pt-8"
    >
      <div className="md:col-span-2 font-mono text-sm text-accent">
        {project.id}
      </div>

      <div className="md:col-span-6 flex flex-col gap-8">
        <div className="relative group w-full">
          <h4
            className="text-4xl md:text-6xl font-sans font-bold leading-none hover:text-accent transition-colors duration-300 cursor-pointer truncate w-full"
            title={project.title}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {project.title}
          </h4>
          {/* Tooltip for full title on hover */}
          <span
            className={`pointer-events-none fixed z-20 px-4 py-2 rounded bg-black text-accent text-xs font-mono transition-opacity duration-200 shadow-xl border border-accent/30 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y + 10,
              maxWidth: '300px',
              wordBreak: 'break-all',
              transform: mousePosition.x > window.innerWidth - 320 ? 'translateX(-100%)' : 'none',
            }}
          >
            {project.title}
          </span>
        </div>
        <p className="text-xl text-foreground/60 max-w-md">
          {project.description}
        </p>
        <div className="flex gap-4 flex-wrap">
          {project.tech.map((t: string) => (
            <span
              key={t}
              className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono hover:bg-white/10 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end">
        <div className="grid grid-cols-2 gap-8">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-xs font-mono text-foreground/40">
                {stat.label}
              </span>
              <span className="text-2xl font-sans font-bold">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap mt-8 md:mt-0 justify-end">
          <Link
            href={`/work/${project.slug}`}
            className="px-6 py-3 bg-white text-black font-mono text-sm font-bold hover:bg-accent transition-colors inline-block text-center"
          >
            VIEW_CASE_STUDY
          </Link>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 text-foreground font-mono text-sm font-bold hover:bg-white/10 transition-colors inline-block text-center"
            >
              SOURCE
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
