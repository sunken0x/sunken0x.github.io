import { useEffect } from 'preact/hooks';

type Piece = {
  slug: string;
  title: string;
  live_source?: string;
  notes?: string;
  marketplace_url: string;
  buy_enabled: boolean;
};

export default function DogImmersive({
  piece,
  prevSlug,
  nextSlug,
}: { piece: Piece; prevSlug: string | null; nextSlug: string | null }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') window.location.href = '/depths-of-glitch';
      if (e.key === 'ArrowLeft' && prevSlug) window.location.href = `/depths-of-glitch/${prevSlug}`;
      if (e.key === 'ArrowRight' && nextSlug) window.location.href = `/depths-of-glitch/${nextSlug}`;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prevSlug, nextSlug]);

  return (
    <div class="immersive">
      {piece.live_source && (
        <iframe class="full" src={piece.live_source} sandbox="allow-scripts" title={piece.title} />
      )}
      <div class="overlay">
        <h2>{piece.title}</h2>
        {piece.notes && <p>{piece.notes}</p>}
        {piece.buy_enabled && piece.marketplace_url && (
          <a href={piece.marketplace_url} target="_blank" rel="noopener">Collect →</a>
        )}
        <a class="close" href="/depths-of-glitch">✕ back</a>
      </div>
    </div>
  );
}
