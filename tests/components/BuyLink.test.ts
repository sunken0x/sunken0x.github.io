import { describe, it, expect } from 'vitest';
import { buyLinkState } from '../../src/components/shared/buy-link-state';

describe('buyLinkState', () => {
  it('returns "live" with url when buy_enabled and url present', () => {
    expect(buyLinkState({ buy_enabled: true, marketplace_url: 'https://x' }))
      .toEqual({ state: 'live', url: 'https://x' });
  });
  it('returns "coming-soon" when url is empty', () => {
    expect(buyLinkState({ buy_enabled: true, marketplace_url: '' }).state).toBe('coming-soon');
  });
  it('returns "disabled" when buy_enabled is false', () => {
    expect(buyLinkState({ buy_enabled: false, marketplace_url: 'https://x' }).state).toBe('disabled');
  });
});
