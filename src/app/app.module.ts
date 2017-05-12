import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MomentModule} from 'angular2-moment';

import { AppRoutingModule, AppRoutingProviders } from './app-routing.module';
import { AppLayoutComponent } from './layout/app.layout';
import { SidebarLayout } from './layout/sidebar/sidebar.layout';
import { HomePage } from './pages/home/home.page';
import { HeaderLayout } from './layout/header/header.layout';
import { FooterLayout } from './layout/footer/footer.layout';
import { LoginPage } from './pages/login/login.page';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth } from './services/auth.service';
import { ProfilePage } from './pages/profile/profile.page';
import { AvatarModalPage } from './pages/avatar/avatar.modal';
import { AssignmentService } from './services/assignment.service';
import { AssignmentSearchPage } from './pages/assignment/assignment.search.page';
import { AssignmentFormPage } from './pages/assignment/assignment.form.page';
import { FleetFormPage } from './pages/fleet/fleet.form.page';
import { FleetService } from './services/fleet.service';
import { FleetSearchPage } from './pages/fleet/fleet.search.page';
import { WorkerSearchPage } from './pages/workers/worker.search.page';
import { WorkerFormPage } from './pages/workers/worker.form.page';
import { WorkerService } from './services/worker.service';
import { EqualValidator } from './components/validators/equal.validator.directive';
import { WorkersSignalr } from './services/workers.signalr';

@NgModule({
  declarations: [
    AppLayoutComponent,
    SidebarLayout,
    HeaderLayout,
    FooterLayout,
    HomePage,
    LoginPage,
    ProfilePage,
    AvatarModalPage,
    FleetFormPage,
    AssignmentSearchPage,
    AssignmentFormPage,
    FleetSearchPage,
    WorkerSearchPage,
    WorkerFormPage,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule
  ],
  providers: [
    AppRoutingProviders,
    AUTH_PROVIDERS,
    Auth,
    AssignmentService,
    FleetService,
    WorkerService,
    WorkersSignalr
  ],
  bootstrap: [AppLayoutComponent]
})
export class AppModule { }
