import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { JobRunConfig, RunState, RunStatus } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class RunsService {
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {}

  public newRun(config: JobRunConfig): Observable<string> {
    const callable = this.fns.httpsCallable('command');
    return callable({ newRun: { ty: 'job', job_config: config } });
  }

  public getRun(id: string): Observable<RunState> {
    return this.afa.user.pipe(
      mergeMap(user => {
        const path = `runs/state/${user.uid}/${id}`;
        return this.afs.doc<RunState>(path).valueChanges();
      })
    );
  }

  public getAbsoluteRun(uid: string, id: string): Observable<RunState> {
    const path = `runs/state/${uid}/${id}`;
    return this.afs.doc<RunState>(path).valueChanges();
  }

  public getRuns(): Observable<RunState[]> {
    // TODO: Remove hack for testing.  We should probably create a mock runs service.
    if (!this.afa.user) {
      return from([]);
    }
    return this.afa.user.pipe(
      mergeMap(user => {
        const path = `runs/state/${user.uid}`;
        return this.afs
          .collection<RunState>(path, ref => ref.orderBy('timestamp'))
          .valueChanges();
      })
    );
  }

  public unlockJob(runId: string, name: string) {
    const callable = this.fns.httpsCallable('command');
    callable({ unlockJob: { run_id: runId, name } });
  }

  public updateRun(runId: string, newStatus: RunStatus) {
    const callable = this.fns.httpsCallable('command');
    callable({ updateRunState: { run_id: runId, new_status: newStatus } });
  }
}
