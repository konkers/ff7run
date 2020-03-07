import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';

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
  userId: string;
  overlayUrl: string;

  overlayBgColorData: string;
  get overlayBgColor(): string {
    return this.overlayBgColorData;
  }
  set overlayBgColor(val: string) {
    this.overlayBgColorData = val;
    this.updateOverlayUrl();
  }

  textColorData: string;
  get textColor(): string {
    return this.textColorData;
  }
  set textColor(val: string) {
    this.textColorData = val;
    this.updateOverlayUrl();
  }

  showMateriaData: boolean;
  get showMateria(): boolean {
    return this.showMateriaData;
  }
  set showMateria(val: boolean) {
    this.showMateriaData = val;
    this.updateOverlayUrl();
  }

  charWidthData = 200;
  get charWidth(): number {
    return this.charWidthData;
  }
  set charWidth(val: number) {
    this.charWidthData = val;
    this.updateOverlayUrl();
  }

  setCharWidthData: boolean;
  get setCharWidth(): boolean {
    return this.setCharWidthData;
  }
  set setCharWidth(val: boolean) {
    this.setCharWidthData = val;
    this.updateOverlayUrl();
  }

  constructor(
    private afa: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private service: RunsService,
    private jobs: JobService
  ) { }

  ngOnInit() {
    this.afa.user.subscribe(user => {
      this.userId = user.uid;
      this.updateOverlayUrl();
    });
    this.run$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.id = id;
          this.updateOverlayUrl();
          return this.service.getRun(this.id);
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

  updateOverlayUrl() {
    const params = {};

    if (this.textColor) {
      params['textcolor'.toString()] = this.textColor;
    }

    if (this.overlayBgColor) {
      params['bgcolor'.toString()] = this.overlayBgColor;
    }

    if (this.showMateria) {
      params['showMateria'.toString()] = 'true';
    }

    if (this.setCharWidth) {
      params['charWidth'.toString()] = this.charWidth;
    }

    this.overlayUrl =
      window.location.origin +
      this.router.createUrlTree(['overlay', this.userId, this.id], { queryParams: params }).toString();
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

  hasLure(character: string): boolean {
    const job = this.run.data.job_data.jobs[character];
    if (job) {
      return job.has_lure;
    } else {
      return false;
    }
  }

  hasUnderwater(character: string): boolean {
    const job = this.run.data.job_data.jobs[character];
    if (job) {
      return job.has_underwater;
    } else {
      return false;
    }
  }

  unlockCharacter(character: string) {
    this.service.unlockJob(this.id, character);
  }

  copyValue(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
