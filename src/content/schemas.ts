import { z } from 'zod';

export const pieceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  collection: z.enum([
    'depths-of-glitch',
    'glitch-maps',
    'murky-depths',
    'lurkers',
    'orange-editions',
    'art-token',
    'orange-haze',
    'the-glitch',
    'lurkersbtc',
    'lurker-pepes',
    'tezos-editions',
  ]),
  chain: z.enum(['ethereum', 'bitcoin', 'tezos']),
  technique: z.array(z.enum(['p5', 'three.js', 'mixed', 'other'])),
  marketplace_url: z.string().default(''),
  buy_enabled: z.boolean().default(true),
  live_source: z.string().optional(),
  thumbnail: z.string().optional(),
  date: z.string(),
  notes: z.string().optional(),
  featured: z.boolean().default(false),
  featured_order: z.number().optional(),
});

export const writingSchema = z.object({
  title: z.string(),
  updated: z.string(),
});
