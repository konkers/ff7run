import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateComponent } from './generate/generate.component';
import { RunComponent } from './run/run.component';

const routes: Routes = [
  { path: 'run/:id', component: RunComponent },
  {
    path: '',
    component: GenerateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
