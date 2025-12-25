"use client";

import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Stack from "@/components/sections/Stack";
import Work from "@/components/sections/Work";
import { unstable_noStore } from 'next/cache';

// Prevent static generation for this page
unstable_noStore();

export default function Home() {
  return (
    <main className="w-full min-h-screen text-foreground">
      <Hero />
      <Stack />
      <Work />
      <Contact />
    </main>
  );
}
