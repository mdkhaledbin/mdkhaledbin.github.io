"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Briefcase,
  Code,
  ExternalLink,
  FileText,
  GitBranch,
  Home,
  Mail,
  Search,
} from "lucide-react";
import projectsData from "@/lib/data/projects.json";
import blogPosts from "@/lib/data/blog-posts.json";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    const openFromTrigger = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openFromTrigger);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openFromTrigger);
    };
  }, []);

  const navigate = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-70 bg-neutral-900/55 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Menu"
        aria-labelledby="command-menu-title"
        className="fixed left-1/2 top-[20%] z-80 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
      >
        <h2 id="command-menu-title" className="sr-only">
          Command Menu
        </h2>
        <div className="flex items-center border-b border-neutral-300 px-4 dark:border-neutral-800">
          <Search className="mr-3 text-neutral-500" size={18} />
          <Command.Input
            placeholder="Search projects, posts, or navigate..."
            className="flex-1 bg-transparent py-4 text-neutral-900 outline-none placeholder:text-neutral-500 dark:text-neutral-50"
          />
        </div>

        <Command.List className="max-h-96 overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-neutral-500">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Pages"
            className="px-2 py-2 text-xs font-medium text-neutral-500"
          >
            <CommandItem icon={Home} onSelect={() => navigate("/")}>
              Home
            </CommandItem>
            <CommandItem icon={Code} onSelect={() => navigate("/projects")}>
              Projects
            </CommandItem>
            <CommandItem icon={FileText} onSelect={() => navigate("/blog")}>
              Blog
            </CommandItem>
            <CommandItem icon={Mail} onSelect={() => navigate("/contact")}>
              Contact
            </CommandItem>
          </Command.Group>

          <Command.Group
            heading="Projects"
            className="px-2 py-2 text-xs font-medium text-neutral-500"
          >
            {projectsData.map((project) => (
              <CommandItem
                key={project.id}
                icon={Code}
                onSelect={() => navigate("/projects")}
              >
                {project.title}
              </CommandItem>
            ))}
          </Command.Group>

          <Command.Group
            heading="Blog Posts"
            className="px-2 py-2 text-xs font-medium text-neutral-500"
          >
            {blogPosts.map((post) => (
              <CommandItem
                key={post.slug}
                icon={FileText}
                onSelect={() => navigate(`/blog/${post.slug}/`)}
              >
                {post.title}
              </CommandItem>
            ))}
          </Command.Group>

          <Command.Group
            heading="External"
            className="px-2 py-2 text-xs font-medium text-neutral-500"
          >
            <CommandItem
              icon={GitBranch}
              onSelect={() =>
                window.open("https://github.com/mdkhaledbin", "_blank")
              }
            >
              GitHub Profile
            </CommandItem>
            <CommandItem
              icon={Briefcase}
              onSelect={() =>
                window.open(
                  "https://www.linkedin.com/in/md-khaled-bin-814a4b225/",
                  "_blank",
                )
              }
            >
              LinkedIn Profile
            </CommandItem>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-neutral-300 px-4 py-2 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          <span>Type to search...</span>
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-neutral-200 bg-neutral-100 px-2 py-1 dark:border-neutral-700 dark:bg-neutral-800">
              ↑↓
            </kbd>
            <span>navigate</span>
            <kbd className="rounded border border-neutral-200 bg-neutral-100 px-2 py-1 dark:border-neutral-700 dark:bg-neutral-800">
              Enter
            </kbd>
            <span>select</span>
            <kbd className="rounded border border-neutral-200 bg-neutral-100 px-2 py-1 dark:border-neutral-700 dark:bg-neutral-800">
              Esc
            </kbd>
            <span>close</span>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}

function CommandItem({
  children,
  icon: Icon,
  onSelect,
}: {
  children: ReactNode;
  icon: ComponentType<{ size?: number; className?: string }>;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-colors data-[selected=true]:border-primary/30 data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800"
    >
      <Icon size={16} className="text-neutral-500" />
      <span className="text-sm">{children}</span>
      <ExternalLink size={14} className="ml-auto text-neutral-400" />
    </Command.Item>
  );
}
