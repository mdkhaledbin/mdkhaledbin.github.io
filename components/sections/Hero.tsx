"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  fadeInUp,
  magneticButton,
  staggerContainer,
} from "@/lib/utils/animations";

const quickStats = [
  "20+ Projects Shipped",
  "600+ GitHub Contributions",
  "3.70 CGPA SUST",
  "Sylhet, Bangladesh",
];

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden py-16">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8 text-center"
        >
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-2 text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium">
                Currently: Building autonomous AI agents
              </span>
            </Badge>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-display font-bold tracking-tight text-balance">
              Engineering AI systems
              <br />
              <span className="text-primary">that actually ship</span>
            </h1>

            <p className="mx-auto max-w-3xl text-xl text-neutral-600 dark:text-neutral-400 md:text-2xl">
              Full-stack engineer, AI specialist, and competitive programmer
              focused on turning ideas into reliable products.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-3 text-sm font-mono text-neutral-700 dark:text-neutral-400"
          >
            {quickStats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-neutral-300 bg-white/90 px-3 py-1 dark:border-neutral-800 dark:bg-neutral-900"
              >
                {stat}
              </span>
            ))}
            <span className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white/90 px-3 py-1 dark:border-neutral-800 dark:bg-neutral-900">
              <MapPin size={14} />
              Sylhet, Bangladesh
            </span>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
          >
            <Sparkles size={16} className="text-primary" />
            Open to opportunities • Next.js / AI projects
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
          >
            <Button
              asChild
              href="/projects"
              size="lg"
              className="group"
              {...magneticButton}
            >
              <div className="flex items-center gap-2 border px-5 py-3 text-neutral-800 dark:text-neutral-400">
                View My Work
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </div>
            </Button>
            <Button
              asChild
              href="/contact"
              size="lg"
              variant="outline"
              {...magneticButton}
            >
              <span>Get in Touch</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
