# 🚀 World-Class Portfolio Build Guide
## 5-Phase Implementation Plan for MD Khaled Bin

**Target Deployment:** GitHub Pages (github.io)  
**Tech Stack:** Next.js 14+ (Static Export) + TypeScript + Tailwind CSS + Framer Motion  
**Data Strategy:** Firebase/Supabase for dynamic content OR Static JSON files  
**Timeline:** 5 sequential build phases

---

## 📋 **PRE-BUILD CHECKLIST**

Before starting, ensure you have:
- [ ] Node.js 18+ installed
- [ ] Git configured with GitHub account
- [ ] Code editor (VS Code recommended)
- [ ] Figma/design tool for assets (optional)
- [ ] Domain ready: `yourusername.github.io` or custom domain

**Important:** Since GitHub Pages only supports static sites, we'll configure Next.js for static export. Dynamic features will use client-side solutions.

---

# 🎯 **PROMPT 1: PROJECT FOUNDATION & DESIGN SYSTEM**

## **Objective**
Set up the Next.js project with optimal configuration for GitHub Pages, establish the design system, and create the basic file structure.

## **Instructions for AI Agent**

### **TASK 1.1: Initialize Next.js Project**

Create a new Next.js 14+ project with the following specifications:


```bash
npx create-next-app@latest khaled-portfolio --typescript --tailwind --app --no-src-dir
```

You are already inside a Nextjs 14 project no need to run the above command again.

**Configuration Requirements:**

1. **next.config.js** - Configure for static export:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '', // Leave empty if using custom domain, otherwise '/repository-name'
  trailingSlash: true,
}

module.exports = nextConfig
```

2. **File Structure:**
```
khaled-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── projects/
│   │   └── page.tsx
│   ├── blog/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── ui/               # Shadcn components
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── shared/           # Reusable components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   └── animations/       # Framer Motion wrappers
├── lib/
│   ├── data/            # Static JSON data
│   │   ├── projects.json
│   │   ├── experience.json
│   │   ├── skills.json
│   │   └── cp-stats.json
│   ├── utils/           # Helper functions
│   └── hooks/           # Custom React hooks
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── videos/
│   ├── .nojekyll        # Important for GitHub Pages
│   └── CNAME            # If using custom domain
├── styles/
│   └── themes.css
└── package.json
```

3. **Install Dependencies:**
```bash
npm install framer-motion clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot
npm install lucide-react
npm install cmdk
npm install next-themes
```

4. **Create `.nojekyll` file** in `/public` directory (empty file - prevents Jekyll processing on GitHub Pages)

---

### **TASK 1.2: Design System Setup**

#### **Typography System**

1. **Install Geist Font:**
```bash
npm install geist
```

2. **Configure in `app/layout.tsx`:**
```typescript
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

3. **Update `tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'heading': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      colors: {
        // Custom color system - Anti-Generic
        primary: {
          DEFAULT: '#4F46E5', // Electric Indigo
          50: '#EEEDFD',
          100: '#D9D6FA',
          500: '#4F46E5',
          900: '#1E1B4B',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#0A0A0B',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

#### **Color & Texture System**

Create `/styles/themes.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --accent: 238 76% 58%; /* Electric Indigo */
    --grain-opacity: 0.03;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --accent: 238 76% 58%;
    --grain-opacity: 0.02;
  }

  * {
    @apply border-neutral-200 dark:border-neutral-800;
  }

  body {
    @apply bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Grain Texture Overlay */
@layer utilities {
  .grain-texture {
    position: relative;
  }
  
  .grain-texture::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: var(--grain-opacity);
  }

  /* Grid Pattern Background */
  .grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(100, 100, 100, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(100, 100, 100, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  /* Magnetic Button Effect */
  .magnetic-btn {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .magnetic-btn:hover {
    transform: scale(1.05);
  }
}
```

---

### **TASK 1.3: Core Component Library (Shadcn/UI)**

1. **Initialize Shadcn:**
```bash
npx shadcn-ui@latest init
```

Choose these options:
- TypeScript: Yes
- Style: Default
- Base color: Slate
- CSS variables: Yes

2. **Install Core Components:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add separator
```

3. **Customize Button Component** (`components/ui/button.tsx`):
   - Add custom border-radius (either sharp `rounded-none` or extreme `rounded-full`)
   - Implement magnetic hover effect
   - Add accent color on hover
   - Thick border on focus state

**Example Customization:**
```typescript
// Modify the buttonVariants to include custom styles
const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 magnetic-btn focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 rounded-none font-medium",
        // ... other variants with custom styling
      },
    },
  }
)
```

---

### **TASK 1.4: Data Structure (Static JSON)**

Since we're using GitHub Pages (static hosting), create JSON files for dynamic content:

**`lib/data/projects.json`:**
```json
[
  {
    "id": "ai-data-brain",
    "title": "AI Data Brain",
    "slug": "ai-data-brain",
    "tagline": "Voice-native intelligence for collaborative tables",
    "description": "Built a multilingual workspace powered by Claude MCP for direct LLM-to-database reasoning with sub-100ms realtime sync.",
    "fullDescription": "Detailed description here...",
    "category": "AI-ML",
    "techStack": ["Next.js", "Claude MCP", "MongoDB", "WebSockets"],
    "difficulty": 5,
    "keyInnovation": "Sub-100ms Realtime Sync",
    "metrics": {
      "users": "500+",
      "performance": "100ms latency",
      "impact": "10x faster than traditional solutions"
    },
    "featured": true,
    "status": "shipped",
    "demoUrl": "https://github.com/MehediHasan-75/ai_data_brain",
    "githubUrl": "https://github.com/MehediHasan-75/ai_data_brain",
    "videoUrl": "",
    "images": ["/assets/projects/ai-data-brain/hero.png"],
    "createdAt": "2025-01-15"
  },
  {
    "id": "wordpress-agent",
    "title": "WordPress Agent",
    "slug": "wordpress-agent",
    "tagline": "Autonomous copilot for engineering agencies",
    "description": "AI assistant automating WordPress workflows with RAG search and MCP tools.",
    "category": "AI-ML",
    "techStack": ["Python", "FastAPI", "RAG", "Claude API"],
    "difficulty": 4,
    "keyInnovation": "RAG Implementation",
    "featured": true,
    "status": "in-progress",
    "demoUrl": "",
    "githubUrl": "",
    "images": [],
    "createdAt": "2025-02-01"
  }
]
```

**`lib/data/experience.json`:**
```json
[
  {
    "id": "recurse-ai",
    "company": "Recurse AI",
    "role": "Software Engineer Intern",
    "location": "Remote",
    "type": "Internship",
    "startDate": "2025-02",
    "endDate": "2025-07",
    "current": true,
    "description": "Delivered AI-first products end-to-end including autonomous WordPress agents and ML-backed audio tooling.",
    "achievements": [
      "Built shipping pipelines pairing MCP agents with human QA gates",
      "Developed production pipeline isolating vocals via Invert AI API with resilient queuing"
    ],
    "techStack": ["Next.js", "Python", "FastAPI", "Claude API", "Docker"],
    "companyUrl": "https://www.linkedin.com/in/md-khaled-bin-814a4b225/",
    "companyLogo": "/assets/companies/recurse-ai.png"
  },
  {
    "id": "remotask",
    "company": "Remotask",
    "role": "AI Model Trainer",
    "location": "Remote",
    "type": "Contract",
    "startDate": "2023-06",
    "endDate": "2023-09",
    "current": false,
    "description": "Curated coding and competitive programming datasets to uplift LLM reasoning.",
    "achievements": [
      "Designed annotation templates that reduced rejection rates"
    ],
    "techStack": ["Python", "Data Annotation"],
    "companyUrl": "https://www.linkedin.com/in/md-khaled-bin-814a4b225/",
    "companyLogo": "/assets/companies/remotask.png"
  }
]
```

**`lib/data/skills.json`:**
```json
[
  {
    "id": "nextjs",
    "name": "Next.js",
    "category": "Frontend",
    "proficiency": 90,
    "usageFrequency": 95,
    "icon": "nextjs",
    "color": "#000000",
    "yearsOfExperience": 2,
    "projectCount": 15
  },
  {
    "id": "python",
    "name": "Python",
    "category": "Language",
    "proficiency": 85,
    "usageFrequency": 80,
    "icon": "python",
    "color": "#3776AB",
    "yearsOfExperience": 3,
    "projectCount": 20
  }
]
```

**`lib/data/cp-stats.json`:**
```json
{
  "codeforces": {
    "username": "bonu_malitha",
    "rating": 1200,
    "rank": "Pupil",
    "maxRating": 1250,
    "solvedProblems": 350,
    "profileUrl": "https://codeforces.com/profile/bonu_malitha",
    "ratingHistory": [
      { "date": "2024-01", "rating": 1100 },
      { "date": "2024-06", "rating": 1200 },
      { "date": "2025-01", "rating": 1250 }
    ]
  },
  "codechef": {
    "username": "nuhupaikumbar",
    "rating": 1650,
    "stars": 3,
    "solvedProblems": 200,
    "profileUrl": "https://www.codechef.com/users/nuhupaikumbar"
  }
}
```

---

### **TASK 1.5: Framer Motion Setup**

Create animation utility file: `/lib/utils/animations.ts`

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
};

export const magneticButton = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

// Easing presets
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1],
  snappy: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.27, 1.55]
};
```

---

### **TASK 1.6: Global Layout Components**

**Navigation** (`components/shared/Navigation.tsx`):
```typescript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            MK<span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

**Theme Toggle** (`components/shared/ThemeToggle.tsx`):
```typescript
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

**Footer** (`components/shared/Footer.tsx`):
```typescript
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-2">MD Khaled Bin</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Full-Stack Engineer crafting AI-first products
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium mb-3">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-medium mb-3">Connect</h4>
            <div className="flex gap-3">
              <a href="https://github.com/mdkhaledbin" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/md-khaled-bin-814a4b225/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:mdkhaledbin221@gmail.com" className="hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-medium mb-3">Built With</h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Next.js • TypeScript • Tailwind CSS • Framer Motion
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
              Handcrafted in Sylhet 🇧🇩
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>© {currentYear} MD Khaled Bin. No templates. No AI slop.</p>
        </div>
      </footer>
    </div>
  );
}
```

---

### **TASK 1.7: Theme Provider Setup**

Update `app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "MD Khaled Bin | Full-Stack Engineer & AI Specialist",
  description: "Full-Stack Engineer specializing in AI systems, scalable web apps, and competitive programming. Codeforces Pupil • SUST CSE • 20+ shipped projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="grain-texture">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## **DELIVERABLES FOR PROMPT 1**

After completing this prompt, you should have:

- ✅ Next.js project initialized with TypeScript and Tailwind CSS
- ✅ Configured for static export (GitHub Pages compatible)
- ✅ Design system established (typography, colors, animations)
- ✅ Shadcn/UI components installed and customized
- ✅ Static JSON data files created with your real information
- ✅ Global layout components (Navigation, Footer, ThemeToggle)
- ✅ Framer Motion setup with animation utilities
- ✅ Project runs locally without errors (`npm run dev`)

**Test Command:**
```bash
npm run dev
# Should open on http://localhost:3000 with navigation and footer visible
```

---

**Next Step:** Proceed to **PROMPT 2: Hero Section & Bento Grid** after verifying all components work correctly.

---

# 🎨 **PROMPT 2: HERO SECTION & BENTO GRID**

## **Objective**
Build the hero section with impact-driven copy and the asymmetric Bento Grid showcasing key information at a glance.

## **Instructions for AI Agent**

### **TASK 2.1: Hero Section - "The Impact Statement"**

Create `components/sections/Hero.tsx`:

**Requirements:**
1. Large, bold headline (avoid clichés like "Hi, I'm a developer")
2. Unique positioning subtitle
3. Live status badge (fetched from JSON or hardcoded initially)
4. Quick stats marquee
5. Availability indicator
6. Dual CTAs (View Work + Contact)
7. Smooth animations with Framer Motion

**Component Structure:**

```typescript
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, magneticButton } from '@/lib/utils/animations';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Live Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-primary/30 bg-primary/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium">Currently: Building autonomous AI agents</span>
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="space-y-4"
          >
            <h1 className="text-display font-bold tracking-tight">
              Engineering AI Systems
              <br />
              <span className="text-primary">That Actually Ship</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Full-Stack Engineer • AI Specialist • Competitive Programmer
            </p>
          </motion.div>

          {/* Quick Stats Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono"
          >
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900">20+ Projects Shipped</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900">600+ GitHub Contributions</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900">3.68 CGPA SUST</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center gap-2">
              <MapPin size={14} />
              Sylhet, Bangladesh
            </span>
          </motion.div>

          {/* Availability */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2"
          >
            <Sparkles size={16} className="text-primary" />
            Open to opportunities • Next.js/AI Projects
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link href="/projects">
              <Button size="lg" className="group" {...magneticButton as any}>
                View My Work
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button size="lg" variant="outline" {...magneticButton as any}>
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}
```

**Key Features:**
- Animated pulse dot for "live" status
- Magnetic button effects
- Staggered fade-in animations
- Decorative blur elements (subtle, not overdone)
- Responsive text sizing with clamp()

---

### **TASK 2.2: Bento Grid - "At a Glance"**

Create `components/sections/BentoGrid.tsx`:

**Layout Strategy:**
- Asymmetric grid (not uniform squares)
- Different card sizes: Small (1x1), Medium (2x1 or 1x2), Large (2x2)
- 7 cards total with diverse content

**Component Structure:**

```typescript
'use client';

import { motion } from 'framer-motion';
import { Github, Trophy, MapPin, Code2, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import cpStats from '@/lib/data/cp-stats.json';

export function BentoGrid() {
  const cards = [
    {
      id: 'featured-project',
      size: 'large', // col-span-2 row-span-2
      title: 'AI Data Brain',
      subtitle: 'Voice-native intelligence',
      icon: Code2,
      gradient: 'from-primary/20 to-primary/5',
    },
    {
      id: 'cp-stats',
      size: 'medium', // col-span-1 row-span-2
      title: 'Competitive Programming',
      subtitle: `${cpStats.codeforces.rating} Rating`,
      icon: Trophy,
      gradient: 'from-orange-500/20 to-orange-500/5',
    },
    // ... more cards
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-heading font-bold mb-4">At a Glance</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
            A snapshot of what I'm building, learning, and achieving right now.
          </p>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {/* Card 1: Featured Project (Large - 2x2) */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            gradient="from-primary/20 to-primary/5"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <Code2 className="text-primary mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-2">AI Data Brain</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Voice-native intelligence for collaborative tables with sub-100ms sync
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <Badge>Next.js</Badge>
                <Badge>Claude MCP</Badge>
                <Badge>MongoDB</Badge>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: CP Stats (Medium - 1x2) */}
          <BentoCard
            className="md:row-span-2"
            gradient="from-orange-500/20 to-orange-500/5"
          >
            <Trophy className="text-orange-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Competitive Programming</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Codeforces</span>
                <span className="font-bold text-orange-500">{cpStats.codeforces.rating} ({cpStats.codeforces.rank})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">CodeChef</span>
                <span className="font-bold">{cpStats.codechef.stars}⭐</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-600 dark:text-neutral-400">Total Solved: </span>
                <span className="font-bold">{cpStats.codeforces.solvedProblems + cpStats.codechef.solvedProblems}+</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Location (Small - 1x1) */}
          <BentoCard
            className="md:col-span-1"
            gradient="from-green-500/20 to-green-500/5"
          >
            <MapPin className="text-green-500 mb-2" size={28} />
            <h3 className="font-bold">Sylhet, Bangladesh 🇧🇩</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              Available for remote work
            </p>
          </BentoCard>

          {/* Card 4: GitHub Activity (Medium - 2x1) */}
          <BentoCard
            className="md:col-span-2"
            gradient="from-purple-500/20 to-purple-500/5"
          >
            <div className="flex items-center justify-between">
              <div>
                <Github className="text-purple-500 mb-2" size={28} />
                <h3 className="font-bold">GitHub Activity</h3>
                <p className="text-2xl font-bold mt-2">600+ Contributions</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">This year</p>
                <p className="text-xs text-neutral-500 mt-1">Streak: 45 days 🔥</p>
              </div>
            </div>
          </BentoCard>

          {/* Card 5: Latest Blog (Medium - 2x1) */}
          <BentoCard
            className="md:col-span-2"
            gradient="from-blue-500/20 to-blue-500/5"
          >
            <BookOpen className="text-blue-500 mb-2" size={28} />
            <h3 className="font-bold mb-2">Latest Writing</h3>
            <p className="text-sm font-medium">Building RAG Systems with Claude MCP</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">5 min read • Published 2 days ago</p>
          </BentoCard>

          {/* Card 6: Achievement Badge (Small - 1x1) */}
          <BentoCard
            className="md:col-span-1"
            gradient="from-yellow-500/20 to-yellow-500/5"
          >
            <Award className="text-yellow-500 mb-2" size={28} />
            <h3 className="text-sm font-bold">Reactive Accelerator Champion</h3>
            <a href="https://learnwithsumit.com/certificates/verify/LWSCTXN-YKS3LO66" target="_blank" className="text-xs text-primary hover:underline mt-2 inline-block">
              View Certificate →
            </a>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

// Reusable Bento Card Component
function BentoCard({ 
  children, 
  className = '', 
  gradient = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
  gradient?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={`${className}`}
    >
      <Card className={`h-full p-6 border-neutral-200 dark:border-neutral-800 bg-linear-to-br ${gradient} hover:shadow-lg transition-shadow cursor-pointer`}>
        {children}
      </Card>
    </motion.div>
  );
}
```

**Key Features:**
- Asymmetric grid layout (not boring uniform squares)
- Hover effects (scale + lift)
- Real data from JSON files
- Diverse content types (stats, projects, achievements)
- Responsive design (stacks on mobile)

---

### **TASK 2.3: Update Homepage**

Update `app/page.tsx`:

```typescript
import { Hero } from '@/components/sections/Hero';
import { BentoGrid } from '@/components/sections/BentoGrid';

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
    </>
  );
}
```

---

## **DELIVERABLES FOR PROMPT 2**

After completing this prompt, you should have:

- ✅ Hero section with impact-driven copy (no clichés)
- ✅ Live status badge with pulse animation
- ✅ Quick stats marquee with real data
- ✅ Magnetic CTAs with smooth hover effects
- ✅ Asymmetric Bento Grid with 7+ diverse cards
- ✅ Real data integrated from JSON files
- ✅ Smooth animations on scroll and hover
- ✅ Fully responsive design

**Test Command:**
```bash
npm run dev
# Navigate to homepage - should see Hero and Bento Grid
```

---

**Next Step:** Proceed to **PROMPT 3: Projects, Experience & Skills** after verifying animations work smoothly.

---

# 💼 **PROMPT 3: PROJECTS, EXPERIENCE & SKILLS SECTIONS**

## **Objective**
Build the projects showcase with filtering, experience timeline, and interactive tech stack visualization.

## **Instructions for AI Agent**

### **TASK 3.1: Projects Showcase - "The Lab"**

Create `components/sections/Projects.tsx`:

**Requirements:**
1. Grid/List view toggle
2. Category and tech stack filters
3. Search functionality
4. Project cards with hover effects
5. Modal for project deep dive
6. Status badges (Shipped, In Progress, etc.)

**Component Structure:**

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3x3, List, ExternalLink, Github, Star } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import projectsData from '@/lib/data/projects.json';

type ViewMode = 'grid' | 'list';
type Category = 'all' | 'AI-ML' | 'Web Apps' | 'Open Source';

export function Projects() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories: Category[] = ['all', 'AI-ML', 'Web Apps', 'Open Source'];

  // Filter projects
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-heading font-bold mb-4">The Lab</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
            From AI-powered agents to scalable web apps. Each project is a learning experience.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 border border-neutral-200 dark:border-neutral-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Projects Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              viewMode={viewMode}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500">No projects found matching your criteria.</p>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Tagline */}
                <p className="text-lg text-primary font-medium">{selectedProject.tagline}</p>

                {/* Metrics */}
                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                    {selectedProject.metrics.users && (
                      <div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">Users</p>
                        <p className="text-xl font-bold">{selectedProject.metrics.users}</p>
                      </div>
                    )}
                    {selectedProject.metrics.performance && (
                      <div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">Performance</p>
                        <p className="text-xl font-bold">{selectedProject.metrics.performance}</p>
                      </div>
                    )}
                    {selectedProject.metrics.impact && (
                      <div className="col-span-3">
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">Impact</p>
                        <p className="text-sm font-medium">{selectedProject.metrics.impact}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Full Description */}
                <div>
                  <h3 className="font-bold mb-2">About</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{selectedProject.fullDescription || selectedProject.description}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="font-bold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech: string) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                  {selectedProject.demoUrl && (
                    <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Button>
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <Github size={16} className="mr-2" />
                        View Code
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ 
  project, 
  index, 
  viewMode, 
  onClick 
}: { 
  project: any; 
  index: number; 
  viewMode: ViewMode;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <Card className="h-full cursor-pointer border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all overflow-hidden group">
        {/* Project Image Placeholder */}
        {project.images && project.images[0] && (
          <div className="aspect-video bg-linear-to-br from-primary/20 to-primary/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium">View Details</p>
            </div>
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-primary font-medium">{project.keyInnovation}</p>
            </div>
            {project.featured && (
              <Star className="text-yellow-500 fill-yellow-500" size={18} />
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech: string) => (
              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="secondary" className="text-xs">+{project.techStack.length - 3}</Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <Badge 
              variant={project.status === 'shipped' ? 'default' : 'outline'}
              className="text-xs"
            >
              {project.status}
            </Badge>
            
            {/* Difficulty Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < project.difficulty ? 'text-primary fill-primary' : 'text-neutral-300 dark:text-neutral-700'}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
```

**Key Features:**
- Grid/List view toggle
- Category and search filters
- Animated project cards
- Difficulty rating (stars)
- Status badges
- Modal for detailed view
- Real data from JSON

---

### **TASK 3.2: Experience Timeline - "The Journey"**

Create `components/sections/Experience.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import experienceData from '@/lib/data/experience.json';

export function Experience() {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-heading font-bold mb-4">The Journey</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            From classroom to production systems, every role taught me something valuable.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-neutral-200 dark:bg-neutral-800" />

          {experienceData.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience, index }: { experience: any; index: number }) {
  const isEven = index % 2 === 0;
  const isAcademic = experience.id === 'sust';

  // Calculate duration
  const start = new Date(experience.startDate);
  const end = experience.current ? new Date() : new Date(experience.endDate);
  const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={`relative mb-12 md:mb-16 ${isEven ? 'md:pr-[50%]' : 'md:pl-[50%]'}`}
    >
      {/* Timeline Dot */}
      <div className="hidden md:block absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-neutral-50 dark:border-neutral-950 z-10">
        {experience.current && (
          <span className="absolute -top-1 -left-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-primary"></span>
          </span>
        )}
      </div>

      {/* Card */}
      <div className={`bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 ${isEven ? 'md:mr-8' : 'md:ml-8'} hover:border-primary/50 transition-all`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {isAcademic ? (
                <GraduationCap className="text-primary" size={24} />
              ) : (
                <Briefcase className="text-primary" size={24} />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg">{experience.company}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{experience.role}</p>
            </div>
          </div>
          {experience.current && (
            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
              Current
            </Badge>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>
              {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
              {experience.current ? ' Present' : ` ${new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
              <span className="text-xs ml-1">({months} months)</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{experience.location}</span>
          </div>
          <Badge variant="outline" className="text-xs">{experience.type}</Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
          {experience.description}
        </p>

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">Key Achievements:</p>
            <ul className="space-y-1">
              {experience.achievements.map((achievement: string, i: number) => (
                <li key={i} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.techStack.map((tech: string) => (
            <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
          ))}
        </div>

        {/* Company Link */}
        {experience.companyUrl && (
          <a 
            href={experience.companyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View Company <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
```

**Key Features:**
- Vertical timeline with alternating sides
- Current role indicator (pulsing dot)
- Duration calculation
- Academic section styled differently
- Expandable achievements
- Tech stack pills
- Smooth scroll animations

---

### **TASK 3.3: Tech Stack Visualization - "The Arsenal"**

Create `components/sections/Skills.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import skillsData from '@/lib/data/skills.json';

type Category = 'all' | 'Frontend' | 'Backend' | 'Language' | 'DevOps' | 'AI/ML';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const categories: Category[] = ['all', 'Frontend', 'Backend', 'Language', 'DevOps', 'AI/ML'];

  const filteredSkills = selectedCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-heading font-bold mb-4">The Arsenal</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Technologies I use to build production-ready systems. Sorted by proficiency and battle-tested in real projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid - Heatmap Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: any; index: number }) {
  // Calculate opacity based on proficiency (higher proficiency = darker)
  const opacity = 0.3 + (skill.proficiency / 100) * 0.7;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group"
    >
      <div 
        className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer transition-all hover:border-primary/50"
        style={{ backgroundColor: `rgba(79, 70, 229, ${opacity * 0.1})` }}
      >
        <div className="text-center space-y-3">
          {/* Skill Name */}
          <h3 className="font-bold text-lg">{skill.name}</h3>
          
          {/* Proficiency Bar */}
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
              className="h-full bg-primary"
            />
          </div>

          {/* Stats */}
          <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>{skill.proficiency}% Proficient</span>
            <span>{skill.projectCount} projects</span>
          </div>

          {/* Category Badge */}
          <Badge variant="outline" className="text-xs">
            {skill.category}
          </Badge>

          {/* Hover Info */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-neutral-500">
            Used in {skill.usageFrequency}% of projects
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

**Key Features:**
- Category filtering
- Heatmap-style visualization (opacity based on proficiency)
- Animated proficiency bars
- Project count display
- Hover states with additional info
- Responsive grid

---

### **TASK 3.4: Create Dedicated Projects Page**

Create `app/projects/page.tsx`:

```typescript
import { Projects } from '@/components/sections/Projects';

export const metadata = {
  title: 'Projects | MD Khaled Bin',
  description: 'Browse my portfolio of AI-powered systems, web applications, and open-source contributions.',
};

export default function ProjectsPage() {
  return <Projects />;
}
```

---

### **TASK 3.5: Update Homepage**

Update `app/page.tsx` to include new sections:

```typescript
import { Hero } from '@/components/sections/Hero';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <Experience />
      <Skills />
      <Projects />
    </>
  );
}
```

---

## **DELIVERABLES FOR PROMPT 3**

After completing this prompt, you should have:

- ✅ Projects showcase with filtering and search
- ✅ Grid/List view toggle
- ✅ Project detail modal with full info
- ✅ Experience timeline with alternating layout
- ✅ Current role indicator (pulsing animation)
- ✅ Interactive tech stack visualization
- ✅ Real data from JSON files integrated
- ✅ All sections responsive and animated
- ✅ Dedicated `/projects` page

**Test Command:**
```bash
npm run dev
# Homepage should now have all major sections
# Navigate to /projects to see dedicated page
```

---

**Next Step:** Proceed to **PROMPT 4: Blog, CP Stats & Advanced Features** for content creation and interactivity.

---

# ✨ **PROMPT 4: BLOG, CP STATS & ADVANCED FEATURES**

## **Objective**
Add blog functionality with MDX support, competitive programming stats dashboard, command palette (Cmd+K), and polished micro-interactions.

## **Instructions for AI Agent**

### **TASK 4.1: Blog System Setup**

**Install MDX Dependencies:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install rehype-highlight rehype-slug rehype-autolink-headings
npm install gray-matter reading-time
```

**Configure MDX** in `next.config.js`:
```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      require('rehype-highlight'),
      require('rehype-slug'),
      require('rehype-autolink-headings'),
    ],
  },
});

module.exports = withMDX({
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: { unoptimized: true },
});
```

**Create Blog Data Structure:**

Create `lib/data/blog-posts.json`:
```json
[
  {
    "slug": "building-rag-systems-with-claude-mcp",
    "title": "Building RAG Systems with Claude MCP",
    "excerpt": "A deep dive into implementing Retrieval-Augmented Generation using Claude's Model Context Protocol for smarter AI agents.",
    "publishedAt": "2025-01-15",
    "readTime": 8,
    "tags": ["AI", "RAG", "Claude", "MCP"],
    "featured": true,
    "views": 1240
  },
  {
    "slug": "scaling-nextjs-for-10k-users",
    "title": "Scaling Next.js for 10K+ Concurrent Users",
    "excerpt": "Lessons learned from optimizing a Next.js application to handle massive traffic without breaking the bank.",
    "publishedAt": "2024-12-20",
    "readTime": 6,
    "tags": ["Next.js", "Performance", "Scaling"],
    "featured": false,
    "views": 850
  }
]
```

**Create Blog Section** (`components/sections/Blog.tsx`):

```typescript
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import blogPosts from '@/lib/data/blog-posts.json';

export function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 3);

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-heading font-bold mb-4">Writing</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Thoughts on AI, system design, and lessons learned in production.
            </p>
          </div>
          <Link href="/blog" className="text-primary hover:underline flex items-center gap-2 group">
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Post */}
          {featuredPost && (
            <FeaturedPostCard post={featuredPost} />
          )}

          {/* Recent Posts */}
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

function FeaturedPostCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full p-8 border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all cursor-pointer group">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Featured</Badge>
        
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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

function PostCard({ post, index }: { post: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="p-6 border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all cursor-pointer group">
          <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
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
```

**Create Blog Page** (`app/blog/page.tsx`):

```typescript
import { Blog } from '@/components/sections/Blog';

export const metadata = {
  title: 'Blog | MD Khaled Bin',
  description: 'Technical writings on AI, system design, and software engineering.',
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      <Blog />
    </div>
  );
}
```

---

### **TASK 4.2: Competitive Programming Dashboard**

Create `components/sections/CPStats.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Award, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import cpStats from '@/lib/data/cp-stats.json';

export function CPStats() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-heading font-bold mb-4">Competitive Programming</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Algorithmic problem-solving translates directly into production code quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Codeforces Card */}
          <PlatformCard
            platform="Codeforces"
            icon={Trophy}
            gradient="from-orange-500/20 to-orange-500/5"
            stats={cpStats.codeforces}
            color="orange"
          />

          {/* CodeChef Card */}
          <PlatformCard
            platform="CodeChef"
            icon={Award}
            gradient="from-yellow-500/20 to-yellow-500/5"
            stats={cpStats.codechef}
            color="yellow"
          />
        </div>

        {/* Combined Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatCard
            label="Total Solved"
            value={(cpStats.codeforces.solvedProblems + cpStats.codechef.solvedProblems).toString()}
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
            value={`${cpStats.codechef.stars} ⭐`}
            icon={Award}
          />
        </div>
      </div>
    </section>
  );
}

function PlatformCard({ platform, icon: Icon, gradient, stats, color }: any) {
  return (
    <Card className={`p-8 border-neutral-200 dark:border-neutral-800 bg-linear-to-br ${gradient}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">{platform}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">@{stats.username}</p>
        </div>
        <Icon className={`text-${color}-500`} size={32} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">Current Rating</span>
          <span className="text-2xl font-bold">{stats.rating}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">Rank</span>
          <Badge className={`bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 border-${color}-500/20`}>
            {stats.rank || `${stats.stars} Stars`}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">Problems Solved</span>
          <span className="font-bold">{stats.solvedProblems}+</span>
        </div>

        {stats.maxRating && (
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <span className="text-neutral-600 dark:text-neutral-400">Max Rating</span>
            <span className="font-bold text-primary">{stats.maxRating}</span>
          </div>
        )}
      </div>

      <a
        href={stats.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm text-primary hover:underline"
      >
        View Profile →
      </a>
    </Card>
  );
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <Card className="p-4 text-center border-neutral-200 dark:border-neutral-800">
      <Icon className="text-primary mx-auto mb-2" size={24} />
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-neutral-600 dark:text-neutral-400">{label}</p>
    </Card>
  );
}
```

---

### **TASK 4.3: Command Palette (Cmd+K)**

Install dependency:
```bash
npm install cmdk
```

Create `components/CommandPalette.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, FileText, Code, Mail, Github, Linkedin, Home } from 'lucide-react';
import projectsData from '@/lib/data/projects.json';
import blogPosts from '@/lib/data/blog-posts.json';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigate = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl z-50"
    >
      <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-4">
        <Search className="text-neutral-400 mr-3" size={18} />
        <Command.Input
          placeholder="Search projects, posts, or navigate..."
          className="flex-1 py-4 bg-transparent outline-none text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400"
        />
      </div>

      <Command.List className="max-h-96 overflow-y-auto p-2">
        <Command.Empty className="py-8 text-center text-sm text-neutral-500">
          No results found.
        </Command.Empty>

        {/* Pages */}
        <Command.Group heading="Pages" className="text-xs text-neutral-500 px-2 py-2 font-medium">
          <CommandItem icon={Home} onSelect={() => navigate('/')}>
            Home
          </CommandItem>
          <CommandItem icon={Code} onSelect={() => navigate('/projects')}>
            Projects
          </CommandItem>
          <CommandItem icon={FileText} onSelect={() => navigate('/blog')}>
            Blog
          </CommandItem>
          <CommandItem icon={Mail} onSelect={() => navigate('/contact')}>
            Contact
          </CommandItem>
        </Command.Group>

        {/* Projects */}
        <Command.Group heading="Projects" className="text-xs text-neutral-500 px-2 py-2 font-medium">
          {projectsData.map((project) => (
            <CommandItem
              key={project.id}
              icon={Code}
              onSelect={() => navigate('/projects')}
            >
              {project.title}
            </CommandItem>
          ))}
        </Command.Group>

        {/* Blog Posts */}
        <Command.Group heading="Blog Posts" className="text-xs text-neutral-500 px-2 py-2 font-medium">
          {blogPosts.map((post) => (
            <CommandItem
              key={post.slug}
              icon={FileText}
              onSelect={() => navigate(`/blog/${post.slug}`)}
            >
              {post.title}
            </CommandItem>
          ))}
        </Command.Group>

        {/* External Links */}
        <Command.Group heading="External" className="text-xs text-neutral-500 px-2 py-2 font-medium">
          <CommandItem
            icon={Github}
            onSelect={() => window.open('https://github.com/mdkhaledbin', '_blank')}
          >
            GitHub Profile
          </CommandItem>
          <CommandItem
            icon={Linkedin}
            onSelect={() => window.open('https://www.linkedin.com/in/md-khaled-bin-814a4b225/', '_blank')}
          >
            LinkedIn Profile
          </CommandItem>
        </Command.Group>
      </Command.List>

      {/* Footer Hint */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-2 text-xs text-neutral-500 flex items-center justify-between">
        <span>Type to search...</span>
        <div className="flex gap-2">
          <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">↑↓</kbd>
          <span>to navigate</span>
          <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">Enter</kbd>
          <span>to select</span>
          <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">Esc</kbd>
          <span>to close</span>
        </div>
      </div>
    </Command.Dialog>
  );
}

function CommandItem({ 
  children, 
  icon: Icon, 
  onSelect 
}: { 
  children: React.ReactNode; 
  icon: any; 
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      <Icon size={16} className="text-neutral-400" />
      <span className="text-sm">{children}</span>
    </Command.Item>
  );
}
```

**Add to Layout** (`app/layout.tsx`):

```typescript
import { CommandPalette } from '@/components/CommandPalette';

// Inside <body>
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  <CommandPalette />
  <Navigation />
  ...
</ThemeProvider>
```

**Add Keyboard Hint** to Navigation:

```typescript
// In Navigation.tsx, add this hint
<div className="hidden md:flex items-center gap-2 text-xs text-neutral-500">
  <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">⌘K</kbd>
  <span>Search</span>
</div>
```

---

### **TASK 4.4: Contact Form**

Create `components/sections/Contact.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, Twitter, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'project',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // For static site, use Formspree or similar service
    // Example with FormSubmit.co (free, no signup)
    const response = await fetch('https://formsubmit.co/ajax/mdkhaledbin221@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'project', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-heading font-bold mb-4">Let's Build Together</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Whether you need an AI-native workflow, a resilient product platform, or a strategic engineering partner — I'm ready to collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start gap-3 mb-4">
                <Mail className="text-primary mt-1" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a href="mailto:mdkhaledbin221@gmail.com" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary">
                    mdkhaledbin221@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Sylhet, Bangladesh 🇧🇩<br />
                    <span className="text-xs">Available for remote work</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-primary mt-1" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Response Time</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6 border-neutral-200 dark:border-neutral-800">
              <h3 className="font-medium mb-4">Connect Elsewhere</h3>
              <div className="space-y-3">
                <a href="https://github.com/mdkhaledbin" target="_blank" className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                  <Github size={18} />
                  <span>github.com/mdkhaledbin</span>
                </a>
                <a href="https://www.linkedin.com/in/md-khaled-bin-814a4b225/" target="_blank" className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                  <Linkedin size={18} />
                  <span>MD Khaled Bin</span>
                </a>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-neutral-200 dark:border-neutral-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="project">Project Inquiry</option>
                    <option value="job">Job Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'sending'}
                  className="w-full md:w-auto"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <Send size={16} className="ml-2" />
                </Button>

                {status === 'success' && (
                  <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully! I'll get back to you soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-600 dark:text-red-400">Failed to send message. Please try again or email me directly.</p>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Create `/app/contact/page.tsx`:
```typescript
import { Contact } from '@/components/sections/Contact';

export const metadata = {
  title: 'Contact | MD Khaled Bin',
  description: 'Get in touch for project inquiries, collaborations, or opportunities.',
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  );
}
```

---

## **DELIVERABLES FOR PROMPT 4**

After completing this prompt, you should have:

- ✅ Blog section with featured and recent posts
- ✅ MDX support configured (for future blog content)
- ✅ Competitive programming stats dashboard
- ✅ Command palette (Cmd+K) for site-wide search
- ✅ Contact form with validation and submission
- ✅ Social links integrated
- ✅ All pages fully functional

**Test Command:**
```bash
npm run dev
# Test Cmd+K to open command palette
# Fill out contact form to test submission
# Navigate through all pages
```

---

**Next Step:** Proceed to **PROMPT 5: SEO, Performance & GitHub Pages Deployment** for final optimization and launch.

---

# 🚀 **PROMPT 5: SEO, PERFORMANCE & GITHUB PAGES DEPLOYMENT**

## **Objective**
Optimize for SEO, ensure peak performance (Lighthouse 95+), and deploy to GitHub Pages with proper configuration.

## **Instructions for AI Agent**

### **TASK 5.1: SEO Optimization**

**Install SEO Package:**
```bash
npm install next-seo
```

**Create SEO Config** (`lib/seo-config.ts`):

```typescript
import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'MD Khaled Bin | Full-Stack Engineer & AI Specialist',
  description: 'Full-Stack Engineer specializing in AI systems, scalable web applications, and competitive programming. Codeforces Pupil • SUST CSE • 20+ shipped projects.',
  canonical: 'https://mdkhaledbin.me',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mdkhaledbin.me',
    siteName: 'MD Khaled Bin Portfolio',
    title: 'MD Khaled Bin | Full-Stack Engineer & AI Specialist',
    description: 'Full-Stack Engineer specializing in AI systems, scalable web applications, and competitive programming.',
    images: [
      {
        url: 'https://mdkhaledbin.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MD Khaled Bin - Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    handle: '@yourtwitterhandle',
    site: '@yourtwitterhandle',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'Full-Stack Engineer, AI Specialist, Next.js, React, Python, Competitive Programming, Codeforces, Software Engineer',
    },
    {
      name: 'author',
      content: 'MD Khaled Bin',
    },
  ],
};
```

**Add Metadata to Pages:**

Update `app/layout.tsx`:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://mdkhaledbin.me'),
  title: {
    default: 'MD Khaled Bin | Full-Stack Engineer & AI Specialist',
    template: '%s | MD Khaled Bin'
  },
  description: 'Full-Stack Engineer specializing in AI systems, scalable web applications, and competitive programming. Codeforces Pupil • SUST CSE • 20+ shipped projects.',
  keywords: ['Full-Stack Engineer', 'AI Specialist', 'Next.js', 'React', 'Python', 'Competitive Programming'],
  authors: [{ name: 'MD Khaled Bin', url: 'https://mdkhaledbin.me' }],
  creator: 'MD Khaled Bin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mdkhaledbin.me',
    siteName: 'MD Khaled Bin Portfolio',
    title: 'MD Khaled Bin | Full-Stack Engineer & AI Specialist',
    description: 'Full-Stack Engineer specializing in AI systems and scalable applications.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MD Khaled Bin - Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD Khaled Bin | Full-Stack Engineer',
    description: 'Building AI systems and scalable applications',
    creator: '@yourtwitterhandle',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

**Create Structured Data:**

Create `components/JsonLd.tsx`:
```typescript
export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'MD Khaled Bin',
    url: 'https://mdkhaledbin.me',
    image: 'https://mdkhaledbin.me/avatar.jpg',
    jobTitle: 'Full-Stack Engineer',
    description: 'Full-Stack Engineer specializing in AI systems and scalable applications',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sylhet',
      addressCountry: 'Bangladesh',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Shahjalal University of Science and Technology',
    },
    sameAs: [
      'https://github.com/mdkhaledbin',
      'https://www.linkedin.com/in/md-khaled-bin-814a4b225/',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

Add to `app/layout.tsx`:
```typescript
import { JsonLd } from '@/components/JsonLd';

// Inside <body>
<JsonLd />
```

**Create sitemap.xml:**

Create `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';
import projectsData from '@/lib/data/projects.json';
import blogPosts from '@/lib/data/blog-posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mdkhaledbin.me';

  const projects = projectsData.map((project) => ({
    url: `${baseUrl}/projects#${project.slug}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogs = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects,
    ...blogs,
  ];
}
```

**Create robots.txt:**

Create `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://mdkhaledbin.me/sitemap.xml',
  };
}
```

---

### **TASK 5.2: Performance Optimization**

**Image Optimization:**

Create placeholder images in `/public/assets/`:
- `og-image.jpg` (1200x630) - for social media
- `avatar.jpg` - your profile picture
- Add project screenshots

**Optimize Fonts:**

Update `app/layout.tsx`:
```typescript
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

<html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
  <head>
    <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  </head>
</html>
```

**Add Loading States:**

Create `components/ui/skeleton.tsx`:
```typescript
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded ${className}`} />
  );
}
```

**Lazy Load Heavy Components:**

```typescript
import dynamic from 'next/dynamic';

const CPStats = dynamic(() => import('@/components/sections/CPStats').then(mod => ({ default: mod.CPStats })), {
  loading: () => <Skeleton className="h-96" />,
  ssr: false,
});
```

**Optimize package.json scripts:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build",
    "deploy": "npm run export && touch out/.nojekyll && touch out/CNAME && echo 'mdkhaledbin.me' > out/CNAME"
  }
}
```

---

### **TASK 5.3: Accessibility (A11y)**

**Add Skip to Content Link:**

Update `app/layout.tsx`:
```typescript
<body>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-9999"
  >
    Skip to main content
  </a>
  <Navigation />
  <main id="main-content" className="min-h-screen pt-16">
    {children}
  </main>
</body>
```

**Test Color Contrast:**
- Ensure all text meets WCAG AA standards (4.5:1 ratio)
- Use contrast checker tools

**Add ARIA Labels:**
```typescript
<button aria-label="Toggle theme" onClick={toggleTheme}>
  <Sun />
</button>
```

**Test with Keyboard:**
- Ensure all interactive elements are keyboard accessible
- Tab order is logical
- Focus states are visible

---

### **TASK 5.4: Analytics & Monitoring**

**Add Vercel Analytics (optional, works with GitHub Pages):**

If using custom domain, you can add simple analytics:

Create `components/Analytics.tsx`:
```typescript
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Simple page view tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-XXXXXXXXXX', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
```

Add to layout:
```typescript
<Analytics />
```

**Or use simpler solution - GoatCounter (privacy-friendly, free):**

Add to `app/layout.tsx`:
```typescript
<Script
  data-goatcounter="https://mdkhaledbin.goatcounter.com/count"
  async
  src="//gc.zgo.at/count.js"
/>
```

---

### **TASK 5.5: GitHub Pages Deployment**

**Create GitHub Repository:**
1. Create repo: `mdkhaledbin.github.io`
2. Push code to GitHub

**GitHub Actions Workflow:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Important Files for GitHub Pages:**

1. **Create `/public/.nojekyll`** (empty file)
2. **Create `/public/CNAME`** (if using custom domain):
```
mdkhaledbin.me
```

3. **Update `next.config.js`** for correct base path:
```javascript
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  basePath: isProd ? '' : '', // Empty if using custom domain
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
```

**Deploy Commands:**

```bash
# Build for production
npm run build

# The output will be in /out directory

# GitHub Actions will automatically deploy when you push to main
git add .
git commit -m "Initial deployment"
git push origin main
```

**Enable GitHub Pages:**
1. Go to repo Settings > Pages
2. Source: GitHub Actions
3. Wait for deployment (2-3 minutes)
4. Visit: `https://mdkhaledbin.github.io`

**Custom Domain Setup:**
1. Add CNAME file with your domain
2. In GitHub repo settings, add custom domain
3. Update DNS records:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```

---

### **TASK 5.6: Final Testing Checklist**

**Performance:**
- [ ] Run Lighthouse audit (target 95+ all categories)
- [ ] Test on slow 3G network
- [ ] Check bundle size (< 500KB total)

**Functionality:**
- [ ] All links work (internal & external)
- [ ] Forms submit correctly
- [ ] Command palette (Cmd+K) works
- [ ] Theme toggle persists
- [ ] Navigation works on mobile
- [ ] Smooth scrolling and animations

**SEO:**
- [ ] Meta tags present on all pages
- [ ] Sitemap generated and accessible
- [ ] Robots.txt configured
- [ ] Structured data validates (schema.org validator)
- [ ] OG images display correctly

**Accessibility:**
- [ ] Color contrast passes WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] Alt text on all images

**Cross-Browser:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

**Responsive:**
- [ ] Desktop (1920x1080, 2560x1440)
- [ ] Laptop (1366x768)
- [ ] Tablet (iPad, 768px)
- [ ] Mobile (iPhone 14, 390px)

---

## **DELIVERABLES FOR PROMPT 5**

After completing this prompt, you should have:

- ✅ Full SEO optimization (meta tags, OG images, structured data)
- ✅ Sitemap and robots.txt generated
- ✅ Performance optimized (Lighthouse 95+)
- ✅ Accessibility compliant (WCAG AA)
- ✅ Analytics configured
- ✅ GitHub Actions workflow for automatic deployment
- ✅ Deployed to GitHub Pages
- ✅ Custom domain configured (optional)
- ✅ All testing checklists passed

**Final Deployment:**

```bash
# Final build and deployment
git add .
git commit -m "Production-ready portfolio v1.0"
git push origin main

# GitHub Actions will auto-deploy
# Visit: https://mdkhaledbin.me (or .github.io)
```

---

## **🎉 SUCCESS CRITERIA - FINAL CHECK**

Your portfolio is world-class if:

- ✅ **Performance**: Lighthouse score 95+ (all categories)
- ✅ **Design**: Immediately recognizable as NOT a template
- ✅ **Engagement**: Unique interactions, smooth animations, personality
- ✅ **SEO**: Ranks on Google for "MD Khaled Bin portfolio"
- ✅ **Mobile**: Experience equals desktop quality
- ✅ **Speed**: Loads in < 1 second on 4G
- ✅ **Content**: Real projects, achievements, and writing
- ✅ **Accessibility**: WCAG AA compliant
- ✅ **Copywriting**: Sounds like YOU, not AI
- ✅ **Deployed**: Live on GitHub Pages with custom domain

---

## **POST-LAUNCH TASKS**

1. **Submit to Google Search Console**
   - Add property
   - Submit sitemap
   - Request indexing

2. **Social Media**
   - Share on LinkedIn
   - Share on Twitter
   - Add to GitHub profile README

3. **Analytics**
   - Monitor page views
   - Track popular projects
   - Measure bounce rate

4. **Continuous Improvement**
   - Add new projects as you build them
   - Write blog posts regularly
   - Update CP stats monthly
   - Refresh design annually

5. **Maintenance**
   - Update dependencies quarterly
   - Backup data files
   - Monitor uptime
   - Respond to contact form submissions

---

**Congratulations! You now have a world-class portfolio that stands out. 🚀**

**No corners cut. No "I'll fix that later." Shipped perfectly the first time.**