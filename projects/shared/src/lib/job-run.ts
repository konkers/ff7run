import {
  CharacterInfo,
  RunConfig,
  RunData,
  RunState,
  RunStatus,
} from './model';
import { character_list, job_list } from './data';
import { Driver, DefaultDriver } from './driver';

export class JobRunGenerator {
  private driver: Driver;

  constructor(driver?: Driver) {
    if (driver) {
      this.driver = driver;
    } else {
      this.driver = new DefaultDriver();
    }
  }

  private pickChar(chars: CharacterInfo[]): string {
    return chars[this.driver.getRandomInt(chars.length)].name;
  }

  public newRun(config: RunConfig): [RunData, RunState] {
    const plan: RunData = {
      job_data: {
        jobs: {},
      },
    };

    // Create a shallow clone so that we can modify the list.
    const jobList = job_list().slice(0);

    for (const char of character_list()) {
      const jobIndex = this.driver.getRandomInt(jobList.length);

      plan.job_data.jobs[char.name] = {
        name: jobList[jobIndex].name,
        has_lure: false,
        has_underwater: false,
      };

      if (config.job_config && config.job_config.unique_jobs) {
        // If we are choosing unique jobs, remove this one from the pool.
        jobList[jobIndex] = jobList[jobList.length - 1];
        jobList.pop();
      }
    }

    const lureChars = character_list().filter(c => c.can_lure);
    plan.job_data.jobs[this.pickChar(lureChars)].has_lure = true;

    const underwaterChars = character_list().filter(c => c.can_underwater);
    plan.job_data.jobs[this.pickChar(underwaterChars)].has_underwater = true;

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
        id: '',
        config,
        status: RunStatus.Active,
        timestamp: this.driver.getTimestamp(),
        log: [
          {
            when: this.driver.getTimestamp(),
            message: 'Run started.',
          },
        ],
        data,
      },
    ];
  }
}
