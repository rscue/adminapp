import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ProfilePage } from './pages/profile/profile.page';
import { FleetFormPage } from './pages/fleet/fleet.form.page';
import { AssignmentSearchPage } from './pages/assignment/assignment.search.page';
import { AssignmentFormPage } from './pages/assignment/assignment.form.page';
import { FleetSearchPage } from './pages/fleet/fleet.search.page';
import { WorkerSearchPage } from './pages/workers/worker.search.page';
import { WorkerFormPage } from './pages/workers/worker.form.page';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPage },
    { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },
    { path: 'fleet-list', component: FleetSearchPage, canActivate: [AuthGuard] },
    { path: 'fleet', component: FleetFormPage, canActivate: [AuthGuard] },
    { path: 'fleet/:id', component: FleetFormPage, canActivate: [AuthGuard] },
    { path: 'workers-list', component: WorkerSearchPage, canActivate: [AuthGuard] },
    { path: 'worker', component: WorkerFormPage, canActivate: [AuthGuard] },
    { path: 'worker/:id', component: WorkerFormPage, canActivate: [AuthGuard] },
    { path: 'assignment', component: AssignmentFormPage, canActivate: [AuthGuard] },
    { path: 'assignment/:id', component: AssignmentFormPage, canActivate: [AuthGuard] },
    { path: 'assignment-list', component: AssignmentSearchPage, canActivate: [AuthGuard] },
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
