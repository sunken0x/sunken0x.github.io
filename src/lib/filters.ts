export type PieceLite = {
  slug: string; title: string;
  collection: string; chain: string; technique: string[];
};
export type Filters = {
  collection?: string; chain?: string; technique?: string;
};
export function filterPieces<T extends PieceLite>(items: T[], f: Filters): T[] {
  return items.filter((p) => {
    if (f.collection && p.collection !== f.collection) return false;
    if (f.chain && p.chain !== f.chain) return false;
    if (f.technique && !p.technique.includes(f.technique)) return false;
    return true;
  });
}
