import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ff7run';
  showHeader = true;
  contentClass = 'content';

  constructor(private router: Router, public afa: AngularFireAuth) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showHeader = !this.router.url.includes('overlay');
      if (!this.showHeader) {
        this.contentClass = 'overlay';
      } else if (this.router.url === '/') {
        this.contentClass = 'content';
      } else {
        this.contentClass = 'content padded';
      }
    });
  }

  login() {
    this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afa.auth.signOut();
  }
}
