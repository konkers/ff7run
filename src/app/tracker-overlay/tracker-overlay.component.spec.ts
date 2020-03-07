import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

import { TrackerOverlayComponent } from './tracker-overlay.component';
import { TrackerViewComponent } from '../tracker-view/tracker-view.component';

import {
  angularFireAuthStub,
  angularFirestoreStub,
  angularFireFunctionsStub,
} from '../../testing/firebase.mock';

describe('TrackerOverlayComponent', () => {
  let component: TrackerOverlayComponent;
  let fixture: ComponentFixture<TrackerOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TrackerOverlayComponent, TrackerViewComponent],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireFunctions, useValue: angularFireFunctionsStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
