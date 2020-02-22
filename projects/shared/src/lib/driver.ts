import { Timestamp } from '@firebase/firestore-types';
// These are needed to generate timestamps.
import firebase from '@firebase/app';
import '@firebase/firestore';

export interface Driver {
  getRandomInt(max: number): number;
  getTimestamp(): Timestamp;
}

export class DefaultDriver implements Driver {
  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public getTimestamp(): Timestamp {
    return firebase.firestore.Timestamp.now();
  }
}
