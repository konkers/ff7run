import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RunState, character_list } from '@shared';

import { RunsService } from '../runs.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
})
export class RunComponent implements OnInit {
  displayedColumns: string[] = ['name', 'job'];
  characters = character_list();
  run$: Observable<RunState>;
  run: RunState;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private service: RunsService,
    private jobs: JobService
  ) {}

  ngOnInit() {
    this.run$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this.service.getRun(this.id);
      })
    );

    // TODO: unsubscribe from previous run
    this.run$.subscribe(r => {
      console.log(r);
      this.run = r;
    });
  }

  jobUnlocked(character: string): boolean {
    return character in this.run.data.job_data.jobs;
  }

  getJob(character: string): string {
    const job = this.run.data.job_data.jobs[character];
    if (job) {
      return job.name;
    } else {
      return '';
    }
  }

  unlockCharacter(character: string) {
    this.service.unlockJob(this.id, character);
  }
}
