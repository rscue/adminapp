import { Component } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Auth } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

declare var loading_screen;

@Component({
  selector: 'app-root',
  templateUrl: './app.layout.html',
})
export class AppLayoutComponent {
  constructor(private auth: Auth, private router: Router) {
    $(() => loading_screen.finish());
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        $(() => {
          if (!this.auth.profile) {
            document.body.classList.add('sidebar-collapse');
          }
          $['AdminLTE'].layout.fix();
        });
      }
    });
  }

  tokenNotExpired() {
    return tokenNotExpired() && this.auth.auth0User && this.auth.profile;
  }
}
