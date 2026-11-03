import { createContext, useContext } from 'react';
import type { Labels } from '../types.ts';
import { DEFAULTS } from './defaults.ts';

/** The page's own words (see `labels` in the config). App provides them; components read them with useLabels(). */
export const LabelsContext = createContext<Labels>(DEFAULTS.labels);

export function useLabels(): Labels {
  return useContext(LabelsContext);
}
