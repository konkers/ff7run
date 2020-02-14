import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from "@angular/fire/firestore";
import {
  AngularFireFunctionsModule,
  FUNCTIONS_ORIGIN
} from "@angular/fire/functions";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatJumbotronModule } from "@angular-material-extensions/jumbotron";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GenerateComponent } from "./generate/generate.component";

import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RunComponent } from "./run/run.component";
import { MateriaTypeNamePipe } from "./materia-type-name.pipe";

@NgModule({
  declarations: [
    AppComponent,
    GenerateComponent,
    RunComponent,
    MateriaTypeNamePipe
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
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [
    {
      provide: FirestoreSettingsToken,
      useValue: environment.production
        ? undefined
        : {
            host: "localhost:8080",
            ssl: false
          }
    },
    { provide: FUNCTIONS_ORIGIN, useValue: "http://localhost:5001" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
