import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken,
} from '@angular/fire/firestore';
import {
  AngularFireFunctionsModule,
  FUNCTIONS_ORIGIN,
} from '@angular/fire/functions';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatJumbotronModule } from '@angular-material-extensions/jumbotron';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerateComponent } from './generate/generate.component';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RunComponent } from './run/run.component';
import { CharacterComponent } from './character/character.component';
import { MateriaComponent } from './materia/materia.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RunListComponent } from './run-list/run-list.component';

const debugProviders = environment.production
  ? []
  : [
      {
        provide: FirestoreSettingsToken,
        useValue: {
          host: 'localhost:8080',
          ssl: false,
        },
      },
      { provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5001' },
    ];
@NgModule({
  declarations: [
    AppComponent,
    GenerateComponent,
    RunComponent,
    CharacterComponent,
    MateriaComponent,
    ToolbarComponent,
    RunListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatJumbotronModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: debugProviders,
  bootstrap: [AppComponent],
})
export class AppModule {}
