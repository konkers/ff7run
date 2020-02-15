import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ff7run';

  constructor(public afa: AngularFireAuth) {}

  login() {
    this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afa.auth.signOut();
  }
}
