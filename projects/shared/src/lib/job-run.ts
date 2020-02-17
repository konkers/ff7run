// These are needed to generate timestamps.
import firebase from '@firebase/app';
import '@firebase/firestore';

import { RunConfig, RunData, RunState } from './model';
import { character_list, job_list } from './data';

// TODO: Investigate using window.crypto.getRandomValues() for better
// RNG.  Does this work with cloud functions?
function get_random_int(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function new_job_run(config: RunConfig): [RunData, RunState] {
  const plan: RunData = {
    job_data: {
      jobs: {},
    },
  };

  const jobList = job_list();

  for (const char of character_list()) {
    plan.job_data.jobs[char] = {
      name: jobList[get_random_int(jobList.length)].name,
      has_lure: false,
      has_underwater: false,
    };
  }

  // Start the current run with cloud unlocked.
  const data: RunData = {
    job_data: {
      jobs: {
        Cloud: plan.job_data.jobs['Cloud'.toString()],
      },
    },
  };

  return [
    plan,
    {
      config,
      log: [
        { when: firebase.firestore.Timestamp.now(), message: 'Run started.' },
      ],
      data,
    },
  ];
}
