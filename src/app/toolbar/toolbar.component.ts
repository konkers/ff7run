import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public afa: AngularFireAuth) {}

  ngOnInit() {
  }

  login() {
    this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afa.auth.signOut();
  }


}
