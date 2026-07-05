import { describe, it, expect, vi, afterEach } from 'vitest';
import { makeHydrator } from '../../src/lib/intersection-hydrate';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('makeHydrator', () => {
  it('calls hydrate once per intersecting element and disconnects', () => {
    const observe = vi.fn();
    const disconnect = vi.fn();
    const unobserve = vi.fn();
    const hydrate = vi.fn();
    let storedCb: IntersectionObserverCallback = () => {};
    class ObserverMock {
      constructor(cb: IntersectionObserverCallback) { storedCb = cb; }
      observe = observe;
      disconnect = disconnect;
      unobserve = unobserve;
    }
    vi.stubGlobal('IntersectionObserver', ObserverMock);

    const el = document.createElement('div');
    const hydrator = makeHydrator(hydrate);
    hydrator.observe(el);
    storedCb([{ isIntersecting: true, target: el } as any], {} as any);

    expect(hydrate).toHaveBeenCalledWith(el);
    expect(hydrate).toHaveBeenCalledTimes(1);

    // Second intersection should not re-hydrate
    storedCb([{ isIntersecting: true, target: el } as any], {} as any);
    expect(hydrate).toHaveBeenCalledTimes(1);
  });
});
