import { useMemo, useState } from 'preact/hooks';
import { filterPieces, type PieceLite } from '../../lib/filters';

export default function WorksFilter({ items }: { items: PieceLite[] }) {
  const [f, setF] = useState<{ collection?: string; chain?: string; technique?: string }>({});
  const shown = useMemo(() => filterPieces(items, f), [items, f]);
  const set = (k: 'collection' | 'chain' | 'technique', v: string | undefined) =>
    setF((x) => ({ ...x, [k]: v }));

  return (
    <div class="works">
      <div class="filters">
        <select onChange={(e) => set('collection', ((e.currentTarget as HTMLSelectElement).value || undefined))}>
          <option value="">all collections</option>
          <option value="depths-of-glitch">Depths of Glitch</option>
          <option value="glitch-maps">Glitch Maps</option>
          <option value="murky-depths">Murky Depths</option>
          <option value="lurkers">Lurkers</option>
          <option value="orange-editions">Orange Editions</option>
        </select>
        <select onChange={(e) => set('chain', ((e.currentTarget as HTMLSelectElement).value || undefined))}>
          <option value="">all chains</option>
          <option value="ethereum">ETH</option>
          <option value="bitcoin">BTC</option>
          <option value="tezos">TZ</option>
        </select>
        <select onChange={(e) => set('technique', ((e.currentTarget as HTMLSelectElement).value || undefined))}>
          <option value="">all techniques</option>
          <option value="p5">p5</option>
          <option value="three.js">three.js</option>
          <option value="mixed">mixed</option>
        </select>
      </div>
      {/*
        v1 scope: click jumps to the parent collection page.
        The spec mentions a per-piece modal on collection pages, but v1 shows
        metadata inline (see CollectionLayout) — modal is post-v1 scope.
      */}
      <div class="works-grid">
        {shown.map((p) => (
          <a class="work" href={`/${p.collection}`}>
            <div class="title">{p.title}</div>
            <div class="sub">{p.collection} · {p.chain}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
