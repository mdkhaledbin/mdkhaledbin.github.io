"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Code2,
  ExternalLink,
  GitBranch,
  MapPin,
  Trophy,
  TrendingUp,
} from "lucide-react";
import cpStats from "@/lib/data/cp-stats.json";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cards = [
  {
    id: "featured-project",
    className: "md:col-span-2 md:row-span-2",
    icon: Code2,
    title: "AI Data Brain",
    subtitle: "Voice-native intelligence for collaborative tables",
    body: "Sub-100ms realtime sync with Claude MCP-driven database reasoning.",
    gradient:
      "from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900",
    badges: ["Next.js", "Claude MCP", "MongoDB"],
  },
  {
    id: "cp-stats",
    className: "md:row-span-2",
    icon: Trophy,
    title: "Competitive Programming",
    subtitle: `${cpStats.codeforces.rating} rating`,
    body: `Codeforces ${cpStats.codeforces.rank} • CodeChef ${cpStats.codechef.stars}⭐`,
    gradient:
      "from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900",
    footerDetails: [
      {
        label: "Solved",
        value: `${cpStats.codeforces.solvedProblems + cpStats.codechef.solvedProblems}+`,
      },
      { label: "Max", value: `${cpStats.codeforces.maxRating}` },
    ],
  },
  {
    id: "location",
    className: "",
    icon: MapPin,
    title: "Sylhet, Bangladesh",
    subtitle: "Remote-first collaboration",
    body: "Based in Sylhet and open to async-friendly product work.",
    gradient:
      "from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900",
  },
  {
    id: "github-activity",
    className: "md:col-span-2",
    icon: GitBranch,
    title: "GitHub Activity",
    subtitle: "Shipping momentum",
    body: "600+ contributions this year with a focus on product, AI, and tooling work.",
    gradient:
      "from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900",
    highlight: "45 day streak",
  },
  {
    id: "latest-writing",
    className: "md:col-span-2",
    icon: BookOpen,
    title: "Latest Writing",
    subtitle: "Building RAG systems with Claude MCP",
    body: "A practical breakdown of how I think about agentic workflows and retrieval.",
    gradient:
      "from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900",
    details: [{ label: "Read time", value: "5 min" }],
  },
  {
    id: "achievement",
    className: "",
    icon: Award,
    title: "Reactive Accelerator",
    subtitle: "Champion",
    body: "Hands-on recognition for building and shipping practical AI workflows.",
    gradient:
      "from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900",
    cta: {
      label: "View Certificate",
      href: "https://learnwithsumit.com/certificates/verify/LWSCTXN-YKS3LO66",
    },
  },
  {
    id: "focus",
    className: "",
    icon: TrendingUp,
    title: "Current Focus",
    subtitle: "Next.js + AI products",
    body: "Designing interfaces and systems that ship cleanly on static hosting.",
    gradient:
      "from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900",
  },
];

export function BentoGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-heading mb-4 font-bold">At a Glance</h2>
          <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
            A compact view of the work, momentum, and signals that define the
            portfolio right now.
          </p>
        </motion.div>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card, index) => {
            const hasMetaPanel = Boolean(card.details || card.cta);
            const hasDetails = Boolean(card.details?.length);
            const hasCta = Boolean(card.cta);
            const panelWidthClass = hasDetails
              ? "w-[52%]"
              : hasCta
                ? "w-fit max-w-[46%]"
                : "";
            const contentPaddingClass = hasDetails
              ? "pr-[52%]"
              : hasCta
                ? ""
                : "";
            const headingPaddingClass = hasCta && !hasDetails ? "pr-28" : "";
            const headingTitleClass =
              hasCta && !hasDetails ? "text-xl" : "text-2xl";
            const bodyClampClass =
              hasCta && !hasDetails ? "line-clamp-2" : "line-clamp-3";

            return (
              <BentoCard
                key={card.id}
                className={card.className}
                gradient={card.gradient}
                delay={index * 0.06}
              >
                <div className="relative h-full">
                  {hasMetaPanel ? (
                    <div
                      className={`absolute right-0 top-0 z-10 flex ${panelWidthClass} flex-col items-end gap-2`}
                    >
                      {card.details ? (
                        <div className="space-y-2 rounded-xl border border-neutral-300/80 bg-white/85 px-3 py-2 text-xs shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/90">
                          {card.details.map((detail) => (
                            <div
                              key={detail.label}
                              className="flex items-center justify-between gap-3"
                            >
                              <span className="text-neutral-500">
                                {detail.label}
                              </span>
                              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {card.cta ? (
                        <a
                          href={card.cta.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex max-w-full items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
                        >
                          <span className="truncate">{card.cta.label}</span>
                          <ExternalLink size={12} className="shrink-0" />
                        </a>
                      ) : null}
                    </div>
                  ) : null}

                  <div
                    className={`flex h-full min-h-0 flex-col ${contentPaddingClass}`}
                  >
                    <div className="space-y-3">
                      <card.icon className="text-primary" size={28} />
                      <div className={headingPaddingClass}>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                          {card.subtitle}
                        </p>
                        <h3
                          className={`mt-2 font-bold leading-tight ${headingTitleClass}`}
                        >
                          {card.title}
                        </h3>
                      </div>
                      <p
                        className={`${bodyClampClass} text-sm text-neutral-600 dark:text-neutral-400`}
                      >
                        {card.body}
                      </p>
                    </div>

                    <div className="mt-auto space-y-3 pt-4">
                      {card.footerDetails ? (
                        <div className="grid gap-3 border-t border-neutral-200 pt-3 text-sm dark:border-neutral-800">
                          {card.footerDetails.map((detail) => (
                            <div
                              key={detail.label}
                              className="flex items-center justify-between"
                            >
                              <span className="text-neutral-500">
                                {detail.label}
                              </span>
                              <span className="font-semibold">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {card.badges ? (
                        <div className="flex flex-wrap gap-2">
                          {card.badges.map((badge) => (
                            <Badge
                              key={badge}
                              variant="secondary"
                              className="rounded-full"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      ) : null}

                      {card.highlight ? (
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          {card.highlight}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </BentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  children,
  className = "",
  gradient = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      <Card
        className={`interactive-card h-full cursor-pointer overflow-hidden bg-linear-to-br p-6 ${gradient}`}
      >
        {children}
      </Card>
    </motion.div>
  );
}
