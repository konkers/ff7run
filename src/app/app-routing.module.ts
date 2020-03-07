import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateComponent } from './generate/generate.component';
import { TrackerOverlayComponent } from './tracker-overlay/tracker-overlay.component';
import { RunComponent } from './run/run.component';
import { RunListComponent } from './run-list/run-list.component';

const routes: Routes = [
  { path: 'overlay/:uid/:id', component: TrackerOverlayComponent },
  { path: 'run/:id', component: RunComponent },
  { path: 'runs', component: RunListComponent },
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
