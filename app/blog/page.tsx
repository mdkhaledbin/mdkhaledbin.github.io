import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | MD Khaled Bin",
  description:
    "Technical writing and notes will live here once the content layer is added.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Blog
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Writing layer coming next.
        </h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          This route is in place so the static portfolio structure is complete.
          The content phase will plug in blog data and MDX later.
        </p>
      </div>
    </section>
  );
}
