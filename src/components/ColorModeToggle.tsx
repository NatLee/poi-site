import { Monitor, Moon, Sun } from 'lucide-react';
import { nextMode } from '../lib/color-mode.ts';
import { cn } from '../lib/cn.ts';
import { colorModeName, fill } from '../lib/defaults.ts';
import { useLabels } from '../lib/labels.ts';
import type { Tone } from '../lib/tone.ts';
import type { ColorMode } from '../types.ts';

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;

interface Props {
  mode: ColorMode;
  onChange: (mode: ColorMode) => void;
  tone: Tone;
  /** Show the mode name next to the icon (used in the phone menu). */
  showLabel?: boolean;
  className?: string;
}

/** Cycles the colour mode: System → Light → Dark. */
export function ColorModeToggle({ mode, onChange, tone, showLabel = false, className }: Props) {
  const Icon = ICONS[mode];
  const next = nextMode(mode);
  const labels = useLabels();
  const current = colorModeName(labels, mode);
  const short = fill(labels.colorModeShort, { current });
  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      aria-label={fill(labels.colorModeButton, { current, next: colorModeName(labels, next) })}
      title={short}
      className={cn(
        'inline-flex h-10 min-w-10 cursor-pointer items-center justify-center gap-2 rounded-full px-2.5 text-sm font-semibold transition-colors duration-200',
        tone.text,
        tone.hover,
        className,
      )}
    >
      <Icon aria-hidden className="size-[18px]" />
      {showLabel && <span aria-hidden>{short}</span>}
    </button>
  );
}
