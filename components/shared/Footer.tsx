import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold">MD Khaled Bin</h2>
            <p className="mt-2 max-w-xs text-sm text-neutral-600 dark:text-neutral-400">
              Full-stack engineer building AI-first products with a focus on
              clarity, speed, and shipping.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Connect
            </h3>
            <div className="mt-4 flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
              <a
                href="https://github.com/mdkhaledbin"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="transition-colors hover:text-primary"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-khaled-bin-814a4b225/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="transition-colors hover:text-primary"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="mailto:mdkhaledbin221@gmail.com"
                aria-label="Email"
                className="transition-colors hover:text-primary"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Built With
            </h3>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Next.js • TypeScript • Tailwind CSS • Framer Motion
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Handcrafted for GitHub Pages.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-500 dark:border-neutral-800">
          © {currentYear} MD Khaled Bin. No templates.
        </div>
      </div>
    </footer>
  );
}
