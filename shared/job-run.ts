import { JobRunData, Run, RunType } from "./model";
import { CHARACTER_LIST, JOB_LIST } from "./data";

// TODO: Investigate using window.crypto.getRandomValues() for better
// RNG.  Does this work with cloud functions?
function get_random_int(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function get_job(run: Run, character: string): string {
  if (run.ty != RunType.Job) {
    throw `run is not a job run`;
  }

  if (!CHARACTER_LIST.includes(character)) {
    throw `${character} does not exist`;
  }

  if (character in run.job_data.jobs) {
    throw `${character} already has a job`;
  }

  // TODO(implement) uniqueness flag.

  return JOB_LIST[get_random_int(JOB_LIST.length)].name;
}

export function assign_job(run: Run, character: string) {
  const job = get_job(run, character);
  run.job_data.jobs[character] = job;
}

export function new_job_run(): Run {
  let run: Run = {
    ty: RunType.Job,
    job_data: {
      jobs: {}
    }
  };

  run.job_data.jobs["Cloud"] = get_job(run, "Cloud");

  return run;
}
