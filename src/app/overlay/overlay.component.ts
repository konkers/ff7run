import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RunState, character_list } from '@shared';
import { RunsService } from '../runs.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  characters = character_list();
  run$: Observable<RunState>;
  run: RunState;

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

    // TODO: unsubscribe from previous run
    this.run$.subscribe(r => {
      console.log(r);
      this.run = r;
    });
  }

  getJob(character: string): string {
    const job = this.run.data.job_data.jobs[character];
    if (job) {
      let name = job.name;
      if (job.has_lure) {
        name = name + ', Rancher';
      }
      if (job.has_underwater) {
        name = name + ', Swimmer';
      }

      return name;
    } else {
      return '?????';
    }
  }
}
