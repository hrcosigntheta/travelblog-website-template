import type { Destination } from './types';
import { elNido } from './el-nido';
import { siargao } from './siargao';
import { chocolateHills } from './chocolate-hills';
import { boracay } from './boracay';

export const destinations: Destination[] = [elNido, siargao, chocolateHills, boracay];

export * from './types';
