import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireAuth } from '@angular/fire/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { angularFireAuthStub } from '../testing/firebase.mock';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatProgressSpinnerModule],
      declarations: [AppComponent],
      providers: [{ provide: AngularFireAuth, useValue: angularFireAuthStub }],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ff7run'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ff7run');
  });
});
