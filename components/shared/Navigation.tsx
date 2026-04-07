"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-300/80 bg-white/85 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-background/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 transition-transform duration-150 hover:scale-[1.03]"
          aria-label="Bin Home"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300 bg-white text-sm font-bold text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
            Mr
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] text-neutral-900 dark:text-neutral-100">
            BIN
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-150 group-hover:scale-125" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-neutral-300/80 bg-neutral-50/90 px-3 py-1.5 text-sm font-medium text-neutral-800 transition-all duration-150 hover:scale-[1.03] hover:border-neutral-400 hover:bg-white hover:text-neutral-900 dark:border-transparent dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
            className="hidden items-center gap-2 rounded-full border border-neutral-300/90 bg-neutral-100/95 px-3 py-1 text-xs text-neutral-700 shadow-sm transition-all duration-150 hover:scale-[1.03] hover:bg-white hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-200 md:flex"
            aria-label="Open search"
          >
            <kbd className="rounded border border-neutral-200 bg-neutral-100/95 px-1.5 py-0.5 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
              ⌘K
            </kbd>
            Search
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-neutral-300 bg-white/95 px-4 py-4 dark:border-neutral-800 dark:bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-800 hover:border-primary/30 hover:bg-neutral-100 hover:text-primary dark:border-transparent dark:bg-transparent dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </header>
  );
}
