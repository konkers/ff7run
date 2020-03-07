import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RunComponent } from './run.component';
import { CharacterComponent } from '../character/character.component';
import { MateriaComponent } from '../materia/materia.component';
import { TrackerViewComponent } from '../tracker-view/tracker-view.component';

import {
  angularFireAuthStub,
  angularFirestoreStub,
  angularFireFunctionsStub,
} from '../../testing/firebase.mock';

describe('RunComponent', () => {
  let component: RunComponent;
  let fixture: ComponentFixture<RunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [CharacterComponent, MateriaComponent, RunComponent, TrackerViewComponent],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireFunctions, useValue: angularFireFunctionsStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
