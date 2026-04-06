import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | MD Khaled Bin",
  description: "Projects route placeholder for the portfolio foundation.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Project gallery coming next.
        </h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          This route is already wired for the future projects showcase and
          static JSON-backed content.
        </p>
      </div>
    </section>
  );
}
