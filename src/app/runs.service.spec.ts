import { TestBed } from "@angular/core/testing";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireFunctions } from "@angular/fire/functions";

import {
  angularFirestoreStub,
  angularFireFunctionsStub
} from "../testing/firebase";

import { RunsService } from "./runs.service";

describe("RunsService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireFunctions, useValue: angularFireFunctionsStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    })
  );

  it("should be created", () => {
    const service: RunsService = TestBed.get(RunsService);
    expect(service).toBeTruthy();
  });
});
