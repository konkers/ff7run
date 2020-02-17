import { Timestamp } from '@firebase/firestore-types';

export enum MateriaType {
  Command = 'command',
  Independent = 'independent',
  Magic = 'magic',
  Summon = 'summon',
  Support = 'support',
}

export interface Materia {
  name: string;
  ty: MateriaType;
}

export interface CharacterInfo {
  name: string;
  can_lure: boolean;
  can_underwater: boolean;
}

export interface Job {
  name: string;
  desc: string;
  materia: string[];
}

export enum RunType {
  Job = 'job',
  Unknown = 'unknown',
}

export interface JobInfo {
  name: string;
  has_lure: boolean;
  has_underwater: boolean;
}

export interface JobRunJobList {
  [index: string]: JobInfo; // maps character name to job.
}
export interface JobRunData {
  jobs: JobRunJobList;
}

export interface RunData {
  job_data?: JobRunData;
}

export interface RunConfig {
  ty: RunType;
}

export interface LogEntry {
  when: Timestamp;
  message: string;
}

// Data for a run is kept in a private `plan` which is only accessible to the
// backend and a public `state` which is public readable.  The `plan` includes
// the full details of the run while the `state` only contains data unlocked
// by the runner.  This makes run generation easier while keeping the fun
// mechanic of unlocking as you go.
//
// `plan` is just an instance of RunData.
export interface RunState {
  config: RunConfig;
  log: LogEntry[];
  data: RunData;
}

export interface UnlockJobCommand {
  run_id: string;
  name: string;
}
