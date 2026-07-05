import { describe, it, expect } from 'vitest';
import { filterPieces } from '../../src/lib/filters';

const p = (o: any) => ({
  slug: o.slug ?? 's', title: 's', collection: o.collection ?? 'lurkers',
  chain: o.chain ?? 'ethereum', technique: o.technique ?? ['p5'],
});

describe('filterPieces', () => {
  const items = [
    p({ slug: 'a', collection: 'depths-of-glitch', chain: 'ethereum', technique: ['p5'] }),
    p({ slug: 'b', collection: 'lurkers', chain: 'bitcoin', technique: ['mixed'] }),
    p({ slug: 'c', collection: 'glitch-maps', chain: 'ethereum', technique: ['three.js'] }),
  ];

  it('returns all when no filters', () => {
    expect(filterPieces(items, {}).length).toBe(3);
  });
  it('filters by collection', () => {
    expect(filterPieces(items, { collection: 'lurkers' }).map((x) => x.slug)).toEqual(['b']);
  });
  it('filters by chain', () => {
    expect(filterPieces(items, { chain: 'ethereum' }).map((x) => x.slug)).toEqual(['a', 'c']);
  });
  it('filters by technique (any-match)', () => {
    expect(filterPieces(items, { technique: 'three.js' }).map((x) => x.slug)).toEqual(['c']);
  });
  it('combines filters (AND)', () => {
    expect(filterPieces(items, { chain: 'ethereum', technique: 'p5' }).map((x) => x.slug)).toEqual(['a']);
  });
});
