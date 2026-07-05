import { describe, it, expect } from 'vitest';
import { chainBadgeProps } from '../../src/components/shared/chain-badge-renderer';

describe('chainBadgeProps', () => {
  it('returns ETH label + magenta colour for ethereum', () => {
    expect(chainBadgeProps('ethereum')).toEqual({ label: 'ETH', color: 'var(--glitch-mag)' });
  });
  it('returns BTC for bitcoin', () => {
    expect(chainBadgeProps('bitcoin').label).toBe('BTC');
  });
  it('returns TZ for tezos', () => {
    expect(chainBadgeProps('tezos').label).toBe('TZ');
  });
  it('throws on unknown chain', () => {
    // @ts-expect-error
    expect(() => chainBadgeProps('dogecoin')).toThrow();
  });
});
