import { Job, Materia } from './model';

import * as materia from './materia.json';
import * as characters from './characters.json';
import * as jobs from './jobs.json';

const defaultName = 'default';

export function materia_list(): Materia[] {
  if (defaultName in materia) {
    return materia[defaultName];
  } else {
    return (materia as any) as Materia[];
  }
}

export function character_list(): string[] {
  if (defaultName in characters) {
    return characters[defaultName];
  } else {
    return characters;
  }
}

export function job_list(): Job[] {
  if (defaultName in jobs) {
    return jobs[defaultName];
  } else {
    return jobs;
  }
}
