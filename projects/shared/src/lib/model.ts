import { Timestamp } from "@firebase/firestore-types";

export enum MateriaType {
  Command = "command",
  Independent = "independent",
  Magic = "magic",
  Summon = "summon",
  Support = "support"
}

export interface Materia {
  name: string;
  ty: MateriaType;
}

export interface Job {
  name: string;
  desc: string;
  materia: string[];
}

export enum RunType {
  Job = "job",
  Unknown = "unknown"
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

export interface Run {
  ty: RunType;
  job_data?: JobRunData;
}

export interface RunConfig {
  ty: RunType;
}

export interface LogEntry {
  when: Timestamp;
  message: string;
}

// Two copies of the run are maintained.  `full` is the complete, generated
// run while `current` is the current state of the run visible to the runner.
// As the runner unlocks more of the run (e.x. by acquiring a character) data
// from `full` to `current`.  This makes run generation easier while keeping
// the fun mechanic of unlocking as you go.
//
// `config` should be accessible to the user.
//
// Database rules are needed to enforce visibility here.
export interface StoredRun {
  config: RunConfig;
  log: LogEntry[];
  full: Run;
  current: Run;
}
