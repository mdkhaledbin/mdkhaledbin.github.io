import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-8">
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-primary/5 px-4 py-2 text-primary"
          >
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Static export ready for GitHub Pages
          </Badge>

          <div className="space-y-4">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
              Building a portfolio that feels deliberate, fast, and personal.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400 sm:text-xl">
              This scaffold is set up for a static Next.js export, a clean
              design system, and content that can evolve without needing a
              server.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
              Next.js 16
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
              TypeScript
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
              Tailwind CSS
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
              Framer Motion
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild href="/projects" size="lg" className="group">
              <span>
                View Projects
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </span>
            </Button>
            <Button asChild href="/contact" size="lg" variant="outline">
              <span>Contact</span>
            </Button>
          </div>

          <Card className="max-w-3xl border-neutral-200/80 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/60">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Sparkles size={16} />
                  Foundation complete
                </p>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  The next phases will add the hero, Bento grid, projects, blog,
                  and deployment polish.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Code2 size={16} />
                Ready to build
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
