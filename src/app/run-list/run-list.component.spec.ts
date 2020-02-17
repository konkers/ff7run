import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatTableModule } from '@angular/material/table';

import { RunListComponent } from './run-list.component';

import {
  angularFireAuthStub,
  angularFirestoreStub,
  angularFireFunctionsStub,
} from '../../testing/firebase.mock';

describe('RunListComponent', () => {
  let component: RunListComponent;
  let fixture: ComponentFixture<RunListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, RouterTestingModule],
      declarations: [RunListComponent],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireFunctions, useValue: angularFireFunctionsStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
