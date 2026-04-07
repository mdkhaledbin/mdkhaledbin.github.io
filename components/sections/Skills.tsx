"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import skillsData from "@/lib/data/skills.json";
import { Badge } from "@/components/ui/badge";

type Skill = (typeof skillsData)[number];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const list = Array.from(new Set(skillsData.map((skill) => skill.category)));
    return ["all", ...list];
  }, []);

  const filteredSkills =
    selectedCategory === "all"
      ? skillsData
      : skillsData.filter((skill) => skill.category === selectedCategory);

  return (
    <section className="py-20" id="skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-heading mb-4 font-bold">The Arsenal</h2>
          <p className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
            Tools and technologies used in production builds, sorted by
            real-world usage and confidence.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const opacity = 0.25 + (skill.proficiency / 100) * 0.6;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ scale: 1.04, y: -3 }}
      className="group"
    >
      <div
        className="cursor-pointer rounded-xl border border-neutral-200 p-6 transition-all hover:border-primary/50 dark:border-neutral-800"
        style={{ backgroundColor: `rgba(79, 70, 229, ${opacity * 0.13})` }}
      >
        <div className="space-y-3 text-center">
          <h3 className="text-lg font-bold">{skill.name}</h3>

          <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 + 0.15, duration: 0.5 }}
              className="h-full bg-primary"
            />
          </div>

          <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>{skill.proficiency}% proficient</span>
            <span>{skill.projectCount} projects</span>
          </div>

          <Badge variant="outline" className="text-xs">
            {skill.category}
          </Badge>

          <p className="text-xs text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100">
            Used in {skill.usageFrequency}% of projects
          </p>
        </div>
      </div>
    </motion.div>
  );
}
