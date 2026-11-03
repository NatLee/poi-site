import { Monitor, Moon, Sun } from 'lucide-react';
import { nextMode } from '../lib/color-mode.ts';
import { cn } from '../lib/cn.ts';
import type { ColorMode } from '../types.ts';

const LABELS: Record<ColorMode, string> = { system: 'System', light: 'Light', dark: 'Dark' };
const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;

interface Props {
  mode: ColorMode;
  onChange: (mode: ColorMode) => void;
  /** Show the mode name next to the icon (used in the mobile menu). */
  showLabel?: boolean;
  className?: string;
}

/** Cycles the colour mode: System → Light → Dark. */
export function ColorModeToggle({ mode, onChange, showLabel = false, className }: Props) {
  const Icon = ICONS[mode];
  const next = nextMode(mode);
  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      aria-label={`Color theme: ${LABELS[mode]}. Switch to ${LABELS[next]}.`}
      title={`Color theme: ${LABELS[mode]}`}
      className={cn(
        'inline-flex h-9 min-w-9 cursor-pointer items-center justify-center gap-2 rounded-md px-2 text-white/90 transition-colors duration-200 hover:bg-white/15',
        className,
      )}
    >
      <Icon aria-hidden className="size-[18px]" />
      {showLabel && <span aria-hidden>Theme: {LABELS[mode]}</span>}
    </button>
  );
}
