/**
 * Mock data for the dashboard UI.
 *
 * Single source of truth for UI development until the database is wired up.
 * Shapes mirror the Prisma models in context/project-overview.md, minus the
 * fields the dashboard does not display.
 */

export type ContentType = "TEXT" | "FILE" | "URL";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface ItemType {
  id: string;
  name: string;
  /** Route segment, e.g. /items/snippets */
  slug: string;
  /** Lucide icon name */
  icon: string;
  /** Hex color used for card borders, icons and accents */
  color: string;
  contentType: ContentType;
  /** Shown next to the type in the sidebar */
  itemCount: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  isFavorite: boolean;
  /** Drives the card accent color */
  defaultTypeId: string;
  /** Type icons shown on the collection card */
  itemTypeIds: string[];
}

export interface Item {
  id: string;
  title: string;
  description: string;
  typeId: string;
  /** Text content; null for file and link items */
  content: string | null;
  /** Link items */
  url: string | null;
  /** File and image items */
  fileName: string | null;
  language: string | null;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  collectionIds: string[];
  createdAt: string;
  updatedAt: string;
}

export const currentUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: false,
};

export const itemTypes: ItemType[] = [
  {
    id: "type-snippet",
    name: "Snippets",
    slug: "snippets",
    icon: "Code",
    color: "#3b82f6",
    contentType: "TEXT",
    itemCount: 24,
  },
  {
    id: "type-prompt",
    name: "Prompts",
    slug: "prompts",
    icon: "Sparkles",
    color: "#8b5cf6",
    contentType: "TEXT",
    itemCount: 18,
  },
  {
    id: "type-command",
    name: "Commands",
    slug: "commands",
    icon: "Terminal",
    color: "#f97316",
    contentType: "TEXT",
    itemCount: 15,
  },
  {
    id: "type-note",
    name: "Notes",
    slug: "notes",
    icon: "StickyNote",
    color: "#fde047",
    contentType: "TEXT",
    itemCount: 12,
  },
  {
    id: "type-file",
    name: "Files",
    slug: "files",
    icon: "File",
    color: "#6b7280",
    contentType: "FILE",
    itemCount: 5,
  },
  {
    id: "type-image",
    name: "Images",
    slug: "images",
    icon: "Image",
    color: "#ec4899",
    contentType: "FILE",
    itemCount: 3,
  },
  {
    id: "type-link",
    name: "Links",
    slug: "links",
    icon: "Link",
    color: "#10b981",
    contentType: "URL",
    itemCount: 8,
  },
];

export const collections: Collection[] = [
  {
    id: "collection-react-patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    itemCount: 12,
    isFavorite: true,
    defaultTypeId: "type-snippet",
    itemTypeIds: ["type-snippet", "type-note", "type-link"],
  },
  {
    id: "collection-python-snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    itemCount: 8,
    isFavorite: false,
    defaultTypeId: "type-snippet",
    itemTypeIds: ["type-snippet", "type-note"],
  },
  {
    id: "collection-context-files",
    name: "Context Files",
    description: "AI context files for projects",
    itemCount: 5,
    isFavorite: true,
    defaultTypeId: "type-file",
    itemTypeIds: ["type-file", "type-note"],
  },
  {
    id: "collection-interview-prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    itemCount: 24,
    isFavorite: false,
    defaultTypeId: "type-note",
    itemTypeIds: ["type-note", "type-snippet", "type-link", "type-prompt"],
  },
  {
    id: "collection-git-commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    itemCount: 15,
    isFavorite: true,
    defaultTypeId: "type-command",
    itemTypeIds: ["type-command", "type-note"],
  },
  {
    id: "collection-ai-prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    itemCount: 18,
    isFavorite: false,
    defaultTypeId: "type-prompt",
    itemTypeIds: ["type-prompt", "type-snippet", "type-note"],
  },
];

export const items: Item[] = [
  {
    id: "item-use-auth-hook",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    typeId: "type-snippet",
    content: `import { useContext } from "react";
import { AuthContext } from "@/context/auth";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}`,
    url: null,
    fileName: null,
    language: "typescript",
    tags: ["react", "auth", "hooks"],
    isFavorite: true,
    isPinned: true,
    collectionIds: ["collection-react-patterns", "collection-interview-prep"],
    createdAt: "2026-01-15T09:24:00.000Z",
    updatedAt: "2026-01-15T09:24:00.000Z",
  },
  {
    id: "item-api-error-handling",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    typeId: "type-snippet",
    content: `export async function fetchWithRetry(url: string, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
    } catch {
      await new Promise((r) => setTimeout(r, 2 ** attempt * 200));
    }
  }
  throw new Error("Request failed after retries");
}`,
    url: null,
    fileName: null,
    language: "typescript",
    tags: ["api", "fetch", "error-handling"],
    isFavorite: false,
    isPinned: true,
    collectionIds: ["collection-react-patterns"],
    createdAt: "2026-01-12T14:02:00.000Z",
    updatedAt: "2026-01-12T14:02:00.000Z",
  },
  {
    id: "item-undo-last-commit",
    title: "Undo Last Commit",
    description: "Reset the last commit but keep the changes staged",
    typeId: "type-command",
    content: "git reset --soft HEAD~1",
    url: null,
    fileName: null,
    language: "bash",
    tags: ["git", "undo"],
    isFavorite: true,
    isPinned: true,
    collectionIds: ["collection-git-commands"],
    createdAt: "2026-01-10T11:45:00.000Z",
    updatedAt: "2026-01-11T08:15:00.000Z",
  },
  {
    id: "item-code-review-prompt",
    title: "Code Review System Prompt",
    description: "System prompt for thorough pull request reviews",
    typeId: "type-prompt",
    content:
      "You are a senior engineer reviewing a pull request. Focus on correctness, edge cases, and security. Point out only issues that would change the reviewer's decision.",
    url: null,
    fileName: null,
    language: null,
    tags: ["ai", "review", "prompt"],
    isFavorite: true,
    isPinned: false,
    collectionIds: ["collection-ai-prompts"],
    createdAt: "2026-01-09T16:30:00.000Z",
    updatedAt: "2026-01-09T16:30:00.000Z",
  },
  {
    id: "item-debounce-snippet",
    title: "useDebounce Hook",
    description: "Debounce a fast-changing value in React",
    typeId: "type-snippet",
    content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    url: null,
    fileName: null,
    language: "typescript",
    tags: ["react", "hooks", "performance"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["collection-react-patterns"],
    createdAt: "2026-01-08T10:05:00.000Z",
    updatedAt: "2026-01-08T10:05:00.000Z",
  },
  {
    id: "item-prisma-migrate-notes",
    title: "Prisma Migration Checklist",
    description: "Steps to run before shipping a schema change",
    typeId: "type-note",
    content: `1. Update schema.prisma
2. npx prisma migrate dev --name <descriptive_name>
3. npx prisma migrate status
4. Commit the migration with the schema change`,
    url: null,
    fileName: null,
    language: null,
    tags: ["prisma", "database"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["collection-context-files"],
    createdAt: "2026-01-07T13:20:00.000Z",
    updatedAt: "2026-01-07T13:20:00.000Z",
  },
  {
    id: "item-tailwind-docs",
    title: "Tailwind CSS v4 Docs",
    description: "CSS-first configuration reference",
    typeId: "type-link",
    content: null,
    url: "https://tailwindcss.com/docs",
    fileName: null,
    language: null,
    tags: ["css", "docs"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["collection-react-patterns"],
    createdAt: "2026-01-06T09:00:00.000Z",
    updatedAt: "2026-01-06T09:00:00.000Z",
  },
  {
    id: "item-project-context-file",
    title: "project-overview.md",
    description: "Project context file handed to the AI agent",
    typeId: "type-file",
    content: null,
    url: null,
    fileName: "project-overview.md",
    language: null,
    tags: ["context", "ai"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["collection-context-files"],
    createdAt: "2026-01-05T15:40:00.000Z",
    updatedAt: "2026-01-05T15:40:00.000Z",
  },
  {
    id: "item-big-o-cheatsheet",
    title: "Big-O Cheat Sheet",
    description: "Time complexity reference image for interviews",
    typeId: "type-image",
    content: null,
    url: null,
    fileName: "big-o-cheatsheet.png",
    language: null,
    tags: ["interview", "algorithms"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["collection-interview-prep"],
    createdAt: "2026-01-04T12:10:00.000Z",
    updatedAt: "2026-01-04T12:10:00.000Z",
  },
  {
    id: "item-python-list-comprehension",
    title: "Flatten a Nested List",
    description: "One-line list comprehension for flattening",
    typeId: "type-snippet",
    content: "flat = [item for sublist in nested for item in sublist]",
    url: null,
    fileName: null,
    language: "python",
    tags: ["python", "lists"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["collection-python-snippets"],
    createdAt: "2026-01-03T17:55:00.000Z",
    updatedAt: "2026-01-03T17:55:00.000Z",
  },
];
