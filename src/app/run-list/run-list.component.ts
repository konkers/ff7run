import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { RunState, character_list } from '@shared';

import { RunsService } from '../runs.service';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss'],
})
export class RunListComponent implements OnInit {
  displayedColumns: string[] = ['updated', 'status', 'unlocked'];
  runs$: Observable<RunState[]>;
  runs: RunState[];

  constructor(private router: Router, private service: RunsService) {
    this.runs$ = service.getRuns();
    this.runs$.subscribe(runs => (this.runs = runs));
  }

  ngOnInit() {}

  gotoRun(run: string) {
    this.router.navigate([`/run/${run}`]);
  }

  formatDate(date: Date): string {
    const opt = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleDateString(undefined, opt);
  }

  getUnlockedChars(run: RunState): string {
    const names = character_list()
      .map(c => c.name)
      .filter(name => name in run.data.job_data.jobs);
    return names.join(', ');
  }
}
