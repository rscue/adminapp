import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import {MomentModule} from 'angular2-moment';
import { AuthHttp } from 'angular2-jwt';

import { authHttpServiceFactory } from './services/authHttpServiceFactory';
import { AppRoutingModule, AppRoutingProviders } from './app-routing.module';
import { AppLayoutComponent } from './layout/app.layout';
import { SidebarLayoutComponent } from './layout/sidebar/sidebar.layout';
import { HomePageComponent } from './pages/home/home.page';
import { HeaderLayoutComponent } from './layout/header/header.layout';
import { FooterLayoutComponent } from './layout/footer/footer.layout';
import { LoginPageComponent } from './pages/login/login.page';
import { Auth } from './services/auth.service';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { AvatarModalPageComponent } from './pages/avatar/avatar.modal';
import { AssignmentService } from './services/assignment.service';
import { AssignmentSearchPageComponent } from './pages/assignment/assignment.search.page';
import { AssignmentFormPageComponent } from './pages/assignment/assignment.form.page';
import { FleetFormPageComponent } from './pages/fleet/fleet.form.page';
import { FleetService } from './services/fleet.service';
import { FleetSearchPageComponent } from './pages/fleet/fleet.search.page';
import { WorkerSearchPageComponent } from './pages/workers/worker.search.page';
import { WorkerFormPageComponent } from './pages/workers/worker.form.page';
import { WorkerService } from './services/worker.service';
import { EqualValidatorDirective } from './components/validators/equal.validator.directive';
import { WorkersSignalr } from './services/workers.signalr';

@NgModule({
  declarations: [
    AppLayoutComponent,
    SidebarLayoutComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    HomePageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    AvatarModalPageComponent,
    FleetFormPageComponent,
    AssignmentSearchPageComponent,
    AssignmentFormPageComponent,
    FleetSearchPageComponent,
    WorkerSearchPageComponent,
    WorkerFormPageComponent,
    EqualValidatorDirective
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
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    Auth,
    AssignmentService,
    FleetService,
    WorkerService,
    WorkersSignalr
  ],
  bootstrap: [AppLayoutComponent]
})
export class AppModule { }
