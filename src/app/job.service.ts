import { Injectable } from '@angular/core';

import { Job, job_list } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobMap = new Map<string, Job>();

  constructor() {
    for (const job of job_list()) {
      this.jobMap.set(job.name, job);
    }
  }

  getJob(name: string): Job {
    return this.jobMap.get(name);
  }
}
