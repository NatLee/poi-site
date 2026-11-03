import { Volume2 } from 'lucide-react';
import { cn } from '../lib/cn.ts';

interface Props {
  label: string;
  playing: boolean;
  onPlay: () => void;
  className?: string;
}

/** The "Play POI" button. Plays the configured sound from the start on every click. */
export function SoundButton({ label, playing, onPlay, className }: Props) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className={cn(
        'inline-flex h-9 cursor-pointer items-center gap-2 rounded-md px-4 text-[15px] font-normal text-white ring-2 ring-white/50 ring-inset transition-colors duration-200 hover:bg-white/10 active:bg-white/20',
        className,
      )}
    >
      <Volume2 aria-hidden className={cn('size-4', playing && 'motion-safe:animate-pulse')} />
      {label}
    </button>
  );
}
