// These are needed to generate timestamps.
import firebase from '@firebase/app';
import '@firebase/firestore';

import { RunConfig, Run, RunType, StoredRun } from './model';
import { CHARACTER_LIST, JOB_LIST } from './data';

// TODO: Investigate using window.crypto.getRandomValues() for better
// RNG.  Does this work with cloud functions?
function get_random_int(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function new_job_run(config: RunConfig): StoredRun {
  const fullRun: Run = {
    ty: RunType.Job,
    job_data: {
      jobs: {},
    },
  };

  for (const char of CHARACTER_LIST) {
    fullRun.job_data.jobs[char] = {
      name: JOB_LIST[get_random_int(JOB_LIST.length)].name,
      has_lure: false,
      has_underwater: false,
    };
  }

  // Start the current run with cloud unlocked.
  const currentRun: Run = {
    ty: RunType.Job,
    job_data: {
      jobs: {
        Cloud: fullRun.job_data.jobs['Cloud'.toString()],
      },
    },
  };

  return {
    config,
    log: [
      { when: firebase.firestore.Timestamp.now(), message: 'Run started.' },
    ],
    full: fullRun,
    current: currentRun,
  };
}
