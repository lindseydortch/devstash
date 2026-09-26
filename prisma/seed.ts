import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import type { ContentType } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SYSTEM_TYPES = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
];

const DEMO_USER = {
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
};

type TypeName = "snippet" | "prompt" | "command" | "link";

interface SeedItem {
  type: TypeName;
  title: string;
  description: string;
  content?: string;
  url?: string;
  language?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
}

interface SeedCollection {
  name: string;
  description: string;
  defaultType: TypeName;
  isFavorite?: boolean;
  items: SeedItem[];
}

const CONTENT_TYPES: Record<TypeName, ContentType> = {
  snippet: "TEXT",
  prompt: "TEXT",
  command: "TEXT",
  link: "URL",
};

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    defaultType: "snippet",
    isFavorite: true,
    items: [
      {
        type: "snippet",
        title: "useDebounce & useLocalStorage",
        description: "Custom hooks for debouncing values and persisting state",
        language: "typescript",
        isPinned: true,
        isFavorite: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
      },
      {
        type: "snippet",
        title: "Context Provider + Compound Components",
        description: "Typed context provider powering a compound Tabs component",
        language: "typescript",
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>");
  return context;
}

export function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.Trigger = function TabsTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button aria-selected={active === id} onClick={() => setActive(id)}>
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === id ? <div>{children}</div> : null;
};`,
      },
      {
        type: "snippet",
        title: "cn & formatDate utilities",
        description: "Class name merging and date formatting helpers",
        language: "typescript",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    defaultType: "prompt",
    isFavorite: true,
    items: [
      {
        type: "prompt",
        title: "Code Review Assistant",
        description: "Thorough review focused on bugs, security and readability",
        isFavorite: true,
        content: `You are a senior software engineer performing a code review.

Review the code below and report:
1. Bugs and logic errors, including unhandled edge cases
2. Security issues (injection, auth checks, secrets, unsafe input)
3. Performance problems (unnecessary re-renders, N+1 queries, heavy loops)
4. Readability and naming improvements

For each finding give the line, the severity (high / medium / low), and a concrete fix.
Skip style nitpicks a linter would catch.

\`\`\`
{{code}}
\`\`\``,
      },
      {
        type: "prompt",
        title: "Documentation Generator",
        description: "Generate README-style docs from source code",
        content: `Write clear developer documentation for the following code.

Include:
- A one-paragraph overview of what it does and when to use it
- Installation or setup steps, if any
- The public API: each function or component with its parameters, return value and an example
- Common pitfalls or gotchas

Use Markdown with headings and fenced code blocks. Keep the tone concise and practical.

\`\`\`
{{code}}
\`\`\``,
      },
      {
        type: "prompt",
        title: "Refactoring Assistant",
        description: "Refactor code without changing its behavior",
        isPinned: true,
        content: `Refactor the code below to improve readability and maintainability without changing its behavior.

Goals:
- Extract functions that do more than one thing
- Remove duplication
- Use clear, descriptive names
- Keep functions under 50 lines where possible
- Preserve the existing public API

Return the refactored code, then a short bullet list explaining each change and why it helps.

\`\`\`
{{code}}
\`\`\``,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    defaultType: "snippet",
    items: [
      {
        type: "snippet",
        title: "Next.js Multi-stage Dockerfile",
        description: "Small production image for a Next.js standalone build",
        language: "dockerfile",
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        type: "command",
        title: "Deploy with migrations",
        description: "Apply Prisma migrations, build and restart the app",
        language: "bash",
        content: `git pull origin main && \\
npm ci && \\
npx prisma migrate deploy && \\
npm run build && \\
pm2 restart devstash`,
      },
      {
        type: "link",
        title: "Docker Documentation",
        description: "Official Docker guides and reference",
        url: "https://docs.docker.com/",
      },
      {
        type: "link",
        title: "GitHub Actions Documentation",
        description: "Workflows, runners and CI/CD with GitHub Actions",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultType: "command",
    items: [
      {
        type: "command",
        title: "Undo last commit (keep changes)",
        description: "Move HEAD back one commit and keep the changes staged",
        language: "bash",
        isPinned: true,
        content: "git reset --soft HEAD~1",
      },
      {
        type: "command",
        title: "Docker cleanup",
        description: "Remove stopped containers, unused images, networks and volumes",
        language: "bash",
        content: "docker system prune -a --volumes",
      },
      {
        type: "command",
        title: "Kill process on a port",
        description: "Find and kill whatever is listening on port 3000",
        language: "bash",
        content: "lsof -ti :3000 | xargs kill -9",
      },
      {
        type: "command",
        title: "Check outdated packages",
        description: "List outdated npm dependencies and update within semver ranges",
        language: "bash",
        content: "npm outdated && npm update",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultType: "link",
    items: [
      {
        type: "link",
        title: "Tailwind CSS Docs",
        description: "Utility classes and theme configuration reference",
        url: "https://tailwindcss.com/docs",
        isFavorite: true,
      },
      {
        type: "link",
        title: "shadcn/ui",
        description: "Accessible components built on Radix and Tailwind",
        url: "https://ui.shadcn.com",
      },
      {
        type: "link",
        title: "Material Design 3",
        description: "Google's open-source design system",
        url: "https://m3.material.io",
      },
      {
        type: "link",
        title: "Lucide Icons",
        description: "Open-source icon library used across DevStash",
        url: "https://lucide.dev/icons",
      },
    ],
  },
];

// Postgres treats NULL userIds as distinct, so @@unique([name, userId]) can't
// guard system types — upsert by name manually instead.
async function seedSystemTypes() {
  const typeIds: Record<string, string> = {};

  for (const type of SYSTEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, userId: null },
    });

    const saved = existing
      ? await prisma.itemType.update({
          where: { id: existing.id },
          data: { ...type, isSystem: true },
        })
      : await prisma.itemType.create({ data: { ...type, isSystem: true } });

    typeIds[type.name] = saved.id;
  }

  return typeIds;
}

async function seedDemoUser() {
  const password = await bcrypt.hash(DEMO_USER.password, 12);
  const data = {
    name: DEMO_USER.name,
    password,
    isPro: false,
    emailVerified: new Date(),
  };

  return prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: data,
    create: { email: DEMO_USER.email, ...data },
  });
}

// Replace the demo user's sample data so the seed can be re-run safely.
// ItemCollection rows cascade when items and collections are deleted.
async function resetDemoData(userId: string) {
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });
}

async function seedCollections(userId: string, typeIds: Record<string, string>) {
  for (const collection of COLLECTIONS) {
    const { id: collectionId } = await prisma.collection.create({
      data: {
        name: collection.name,
        description: collection.description,
        isFavorite: collection.isFavorite ?? false,
        defaultTypeId: typeIds[collection.defaultType],
        userId,
      },
    });

    for (const { type, ...item } of collection.items) {
      await prisma.item.create({
        data: {
          ...item,
          contentType: CONTENT_TYPES[type],
          itemTypeId: typeIds[type],
          userId,
          collections: { create: { collectionId } },
        },
      });
    }
  }
}

async function main() {
  const typeIds = await seedSystemTypes();
  console.log(`Seeded ${SYSTEM_TYPES.length} system item types`);

  const user = await seedDemoUser();
  console.log(`Seeded demo user ${user.email}`);

  await resetDemoData(user.id);
  await seedCollections(user.id, typeIds);

  const itemCount = COLLECTIONS.reduce((sum, c) => sum + c.items.length, 0);
  console.log(`Seeded ${COLLECTIONS.length} collections and ${itemCount} items`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
