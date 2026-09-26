import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { TYPE_SELECT, toCollectionItemType } from "@/lib/db/collections";
import type { DashboardItem, ItemStats } from "@/types/items";

const ITEM_SELECT = {
  id: true,
  title: true,
  description: true,
  isPinned: true,
  isFavorite: true,
  updatedAt: true,
  itemType: { select: TYPE_SELECT },
  tags: { select: { name: true }, orderBy: { name: "asc" } },
} satisfies Prisma.ItemSelect;

type ItemRecord = Prisma.ItemGetPayload<{ select: typeof ITEM_SELECT }>;

function toDashboardItem({ itemType, tags, updatedAt, ...item }: ItemRecord): DashboardItem {
  return {
    ...item,
    updatedAt: updatedAt.toISOString(),
    tags: tags.map((tag) => tag.name),
    type: toCollectionItemType(itemType),
  };
}

/** A user's pinned items, most recently updated first. */
export async function getPinnedItems(userId: string): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: ITEM_SELECT,
  });

  return items.map(toDashboardItem);
}

/** A user's most recently updated items, pinned or not. */
export async function getRecentItems(userId: string, limit = 10): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: ITEM_SELECT,
  });

  return items.map(toDashboardItem);
}

/** Total and favorite item counts for a user. */
export async function getItemStats(userId: string): Promise<ItemStats> {
  const [total, favorites] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
}
