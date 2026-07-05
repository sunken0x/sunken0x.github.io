const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function createKonami(onMatch: () => void) {
  let i = 0;
  return {
    handle(e: KeyboardEvent) {
      const want = SEQ[i];
      if (e.key === want) {
        i += 1;
        if (i === SEQ.length) { onMatch(); i = 0; }
      } else {
        i = e.key === SEQ[0] ? 1 : 0;
      }
    },
  };
}
