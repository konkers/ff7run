import { Job, Materia } from './model';

import * as materia from './materia.json';
import * as characters from './characters.json';
import * as jobs from './jobs.json';

const defaultName = 'default';
export const MATERIA_LIST: Materia[] = materia[defaultName] as Materia[];
export const CHARACTER_LIST: string[] = characters[defaultName] as string[];
export const JOB_LIST: Job[] = jobs[defaultName] as Job[];
