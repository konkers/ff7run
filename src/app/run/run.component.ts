import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Run, RunsService } from '../runs.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type'];
  run$: Observable<Run>;
  run: Run;


  constructor(
    private route: ActivatedRoute,
    private service: RunsService,
  ) { }

  ngOnInit() {
    this.run$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getRun(params.get('id')))
    );
    this.run$.subscribe(r => this.run = r);
  }

}
