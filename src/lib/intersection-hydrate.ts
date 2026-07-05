export function makeHydrator(hydrate: (el: Element) => void) {
  const done = new WeakSet<Element>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && !done.has(entry.target)) {
        hydrate(entry.target);
        done.add(entry.target);
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '200px' });
  return {
    observe: (el: Element) => observer.observe(el),
    disconnect: () => observer.disconnect(),
  };
}
