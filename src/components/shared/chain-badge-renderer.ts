export type Chain = 'ethereum' | 'bitcoin' | 'tezos';

export function chainBadgeProps(chain: Chain) {
  switch (chain) {
    case 'ethereum': return { label: 'ETH', color: 'var(--glitch-mag)' };
    case 'bitcoin':  return { label: 'BTC', color: 'var(--accent-orange)' };
    case 'tezos':    return { label: 'TZ',  color: 'var(--glitch-cyan)' };
    default: {
      const _exhaustive: never = chain;
      throw new Error(`Unknown chain: ${_exhaustive}`);
    }
  }
}
