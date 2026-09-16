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

export function getTypeIcon(icon: string): LucideIcon {
  return TYPE_ICONS[icon] ?? File;
}

export function getTypeTextClass(slug: string): string {
  return TYPE_TEXT_CLASSES[slug] ?? "text-muted-foreground";
}
