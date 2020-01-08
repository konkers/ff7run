import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable, from } from 'rxjs';

export interface AddRunResponse {
  id: String,
};

@Injectable({
  providedIn: 'root'
})
export class RunsService {

  constructor(private fns: AngularFireFunctions) { }

  public newRun(): Observable<AddRunResponse> {
    const callable = this.fns.httpsCallable('newRun');
    return callable({});
  }
}
