import { Volume2 } from 'lucide-react';
import { cn } from '../lib/cn.ts';
import type { Tone } from '../lib/tone.ts';

interface Props {
  label: string;
  playing: boolean;
  onPlay: () => void;
  tone: Tone;
  className?: string;
}

/** The "Play POI" button. Plays the configured sound from the start on every click. */
export function SoundButton({ label, playing, onPlay, tone, className }: Props) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className={cn(
        'inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-200',
        tone.text,
        tone.hover,
        tone.ring,
        className,
      )}
    >
      <Volume2 aria-hidden className={cn('size-4', playing && 'text-primary motion-safe:animate-pulse')} />
      {label}
    </button>
  );
}
