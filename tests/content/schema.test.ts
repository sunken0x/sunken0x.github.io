import { describe, it, expect } from 'vitest';
import { pieceSchema } from '../../src/content/schemas';

describe('pieceSchema', () => {
  const valid = {
    slug: 'scanner',
    title: 'Scanner',
    collection: 'depths-of-glitch',
    chain: 'ethereum',
    technique: ['p5'],
    marketplace_url: 'https://transientlabs.xyz/x',
    buy_enabled: true,
    live_source: 'https://example.com/piece.html',
    thumbnail: './thumb.jpg',
    date: '2024-06-01',
    notes: 'some notes',
    featured: false,
  };

  it('accepts a complete valid piece', () => {
    expect(() => pieceSchema.parse(valid)).not.toThrow();
  });

  it('rejects an invalid chain', () => {
    expect(() => pieceSchema.parse({ ...valid, chain: 'dogecoin' })).toThrow();
  });

  it('allows marketplace_url to be empty string (coming-soon state)', () => {
    expect(() => pieceSchema.parse({ ...valid, marketplace_url: '' })).not.toThrow();
  });

  it('defaults featured to false when omitted', () => {
    const { featured, ...rest } = valid;
    const parsed = pieceSchema.parse(rest);
    expect(parsed.featured).toBe(false);
  });

  it('accepts mixed-technique arrays', () => {
    expect(() => pieceSchema.parse({ ...valid, technique: ['p5', 'three.js'] })).not.toThrow();
  });
});
