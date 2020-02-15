import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, from } from 'rxjs';

import { AddRunResponse, RunsService } from '../runs.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {
  requesting = false;

  constructor(private router: Router, private runsSvc: RunsService) {}

  ngOnInit() {}

  onNewRun() {
    this.requesting = true;
    this.runsSvc.newRun().subscribe(resp => {
      console.log(resp);
      //this.router.navigate([`/run/${resp.id}`]);
    });
  }
}
