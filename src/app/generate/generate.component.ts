import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, from } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { RunsService } from '../runs.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {
  requesting = false;

  constructor(
    public afa: AngularFireAuth,
    private router: Router,
    private runsSvc: RunsService
  ) {}

  ngOnInit() {}

  onNewRun() {
    this.requesting = true;
    this.runsSvc.newRun().subscribe(resp => {
      this.router.navigate([`/run/${resp}`]);
    });
  }

  login() {
    this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
