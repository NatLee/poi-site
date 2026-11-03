/** Dark text used on light backgrounds. */
export const INK = '#1c1917';
/** Light text used on dark backgrounds. */
export const PAPER = '#ffffff';

/** Parses `#rgb` or `#rrggbb`. Throws on anything else, so a typo in the config fails the build. */
export function parseHex(hex: string): [number, number, number] {
  const m = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(hex.trim());
  if (!m) throw new Error(`Not a hex colour: "${hex}" (use #rgb or #rrggbb)`);
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join('') : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
export function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two colours, 1 to 21. Body text needs at least 4.5. */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Picks dark or light text, whichever is easier to read on `background`. */
export function readableOn(background: string): string {
  return contrast(INK, background) >= contrast(PAPER, background) ? INK : PAPER;
}

function toHex(rgb: number[]): string {
  return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * The colour itself if it is readable on `background` (WCAG `ratio`, default 4.5 for text),
 * otherwise the same hue darkened step by step until it is. Used for links and focus rings
 * on light backgrounds when the primary colour is a bright one.
 */
export function inkOn(color: string, background = PAPER, ratio = 4.5): string {
  const rgb = parseHex(color);
  for (let keep = 1; keep >= 0; keep -= 0.05) {
    const candidate = toHex(rgb.map((v) => v * keep));
    if (contrast(candidate, background) >= ratio) return candidate;
  }
  return '#000000';
}
