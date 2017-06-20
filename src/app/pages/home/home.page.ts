import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
})

export class HomePageComponent {
  constructor(private auth: Auth, private router: Router) {
    this.auth.loadSession().then(() => {
      console.log('hoho');
      this.router.navigate(['dashboard']);
    }).catch(() => this.auth.login());
  }
}
