import { Component } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Auth } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.html',
})
export class AppLayoutComponent {
  constructor(private auth: Auth, private router: Router) {
    this.auth.loadSession();
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
    return tokenNotExpired() && this.auth.profile;
  }
}
