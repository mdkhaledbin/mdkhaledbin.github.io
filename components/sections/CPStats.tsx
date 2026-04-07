"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Award, Target, TrendingUp, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import cpStats from "@/lib/data/cp-stats.json";

type PlatformStats = typeof cpStats.codeforces | typeof cpStats.codechef;

export function CPStats() {
  return (
    <section className="py-20" id="cp-stats">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-heading mb-4 font-bold">
            Competitive Programming
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
            Algorithmic problem-solving translates directly into production code
            quality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PlatformCard
            platform="Codeforces"
            icon={Trophy}
            gradientClass="from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900"
            stats={cpStats.codeforces}
            tone="orange"
          />

          <PlatformCard
            platform="CodeChef"
            icon={Award}
            gradientClass="from-primary/10 via-white to-neutral-50 dark:from-primary/15 dark:via-neutral-950 dark:to-neutral-900"
            stats={cpStats.codechef}
            tone="yellow"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Total Solved"
            value={(
              cpStats.codeforces.solvedProblems +
              cpStats.codechef.solvedProblems
            ).toString()}
            icon={Target}
          />
          <StatCard
            label="Max Rating"
            value={cpStats.codeforces.maxRating.toString()}
            icon={TrendingUp}
          />
          <StatCard
            label="Current Rank"
            value={cpStats.codeforces.rank}
            icon={Trophy}
          />
          <StatCard
            label="CodeChef Stars"
            value={`${cpStats.codechef.stars} ★`}
            icon={Award}
          />
        </div>
      </div>
    </section>
  );
}

function PlatformCard({
  platform,
  icon: Icon,
  gradientClass,
  stats,
  tone,
}: {
  platform: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  gradientClass: string;
  stats: PlatformStats;
  tone: "orange" | "yellow";
}) {
  const badgeClass =
    tone === "orange"
      ? "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-400"
      : "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";

  const iconClass = tone === "orange" ? "text-orange-500" : "text-yellow-500";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className={`interactive-card bg-linear-to-br p-8 ${gradientClass}`}>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-2xl font-bold">{platform}</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-400">
              @{stats.username}
            </p>
          </div>
          <Icon className={iconClass} size={32} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-neutral-700 dark:text-neutral-400">
              Current Rating
            </span>
            <span className="text-2xl font-bold">{stats.rating}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-700 dark:text-neutral-400">Rank</span>
            <Badge className={badgeClass}>
              {"rank" in stats ? stats.rank : `${stats.stars} Stars`}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-700 dark:text-neutral-400">
              Problems Solved
            </span>
            <span className="font-bold">{stats.solvedProblems}+</span>
          </div>

          {"maxRating" in stats ? (
            <div className="flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <span className="text-neutral-700 dark:text-neutral-400">
                Max Rating
              </span>
              <span className="font-bold text-primary">{stats.maxRating}</span>
            </div>
          ) : null}
        </div>

        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm text-primary hover:underline"
        >
          View Profile →
        </a>
      </Card>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Card className="interactive-card p-4 text-center">
      <Icon className="mx-auto mb-2 text-primary" size={24} />
      <p className="mb-1 text-2xl font-bold">{value}</p>
      <p className="text-xs text-neutral-700 dark:text-neutral-400">{label}</p>
    </Card>
  );
}
