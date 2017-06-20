import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-silent-callback-page',
  templateUrl: './callback.page.html',
})

export class SilentCallbackPageComponent {
  constructor(private auth: Auth) {
    const result = this.auth.auth0.parseHash(window.location.hash, (err, data) =>
      parent.postMessage(err || data, window.location.origin));
  }
}
