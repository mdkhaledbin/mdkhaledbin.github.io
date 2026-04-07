import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects | MD Khaled Bin",
  description:
    "Browse AI-powered systems, web products, and engineering experiments.",
};

export default function ProjectsPage() {
  return <Projects />;
}
