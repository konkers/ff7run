import { Job, Materia } from "./model";

import * as materia from "./materia.json";
import * as characters from "./characters.json";
import * as jobs from "./jobs.json";


export const MATERIA_LIST: Materia[] = <Materia[]>(materia["default"]);
export const CHARACTER_LIST: string[] = <string[]>characters["default"];
export const JOB_LIST: Job[] = <Job[]>jobs["default"];
