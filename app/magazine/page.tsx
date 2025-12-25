import About from "@/components/b/About";
import Contact from "@/components/b/Contact";
import Hero from "@/components/b/Hero";
import SidebarNav from "@/components/b/SidebarNav";
import Work from "@/components/b/Work";

export default function Page() {
  return (
    <main className="w-full min-h-screen bg-[#f0f0f0] text-black selection:bg-black selection:text-white">
      <SidebarNav />
      <Hero />
      <Work />
      <About />
      <Contact />
    </main>
  );
}
