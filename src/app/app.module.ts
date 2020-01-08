import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN } from '@angular/fire/functions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerateComponent } from './generate/generate.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    GenerateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
  ],
  providers: [
    { provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5001' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
