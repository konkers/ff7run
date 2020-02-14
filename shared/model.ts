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
