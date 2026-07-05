#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FORBIDDEN = ['magiceden.io', 'magiceden.com'];
const ROOTS = ['src', 'public'];
const EXTS = ['.astro', '.ts', '.tsx', '.md', '.mdx', '.html', '.css'];

let hits = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) { walk(p); continue; }
    if (!EXTS.includes(p.slice(p.lastIndexOf('.')))) continue;
    const text = readFileSync(p, 'utf8');
    for (const f of FORBIDDEN) {
      if (text.toLowerCase().includes(f)) {
        console.error(`[dead-link] ${p} contains forbidden string: ${f}`);
        hits += 1;
      }
    }
  }
}
for (const r of ROOTS) walk(r);
if (hits > 0) { process.exit(1); }
console.log('[dead-link] ok — no forbidden strings found');
