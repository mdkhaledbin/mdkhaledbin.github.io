"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
} from "lucide-react";
import experienceData from "@/lib/data/experience.json";
import { Badge } from "@/components/ui/badge";

type ExperienceItem = (typeof experienceData)[number];

export function Experience() {
  return (
    <section
      className="bg-neutral-50 py-20 dark:bg-neutral-900/50"
      id="experience"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-heading mb-4 font-bold">The Journey</h2>
          <p className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
            From classroom projects to production systems, each role sharpened
            my approach to shipping.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-neutral-200 dark:bg-neutral-800 md:block" />

          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const isAcademic = /university|sust|education/i.test(
    `${experience.company} ${experience.role}`,
  );

  const start = new Date(experience.startDate);
  const end = experience.current ? new Date() : new Date(experience.endDate);
  const months = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)),
  );

  return (
    <motion.article
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`relative mb-12 md:mb-16 ${isEven ? "md:pr-[50%]" : "md:pl-[50%]"}`}
    >
      <div className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-neutral-50 bg-primary dark:border-neutral-950 md:block">
        {experience.current ? (
          <span className="absolute -left-1 -top-1 inline-flex h-6 w-6 animate-ping rounded-full bg-primary/60" />
        ) : null}
      </div>

      <div
        className={`rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:border-primary/50 dark:border-neutral-800 dark:bg-neutral-900 ${
          isEven ? "md:mr-8" : "md:ml-8"
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              {isAcademic ? (
                <GraduationCap size={22} />
              ) : (
                <Briefcase size={22} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">{experience.company}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {experience.role}
              </p>
            </div>
          </div>

          {experience.current ? (
            <Badge className="border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400">
              Current
            </Badge>
          ) : null}
        </div>

        <div className="mb-4 flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>
              {start.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
              {" - "}
              {experience.current
                ? "Present"
                : end.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
              <span className="ml-1 text-xs">({months} months)</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{experience.location}</span>
          </div>

          <Badge variant="outline" className="text-xs">
            {experience.type}
          </Badge>
        </div>

        <p className="mb-4 text-sm text-neutral-700 dark:text-neutral-300">
          {experience.description}
        </p>

        {experience.achievements?.length ? (
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium text-neutral-500">
              Key Achievements
            </p>
            <ul className="space-y-1">
              {experience.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  <span className="mt-1 text-primary">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mb-4 flex flex-wrap gap-2">
          {experience.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {experience.companyUrl ? (
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View Company
            <ExternalLink size={14} />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
