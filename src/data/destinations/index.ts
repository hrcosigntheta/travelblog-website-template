import type { Destination } from './types';
import { elNido } from './el-nido';
import { siargao } from './siargao';
import { chocolateHills } from './chocolate-hills';
import { boracay } from './boracay';
import { kawasanFalls } from './kawasan-falls';
import { moalboal } from './moalboal';
import { oslob } from './oslob';
import { malapascua } from './malapascua';
import { bantayan } from './bantayan';
import { camotes } from './camotes';
import { templeOfLeah } from './temple-of-leah';
import { topsLookout } from './tops-lookout';

export const destinations: Destination[] = [
  elNido,
  siargao,
  chocolateHills,
  boracay,
  kawasanFalls,
  moalboal,
  oslob,
  malapascua,
  bantayan,
  camotes,
  templeOfLeah,
  topsLookout,
];

export * from './types';
