import { useEffect, useRef, useState } from 'react';

export type UseStickyProps = {
  active?: boolean;
  observerOptions?: IntersectionObserverInit;
};

export const useSticky = (options?: UseStickyProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    if (!ref.current || options?.active === false) {
      return;
    }
    const observer = new IntersectionObserver(
      ([event]) => setIsSticky(event.intersectionRatio < 1),
      options?.observerOptions ?? {
        threshold: [1],
        rootMargin: '50px 0px 0px 0px'
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options?.active, options?.observerOptions]);
  return { ref, isSticky };
};
