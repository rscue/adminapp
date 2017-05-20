import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './layout/app.layout';

import { HomePageComponent } from './pages/home/home.page';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { FleetFormPageComponent } from './pages/fleet/fleet.form.page';
import { AssignmentSearchPageComponent } from './pages/assignment/assignment.search.page';
import { AssignmentFormPageComponent } from './pages/assignment/assignment.form.page';
import { FleetSearchPageComponent } from './pages/fleet/fleet.search.page';
import { WorkerSearchPageComponent } from './pages/workers/worker.search.page';
import { WorkerFormPageComponent } from './pages/workers/worker.form.page';
import { LoginCallbackPageComponent } from './pages/callback/callback.page';
import { SilentCallbackPageComponent } from './pages/callback/silent.callback.page';
import { NotFoundPageComponent } from './pages/notfound/notfound.page';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'callback', component: LoginCallbackPageComponent },
  { path: 'silent-callback', component: SilentCallbackPageComponent },
  { path: '404', component: NotFoundPageComponent },
  {
    path: '', component: AppLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomePageComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: 'fleet-list', component: FleetSearchPageComponent },
      { path: 'fleet', component: FleetFormPageComponent },
      { path: 'fleet/:id', component: FleetFormPageComponent },
      { path: 'workers-list', component: WorkerSearchPageComponent },
      { path: 'worker', component: WorkerFormPageComponent },
      { path: 'worker/:id', component: WorkerFormPageComponent },
      { path: 'assignment', component: AssignmentFormPageComponent },
      { path: 'assignment/:id', component: AssignmentFormPageComponent },
      { path: 'assignment-list', component: AssignmentSearchPageComponent },
    ]
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const AppRoutingProviders: any[] = [
  AuthGuard
];
