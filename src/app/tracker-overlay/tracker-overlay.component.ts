import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RunState, character_list } from '@shared';
import { RunsService } from '../runs.service';

@Component({
  selector: 'app-tracker-overlay',
  templateUrl: './tracker-overlay.component.html',
  styleUrls: ['./tracker-overlay.component.scss'],
})
export class TrackerOverlayComponent implements OnInit {
  run$: Observable<RunState>;
  run: RunState;
  textcolor: string;
  bgcolor: string;
  showMateria: boolean;
  charWidth: number;
  portraitSize: number;
  jobTextSize: number;
  materiaTextSize: number;

  constructor(private route: ActivatedRoute, private service: RunsService) {}

  ngOnInit() {
    this.run$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const uid = params.get('uid');
        const id = params.get('id');
        if (id && uid) {
          return this.service.getAbsoluteRun(uid, id);
        } else {
          return from([]);
        }
      })
    );

    this.route.queryParams.subscribe(params => {
      this.textcolor = params['textcolor'.toString()];
      this.bgcolor = params['bgcolor'.toString()];
      this.showMateria = params['showMateria'.toString()] === 'true';
      this.charWidth = +params['charWidth'.toString()];
      this.portraitSize = +params['portraitSize'.toString()];
      this.jobTextSize = +params['jobTextSize'.toString()];
      this.materiaTextSize = +params['materiaTextSize'.toString()];
    });

    // TODO: unsubscribe from previous run
    this.run$.subscribe(r => {
      console.log(r);
      this.run = r;
    });
  }
}
