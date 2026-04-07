import type { Metadata } from "next";
import { Blog } from "@/components/sections/Blog";

export const metadata: Metadata = {
  title: "Blog | MD Khaled Bin",
  description:
    "Technical writings on AI, system design, and software engineering.",
};

export default function BlogPage() {
  return (
    <div className="pt-4">
      <Blog />
    </div>
  );
}
