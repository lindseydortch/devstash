/** Item type as shown on a collection card. */
export interface CollectionItemType {
  id: string;
  name: string;
  /** Route segment and color key, e.g. "snippets" */
  slug: string;
  /** Lucide icon name */
  icon: string;
}

/** Collection with the derived fields the dashboard card needs. */
export interface DashboardCollection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  /** Type the collection holds most, falling back to its default type */
  accentType: CollectionItemType | null;
  /** Every type in the collection, most-used first */
  itemTypes: CollectionItemType[];
}

export interface CollectionStats {
  total: number;
  favorites: number;
}
