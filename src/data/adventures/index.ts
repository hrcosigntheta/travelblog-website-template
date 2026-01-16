import { cebuAdventure } from './cebu-adventure';
import { palawanIslandHopping } from './palawan-island-hopping';
import { boholHiddenGems } from './bohol-hidden-gems';
import { philippineBeachGuide } from './philippine-beach-guide';
import type { Adventure } from './types';

export const adventures: Adventure[] = [
  cebuAdventure,
  palawanIslandHopping,
  boholHiddenGems,
  philippineBeachGuide,
];

export * from './types';
