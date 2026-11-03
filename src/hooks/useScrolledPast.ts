import { useEffect, useState, type RefObject } from 'react';

/**
 * True once the page has scrolled past `fraction` of the element's height
 * (0.5 = halfway down the hero), false again when scrolling back up.
 */
export function useScrolledPast(ref: RefObject<HTMLElement | null>, fraction = 0.5): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    // React skips the re-render when the value has not changed, so this is cheap per scroll event.
    const update = () => {
      const el = ref.current;
      if (el) setPast(window.scrollY > el.offsetTop + el.offsetHeight * fraction);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref, fraction]);

  return past;
}
