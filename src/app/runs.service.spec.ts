import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

import {
  angularFireAuthStub,
  angularFirestoreStub,
  angularFireFunctionsStub,
} from '../testing/firebase.mock';

import { RunsService } from './runs.service';

describe('RunsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireFunctions, useValue: angularFireFunctionsStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
      ],
    })
  );

  it('should be created', () => {
    const service: RunsService = TestBed.get(RunsService);
    expect(service).toBeTruthy();
  });
});
