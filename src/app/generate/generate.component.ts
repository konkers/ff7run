import { Component, OnInit } from '@angular/core';

import { Observable, from } from 'rxjs';

import { Materia, MATERIA_LIST } from 'materia';
import { AddRunResponse, RunsService } from '../runs.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  materia: Materia[] = MATERIA_LIST;
  resp: AddRunResponse;

  constructor(private runsSvc: RunsService) {
  }

  ngOnInit() {
  }

  onNewRun() {
    this.runsSvc.newRun().subscribe(resp => {
      this.resp = resp;
    });
  }

}
