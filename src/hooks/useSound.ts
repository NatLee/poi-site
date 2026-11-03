import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Loads a short sound up front and plays it from the start on every call to `play()`,
 * even if the previous play has not finished. `playing` is true while it is audible.
 */
export function useSound(src: string | undefined) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    const el = new Audio(src);
    el.preload = 'auto';
    const stop = () => setPlaying(false);
    el.addEventListener('ended', stop);
    el.addEventListener('pause', stop);
    audio.current = el;
    return () => {
      el.removeEventListener('ended', stop);
      el.removeEventListener('pause', stop);
      el.pause();
      audio.current = null;
    };
  }, [src]);

  const play = useCallback(() => {
    const el = audio.current;
    if (!el) return;
    el.currentTime = 0;
    setPlaying(true);
    // play() rejects when the browser refuses (e.g. no audio device); just reset the state.
    Promise.resolve(el.play()).catch(() => setPlaying(false));
  }, []);

  return { play, playing };
}
