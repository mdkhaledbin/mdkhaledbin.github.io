import { BentoGrid } from "@/components/sections/BentoGrid";
import { Blog } from "@/components/sections/Blog";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { LazyCPStats } from "@/components/sections/LazyCPStats";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <Experience />
      <Skills />
      <LazyCPStats />
      <Projects />
      <Blog />
    </>
  );
}
