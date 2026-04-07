"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  Grid3x3,
  List,
  Search,
  Star,
} from "lucide-react";
import projectsData from "@/lib/data/projects.json";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ViewMode = "grid" | "list";
type Project = (typeof projectsData)[number];

export function Projects() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const list = Array.from(
      new Set(projectsData.map((project) => project.category)),
    );
    return ["all", ...list];
  }, []);

  const techStacks = useMemo(() => {
    const list = Array.from(
      new Set(projectsData.flatMap((project) => project.techStack)),
    );
    return ["all", ...list];
  }, []);

  const filteredProjects = projectsData.filter((project) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesTech =
      selectedTech === "all" || project.techStack.includes(selectedTech);
    const matchesSearch =
      query.length === 0 ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(query));

    return matchesCategory && matchesTech && matchesSearch;
  });

  return (
    <section className="py-20" id="projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-heading mb-4 font-bold">The Lab</h2>
          <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
            A working archive of product builds, AI experiments, and systems
            shipped with intent.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full max-w-md">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects, technologies, outcomes..."
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </label>

            <div className="inline-flex gap-2 rounded-xl border border-neutral-200 p-1 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`rounded-lg p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                    : "text-neutral-500"
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`rounded-lg p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                    : "text-neutral-500"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {techStacks.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setSelectedTech(tech)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTech === tech
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-neutral-200 text-neutral-600 hover:border-primary/40 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              viewMode={viewMode}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-neutral-500">
            No projects found matching your criteria.
          </div>
        ) : null}

        <Dialog
          open={Boolean(selectedProject)}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProject(null);
            }
          }}
        >
          {selectedProject ? (
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-lg font-medium text-primary">
                  {selectedProject.tagline}
                </p>

                {selectedProject.metrics ? (
                  <div className="grid gap-4 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900 md:grid-cols-3">
                    {selectedProject.metrics.users ? (
                      <MetricBlock
                        label="Users"
                        value={selectedProject.metrics.users}
                      />
                    ) : null}
                    {selectedProject.metrics.performance ? (
                      <MetricBlock
                        label="Performance"
                        value={selectedProject.metrics.performance}
                      />
                    ) : null}
                    {selectedProject.metrics.impact ? (
                      <div className="md:col-span-3">
                        <p className="text-xs text-neutral-500">Impact</p>
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          {selectedProject.metrics.impact}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <section>
                  <h3 className="mb-2 font-bold">About</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {selectedProject.fullDescription ||
                      selectedProject.description}
                  </p>
                </section>

                <section>
                  <h3 className="mb-3 font-bold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>

                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.demoUrl ? (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button>
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </Button>
                    </a>
                  ) : null}

                  {selectedProject.githubUrl ? (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="outline">
                        <GitBranch size={16} className="mr-2" />
                        View Code
                      </Button>
                    </a>
                  ) : null}
                </div>
              </div>
            </DialogContent>
          ) : null}
        </Dialog>
      </div>
    </section>
  );
}

function MetricBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  viewMode,
  onClick,
}: {
  project: Project;
  index: number;
  viewMode: ViewMode;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="w-full text-left"
    >
      <Card
        className={`group h-full overflow-hidden border-neutral-200 transition-all hover:border-primary/50 dark:border-neutral-800 ${
          viewMode === "list" ? "md:flex md:items-stretch" : ""
        }`}
      >
        <div
          className={`relative bg-linear-to-br from-primary/20 to-primary/5 ${
            viewMode === "list" ? "md:w-56 md:shrink-0" : "aspect-video"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/45 opacity-0 transition-opacity group-hover:opacity-100">
            <p className="text-sm font-medium text-white">View Details</p>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-primary">
                {project.keyInnovation}
              </p>
            </div>
            {project.featured ? (
              <Star size={18} className="fill-yellow-500 text-yellow-500" />
            ) : null}
          </div>

          <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 ? (
              <Badge variant="secondary" className="text-xs">
                +{project.techStack.length - 3}
              </Badge>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
            <Badge
              variant={project.status === "shipped" ? "default" : "outline"}
              className="text-xs"
            >
              {project.status}
            </Badge>

            <div
              className="flex gap-1"
              aria-label={`Difficulty ${project.difficulty} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, ratingIndex) => (
                <Star
                  key={ratingIndex}
                  size={12}
                  className={
                    ratingIndex < project.difficulty
                      ? "fill-primary text-primary"
                      : "text-neutral-300 dark:text-neutral-700"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.button>
  );
}
