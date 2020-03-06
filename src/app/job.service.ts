import { Injectable } from '@angular/core';

import { Job, job_list, job_aliases } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobMap = new Map<string, Job>();

  constructor() {
    for (const job of job_list()) {
      this.jobMap.set(job.name, job);
    }

    // Add aliases for old job names.
    for (const [oldName, newName] of Object.entries(job_aliases())) {
      this.jobMap.set(oldName, this.getJob(newName));
    }
  }

  getJob(name: string): Job {
    return this.jobMap.get(name);
  }
}
