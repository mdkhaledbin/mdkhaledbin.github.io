import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import blogPosts from "@/lib/data/blog-posts.json";

type BlogPost = (typeof blogPosts)[number];

function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return {
      title: "Post Not Found | MD Khaled Bin",
    };
  }

  return {
    title: `${post.title} | MD Khaled Bin`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-primary">
          Blog
        </p>
        <h1 className="mb-4 text-3xl font-bold">Post not found</h1>
        <Link href="/blog" className="text-primary hover:underline">
          Return to blog
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary dark:text-neutral-400"
      >
        <ArrowLeft size={16} />
        Back to blog
      </Link>

      <div className="mb-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <h1 className="mb-6 text-4xl font-bold tracking-tight">{post.title}</h1>

      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
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

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <p>{post.excerpt}</p>
        <p>
          This route is ready for MDX-backed long-form content. Add an .mdx file
          for this slug and wire a content loader in the next iteration.
        </p>
      </div>
    </article>
  );
}
