"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import blogPosts from "@/lib/data/blog-posts.json";

type Post = (typeof blogPosts)[number];

export function Blog() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured).slice(0, 3);

  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900/50" id="blog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-heading mb-4 font-bold">Writing</h2>
            <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
              Thoughts on AI, system design, and lessons learned in production.
            </p>
          </div>
          <Link
            href="/blog"
            className="group hidden items-center gap-2 text-primary hover:underline md:inline-flex"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featuredPost ? <FeaturedPostCard post={featuredPost} /> : null}

          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}/`}>
      <Card className="group h-full cursor-pointer border-neutral-200 p-8 transition-all hover:border-primary/50 dark:border-neutral-800">
        <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
          Featured
        </Badge>

        <h3 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        <p className="mb-6 text-neutral-600 dark:text-neutral-400">
          {post.excerpt}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime} min read
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} />
            {post.views} views
          </div>
        </div>
      </Card>
    </Link>
  );
}

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}/`}>
        <Card className="group cursor-pointer border-neutral-200 p-6 transition-all hover:border-primary/50 dark:border-neutral-800">
          <h3 className="mb-2 font-bold transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          <p className="mb-3 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime} min</span>
            <span>•</span>
            <span>{post.views} views</span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
