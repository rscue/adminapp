import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import {MomentModule} from 'angular2-moment';
import { AuthHttp } from 'angular2-jwt';

import { AppRoutingModule, AppRoutingProviders } from './app-routing.module';

import { HomePageComponent } from './pages/home/home.page';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { AvatarModalPageComponent } from './pages/avatar/avatar.modal';
import { AssignmentSearchPageComponent } from './pages/assignment/assignment.search.page';
import { AssignmentFormPageComponent } from './pages/assignment/assignment.form.page';
import { FleetFormPageComponent } from './pages/fleet/fleet.form.page';
import { FleetSearchPageComponent } from './pages/fleet/fleet.search.page';
import { WorkerSearchPageComponent } from './pages/workers/worker.search.page';
import { WorkerFormPageComponent } from './pages/workers/worker.form.page';
import { LoginCallbackPageComponent } from './pages/callback/callback.page';
import { SilentCallbackPageComponent } from './pages/callback/silent.callback.page';
import { NotFoundPageComponent } from './pages/notfound/notfound.page';

import { authHttpServiceFactory } from './services/authHttpServiceFactory';
import { Auth } from './services/auth.service';
import { AssignmentService } from './services/assignment.service';
import { FleetService } from './services/fleet.service';
import { WorkerService } from './services/worker.service';
import { CustomAuthHttp } from './services/customAuthHttp';

import { EqualValidatorDirective } from './components/validators/equal.validator.directive';

import { AppMainComponent } from './app.main';
import { AppLayoutComponent } from './layout/app.layout';
import { SidebarLayoutComponent } from './layout/sidebar/sidebar.layout';
import { HeaderLayoutComponent } from './layout/header/header.layout';
import { FooterLayoutComponent } from './layout/footer/footer.layout';

@NgModule({
  declarations: [
    AppMainComponent,
    AppLayoutComponent,
    SidebarLayoutComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    HomePageComponent,
    ProfilePageComponent,
    AvatarModalPageComponent,
    FleetFormPageComponent,
    AssignmentSearchPageComponent,
    AssignmentFormPageComponent,
    FleetSearchPageComponent,
    WorkerSearchPageComponent,
    WorkerFormPageComponent,
    EqualValidatorDirective,
    LoginCallbackPageComponent,
    SilentCallbackPageComponent,
    NotFoundPageComponent
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
    CustomAuthHttp
  ],
  bootstrap: [AppMainComponent]
})
export class AppModule { }
