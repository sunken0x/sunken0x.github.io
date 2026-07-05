import { useEffect, useRef } from 'preact/hooks';
import { makeHydrator } from '../../lib/intersection-hydrate';
import { prefersReducedMotion } from '../../lib/reduced-motion';

type Piece = {
  slug: string;
  title: string;
  live_source?: string;
  thumbnail?: string;
  technique: string[];
};

function pad(n: number, len = 4) { return String(n).padStart(len, '0'); }

export default function DogGrid({ pieces }: { pieces: Piece[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduced = prefersReducedMotion();
    const hydrator = makeHydrator((el) => {
      if (reduced || pausedRef.current) return;
      const slot = el.querySelector('.dog-slot');
      const src = (el as HTMLElement).dataset.src;
      if (!slot || !src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.setAttribute('sandbox', 'allow-scripts');
      iframe.loading = 'lazy';
      slot.innerHTML = '';
      slot.appendChild(iframe);
    });
    rootRef.current.querySelectorAll<HTMLElement>('.dog-tile').forEach((el) => hydrator.observe(el));
    return () => hydrator.disconnect();
  }, [pieces]);

  return (
    <div ref={rootRef} class="dog-grid">
      {pieces.map((p, i) => {
        const depth = 800 + i * 130;
        return (
          <a
            class="dog-tile"
            href={`/depths-of-glitch/${p.slug}`}
            data-src={p.live_source}
            data-technique={p.technique.join(',')}
            data-hover
          >
            <div class="dog-tile-head">
              <span class="depth">−{pad(depth)}m</span>
              <span>№ {pad(i + 1, 2)}</span>
            </div>
            <div class="dog-slot">
              {p.thumbnail ? <img src={p.thumbnail} alt={p.title} /> : <span>awaiting sonar</span>}
            </div>
            <div class="dog-tile-foot">
              <span class="t">{p.title}</span>
              <span class="tech">{p.technique.join(' · ')}</span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
