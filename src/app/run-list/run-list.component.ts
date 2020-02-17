import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { RunState } from '@shared';

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
}
