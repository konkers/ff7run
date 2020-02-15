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

export interface JobRunJobList {
  [index: string]: string; // maps character name to job.
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

// Two copies of the run are maintianed.  `full` is the complete, generated
// run while `current` is the current state of the run visable to the runner.
// As the runner unlocks more of the run (e.x. by aquiring a character) data
// from `full` to `current`.  This makes run generation easier while keeping
// the fun mechanic of unlocking as you go.
//
// `config` should be accessable to the user.
//
// Database rules are needed to enforce visibility here.
export interface StoredRun {
  config: RunConfig;
  full: Run;
  current: Run;
}
