import { describe, it, expect, vi } from 'vitest';
import { createKonami } from '../../src/lib/konami';

describe('createKonami', () => {
  it('fires the callback when the exact sequence is pressed', () => {
    const cb = vi.fn();
    const k = createKonami(cb);
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    seq.forEach((key) => k.handle({ key } as KeyboardEvent));
    expect(cb).toHaveBeenCalledTimes(1);
  });
  it('does not fire on wrong sequence', () => {
    const cb = vi.fn();
    const k = createKonami(cb);
    ['ArrowUp','ArrowDown'].forEach((key) => k.handle({ key } as KeyboardEvent));
    expect(cb).not.toHaveBeenCalled();
  });
  it('resets when a wrong key breaks the sequence', () => {
    const cb = vi.fn();
    const k = createKonami(cb);
    ['ArrowUp','ArrowUp','x','ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
      .forEach((key) => k.handle({ key } as KeyboardEvent));
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
