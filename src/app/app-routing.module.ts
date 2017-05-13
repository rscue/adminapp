import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home.page';
import { LoginPageComponent } from './pages/login/login.page';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { FleetFormPageComponent } from './pages/fleet/fleet.form.page';
import { AssignmentSearchPageComponent } from './pages/assignment/assignment.search.page';
import { AssignmentFormPageComponent } from './pages/assignment/assignment.form.page';
import { FleetSearchPageComponent } from './pages/fleet/fleet.search.page';
import { WorkerSearchPageComponent } from './pages/workers/worker.search.page';
import { WorkerFormPageComponent } from './pages/workers/worker.form.page';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent },
    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
    { path: 'fleet-list', component: FleetSearchPageComponent, canActivate: [AuthGuard] },
    { path: 'fleet', component: FleetFormPageComponent, canActivate: [AuthGuard] },
    { path: 'fleet/:id', component: FleetFormPageComponent, canActivate: [AuthGuard] },
    { path: 'workers-list', component: WorkerSearchPageComponent, canActivate: [AuthGuard] },
    { path: 'worker', component: WorkerFormPageComponent, canActivate: [AuthGuard] },
    { path: 'worker/:id', component: WorkerFormPageComponent, canActivate: [AuthGuard] },
    { path: 'assignment', component: AssignmentFormPageComponent, canActivate: [AuthGuard] },
    { path: 'assignment/:id', component: AssignmentFormPageComponent, canActivate: [AuthGuard] },
    { path: 'assignment-list', component: AssignmentSearchPageComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const AppRoutingProviders: any[] = [
  AuthGuard
];
