export type BuyLinkState =
  | { state: 'live'; url: string }
  | { state: 'coming-soon' }
  | { state: 'disabled' };

export function buyLinkState(p: { buy_enabled: boolean; marketplace_url: string }): BuyLinkState {
  if (!p.buy_enabled) return { state: 'disabled' };
  if (!p.marketplace_url) return { state: 'coming-soon' };
  return { state: 'live', url: p.marketplace_url };
}
