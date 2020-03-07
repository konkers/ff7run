import { Component, Input, OnInit } from '@angular/core';
import { RunState, character_list } from '@shared';

import { JobService } from '../job.service';

@Component({
  selector: 'app-tracker-view',
  templateUrl: './tracker-view.component.html',
  styleUrls: ['./tracker-view.component.scss'],
})
export class TrackerViewComponent implements OnInit {
  @Input()
  run: RunState;

  @Input()
  textcolor: string;

  @Input()
  bgcolor: string;

  @Input()
  showMateria: boolean;

  @Input()
  charWidth: number;

  @Input()
  portraitSize: number;

  @Input()
  jobTextSize: number;

  @Input()
  materiaTextSize: number;

  characters = character_list();

  constructor(private jobs: JobService) {}

  ngOnInit() {}

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

  getMateria(character: string): string {
    const job = this.run.data.job_data.jobs[character];
    if (!job) {
      return '';
    }

    const materia = this.jobs.getJob(job.name).materia;

    return materia.join(', ');
  }
}
