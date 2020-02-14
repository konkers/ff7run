// These are needed to generate timestamps.
import firebase from "@firebase/app";
import "@firebase/firestore";

import { RunConfig, Run, RunType, StoredRun } from "./model";
import { CHARACTER_LIST, JOB_LIST } from "./data";

// TODO: Investigate using window.crypto.getRandomValues() for better
// RNG.  Does this work with cloud functions?
function get_random_int(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function new_job_run(config: RunConfig): StoredRun {
  let full_run: Run = {
    ty: RunType.Job,
    job_data: {
      jobs: {}
    }
  };

  for (const char of CHARACTER_LIST) {
    full_run.job_data.jobs[char] = {
      name: JOB_LIST[get_random_int(JOB_LIST.length)].name,
      has_lure: false,
      has_underwater: false
    };
  }

  // Start the current run with cloud unlocked.
  const current_run: Run = {
    ty: RunType.Job,
    job_data: {
      jobs: {
        Cloud: full_run.job_data.jobs["Cloud"]
      }
    }
  };

  return {
    config: config,
    log: [
      { when: firebase.firestore.Timestamp.now(), message: "Run started." }
    ],
    full: full_run,
    current: current_run
  };
}
