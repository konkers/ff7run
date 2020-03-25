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
  location: string;
  effects: string[];
}

export interface CharacterInfo {
  name: string;
  can_lure: boolean;
  can_underwater: boolean;
  can_morph: boolean;
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

export enum RunStatus {
  Active = 'active',
  Finished = 'finished',
  Abandoned = 'abandoned',
}

export interface JobInfo {
  name: string;
  has_lure: boolean;
  has_underwater: boolean;
  has_morph: boolean;
}

export interface JobAliases {
  [index: string]: string;
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

export interface JobRunConfig {
  unique_jobs: boolean;
}

export interface RunConfig {
  ty: RunType;
  job_config?: JobRunConfig;
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
  id: string;
  config: RunConfig;
  status: RunStatus;
  timestamp: Timestamp;
  log: LogEntry[];
  data: RunData;
}

export interface UnlockJobCommand {
  run_id: string;
  name: string;
}

export interface UpdateRunStateCommand {
  run_id: string;
  new_status: RunStatus;
}

export interface ApiCommand {
  ping?: boolean;
  newRun?: RunConfig;
  unlockJob?: UnlockJobCommand;
  updateRunState?: UpdateRunStateCommand;
}
