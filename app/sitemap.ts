import type { MetadataRoute } from "next";
import projectsData from "@/lib/data/projects.json";
import blogPosts from "@/lib/data/blog-posts.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mdkhaledbin.me";

  const projects: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${baseUrl}/projects/#${project.slug}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogs: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects,
    ...blogs,
  ];
}
