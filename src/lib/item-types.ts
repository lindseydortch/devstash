import {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { itemTypes, type ItemType } from "@/lib/mock-data";

/** Lucide icon name stored on an item type → the icon component. */
const TYPE_ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link,
};

/**
 * Text color class per item type slug.
 *
 * Tailwind only generates classes it can see, so the type colors live as theme
 * tokens in globals.css and are looked up here instead of built from the hex
 * value on the type.
 */
const TYPE_TEXT_CLASSES: Record<string, string> = {
  snippets: "text-type-snippet",
  prompts: "text-type-prompt",
  commands: "text-type-command",
  notes: "text-type-note",
  files: "text-type-file",
  images: "text-type-image",
  links: "text-type-link",
};

/** Left accent border on item and collection cards. */
const TYPE_BORDER_CLASSES: Record<string, string> = {
  snippets: "border-l-type-snippet",
  prompts: "border-l-type-prompt",
  commands: "border-l-type-command",
  notes: "border-l-type-note",
  files: "border-l-type-file",
  images: "border-l-type-image",
  links: "border-l-type-link",
};

/** Barely-there card wash, tinted by the type a collection holds most. */
const TYPE_SURFACE_CLASSES: Record<string, string> = {
  snippets: "bg-type-snippet/5",
  prompts: "bg-type-prompt/5",
  commands: "bg-type-command/5",
  notes: "bg-type-note/5",
  files: "bg-type-file/5",
  images: "bg-type-image/5",
  links: "bg-type-link/5",
};

/** Filled square behind a type icon. */
const TYPE_ACCENT_CLASSES: Record<string, string> = {
  snippets: "bg-type-snippet/10",
  prompts: "bg-type-prompt/10",
  commands: "bg-type-command/10",
  notes: "bg-type-note/10",
  files: "bg-type-file/10",
  images: "bg-type-image/10",
  links: "bg-type-link/10",
};

/**
 * Item type for an id stored on an item or collection.
 *
 * Falls back to the first type so a card with stale data still renders.
 */
export function getTypeById(id: string): ItemType {
  return itemTypes.find((type) => type.id === id) ?? itemTypes[0];
}

export function getTypeIcon(icon: string): LucideIcon {
  return TYPE_ICONS[icon] ?? File;
}

export function getTypeTextClass(slug: string): string {
  return TYPE_TEXT_CLASSES[slug] ?? "text-muted-foreground";
}

export function getTypeBorderClass(slug: string): string {
  return TYPE_BORDER_CLASSES[slug] ?? "border-l-border";
}

export function getTypeSurfaceClass(slug: string): string {
  return TYPE_SURFACE_CLASSES[slug] ?? "";
}

export function getTypeAccentClass(slug: string): string {
  return TYPE_ACCENT_CLASSES[slug] ?? "bg-muted";
}
