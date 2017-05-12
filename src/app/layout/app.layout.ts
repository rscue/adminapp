import { Component } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.layout.html',
})
export class AppLayoutComponent {
  constructor(private auth: Auth) {
    $(() => $['AdminLTE'].layout.fix());
  }

    tokenNotExpired() {
        return tokenNotExpired() && this.auth.auth0User;
    }
}
