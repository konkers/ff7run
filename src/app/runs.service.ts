import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Timestamp } from '@firebase/firestore-types';

import { Materia, new_job_run } from '@shared';

export interface AddRunResponse {
  id: String;
}

export interface Run {
  date: Timestamp;
  materia: Materia[];
}

@Injectable({
  providedIn: 'root',
})
export class RunsService {
  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {}

  public newRun(): Observable<AddRunResponse> {
    const callable = this.fns.httpsCallable('newRun');
    return callable({});
  }

  public getRun(id: string): Observable<Run> {
    console.log(`runs/${id}`);
    return this.afs.doc<Run>(`runs/${id}`).valueChanges();
  }
}
