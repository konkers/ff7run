import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireFunctions } from "@angular/fire/functions";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";

import { MateriaTypeNamePipe } from "../materia-type-name.pipe";
import { RunComponent } from "./run.component";

import {
  angularFirestoreStub,
  angularFireFunctionsStub
} from "../../testing/firebase.mock";

describe("RunComponent", () => {
  let component: RunComponent;
  let fixture: ComponentFixture<RunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatTableModule, RouterTestingModule],
      declarations: [MateriaTypeNamePipe, RunComponent],
      providers: [
        { provide: AngularFireFunctions, useValue: angularFireFunctionsStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
