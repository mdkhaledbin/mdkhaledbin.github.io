"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import skillsData from "@/lib/data/skills.json";
import * as LucideIcons from "lucide-react";

type Skill = (typeof skillsData)[number];

export function Skills() {
  const grouped = useMemo(() => {
    const buckets = new Map<string, Skill[]>();
    for (const skill of skillsData) {
      if (!buckets.has(skill.category)) {
        buckets.set(skill.category, []);
      }
      buckets.get(skill.category)?.push(skill);
    }

    const order = ["Frontend", "Backend", "Database", "Tools"];

    return order
      .filter((category) => buckets.has(category))
      .map((category) => ({
        category,
        skills: buckets.get(category) || [],
      }));
  }, []);

  return (
    <section className="py-16" id="skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-heading mb-4 font-bold">The Arsenal</h2>
          <p className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
            A focused snapshot of tools across frontend, backend, databases, and engineering tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {grouped.map((group, index) => (
            <CategoryCard
              key={group.category}
              category={group.category}
              skills={group.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  skills,
  index,
}: {
  category: string;
  skills: Skill[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 dark:border-neutral-800/80 dark:bg-neutral-900/40"
    >
      <h3 className="mb-5 text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
        {category}
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => {
          const Icon = (LucideIcons as any)[skill.icon] || LucideIcons.Code;
          return (
            <div
              key={skill.id}
              className="flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-white px-3 py-2 text-sm shadow-sm transition-all hover:scale-[1.02] hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950/60 dark:text-neutral-200 dark:hover:border-neutral-700"
            >
              <div className="flex items-center justify-center text-primary/80 dark:text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <span className="font-medium text-neutral-700 dark:text-neutral-200">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
