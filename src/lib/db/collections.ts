import { prisma } from "@/lib/db";
import type {
  CollectionItemType,
  CollectionStats,
  DashboardCollection,
} from "@/types/collections";

export const TYPE_SELECT = { id: true, name: true, icon: true } as const;

type TypeRecord = { id: string; name: string; icon: string };

/** Database type names are singular ("snippet"); routes and colors use plurals. */
export function toCollectionItemType(type: TypeRecord): CollectionItemType {
  return { id: type.id, name: type.name, slug: `${type.name}s`, icon: type.icon };
}

/** Distinct types in a collection, ordered by how many items use each. */
function rankTypes(types: TypeRecord[]): CollectionItemType[] {
  const counts = new Map<string, { type: TypeRecord; count: number }>();

  for (const type of types) {
    const entry = counts.get(type.id);
    if (entry) entry.count += 1;
    else counts.set(type.id, { type, count: 1 });
  }

  return [...counts.values()]
    .sort((a, b) => b.count - a.count || a.type.name.localeCompare(b.type.name))
    .map(({ type }) => toCollectionItemType(type));
}

/** A user's most recently updated collections, shaped for the dashboard cards. */
export async function getRecentCollections(
  userId: string,
  limit = 6,
): Promise<DashboardCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      defaultType: { select: TYPE_SELECT },
      items: { select: { item: { select: { itemType: { select: TYPE_SELECT } } } } },
    },
  });

  return collections.map(({ defaultType, items, ...collection }) => {
    const itemTypes = rankTypes(items.map(({ item }) => item.itemType));
    const fallback = defaultType ? toCollectionItemType(defaultType) : null;

    return {
      ...collection,
      itemCount: items.length,
      accentType: itemTypes[0] ?? fallback,
      itemTypes,
    };
  });
}

/** Total and favorite collection counts for a user. */
export async function getCollectionStats(userId: string): Promise<CollectionStats> {
  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
}
