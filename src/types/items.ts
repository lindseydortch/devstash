import type { CollectionItemType } from "@/types/collections";

/** Item with the fields the dashboard's pinned and recent cards need. */
export interface DashboardItem {
  id: string;
  title: string;
  description: string | null;
  isPinned: boolean;
  isFavorite: boolean;
  /** ISO timestamp */
  updatedAt: string;
  tags: string[];
  type: CollectionItemType;
}

export interface ItemStats {
  total: number;
  favorites: number;
}
