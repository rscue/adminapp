import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback.page.html',
})

export class LoginCallbackPageComponent {
  constructor(private auth: Auth) {
    this.auth.handleAuthentication();
  }
}
