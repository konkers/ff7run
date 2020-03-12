import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { JobService } from '../job.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  @Input() name: string;
  @Input() job: string;
  @Input() hasLure: boolean;
  @Input() hasUnderwater: boolean;
  @Input() runActive: boolean;
  @Output() unlock = new EventEmitter();

  constructor(private jobs: JobService) { }

  ngOnInit() { }

  getMateria(job: string): string[] {
    return this.jobs.getJob(job).materia;
  }

  onUnlock() {
    this.unlock.emit();
  }
}
