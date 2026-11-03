/**
 * Colours for controls in the header. The header is transparent over the dark hero (white
 * controls) and turns into a light or dark bar after scrolling; it marks that state with
 * `data-solid="true"` on the element with the `group/header` class.
 */
export const headerTone = {
  text: 'text-white group-data-[solid=true]/header:text-slate-700 dark:group-data-[solid=true]/header:text-slate-200',
  hover:
    'hover:bg-white/10 group-data-[solid=true]/header:hover:bg-slate-900/5 dark:group-data-[solid=true]/header:hover:bg-white/10',
  ring: 'ring-1 ring-inset ring-white/25 group-data-[solid=true]/header:ring-slate-300 dark:group-data-[solid=true]/header:ring-white/15',
};

/** Colours for the same controls inside the phone menu (a normal light or dark panel). */
export const panelTone = {
  text: 'text-slate-800 dark:text-slate-100',
  hover: 'hover:bg-slate-100 dark:hover:bg-white/5',
  ring: 'ring-1 ring-inset ring-slate-300 dark:ring-white/15',
};

export type Tone = typeof headerTone;
