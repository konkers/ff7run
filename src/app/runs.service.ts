import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Timestamp } from '@firebase/firestore-types';

import { RunState } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class RunsService {
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {}

  public newRun(): Observable<string> {
    const callable = this.fns.httpsCallable('newRun');
    return callable({ ty: 'job' });
  }

  public getRun(id: string): Observable<RunState> {
    return this.afa.user.pipe(
      mergeMap(user => {
        const path = `runs/state/${user.uid}/${id}`;
        return this.afs.doc<RunState>(path).valueChanges();
      })
    );
  }

  public unlockJob(runId: string, name: string) {
    const callable = this.fns.httpsCallable('unlockJob');
    callable({ run_id: runId, name });
  }
}
