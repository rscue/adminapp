import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ProfileModel } from '../models/profile.model';
import * as Toastr from 'toastr';
import { environment } from '../../environments/environment';
import { CustomAuthHttp } from './customAuthHttp';
import { WebAuth, Management } from 'auth0-js';

declare var loading_screen;

@Injectable()
export class Auth {
  auth0: WebAuth;
  apiId: string;
  profile: ProfileModel;

  constructor(private router: Router, private authHttp: CustomAuthHttp) {
    this.auth0 = new WebAuth({
      domain: environment.Auth0Domain,
      clientID: environment.Auth0ClientId,
      redirectUri: `${window.location.origin}/callback`,
      audience: environment.Auth0Audience,
      scope: 'openid email',
      responseType: 'id_token token'
    });
  }

  async loadSession() {
    this.apiId = localStorage.getItem('api_id');
    try {
      this.profile = await this.getProfile();
      this.router.navigate(['/home']);
    } catch (err) {
      console.log('There was no profile to load');
    }
    finally {
      $(() => loading_screen.finish());
    }
  }

  public login(): void {
    const state = this.randomString(10);
    sessionStorage.setItem('state', state);

    this.auth0.authorize({
      state: state,
    });
  }

  public handleAuthentication(): void {
    const state = sessionStorage.getItem('state');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.state === state) {
        this.setSession(authResult);
        window.location.hash = '';
        this.loadSession();
      } else if (this.isAuthenticated()) {
        this.loadSession();
      } else {
        this.login();
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
    localStorage.setItem('api_id', authResult.idTokenPayload['https://api.rscue.center/id']);
    localStorage.setItem('auth0_id', authResult.idTokenPayload.sub);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('email', authResult.idTokenPayload.email);

    // Renew token before expiration
    const tenMinutes = 600000;
    setTimeout(this.renewAuth, expiresAt - tenMinutes);
  }

  private randomString(length) {
    const bytes = new Uint8Array(length);
    const random = window.crypto.getRandomValues(bytes);
    const result = [];
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
    for (let i = 0; i < random.byteLength; i++) {
      result.push(charset[random[i] % charset.length]);
    }
    return result.join('');
  }

  getProfile(): Promise<ProfileModel> {
    return new Promise((resolve, reject) => {
      const profile = JSON.parse(localStorage.getItem('profile'));
      if (!profile) {
        this.authHttp.get(`${environment.ApiUrl}provider/${this.apiId}`).subscribe(data => {
          localStorage.setItem('profile', JSON.stringify(data.json()));
          this.profile = data.json();
          resolve(this.profile);
        }, err => {
          if (err.status === 404) {
            this.router.navigate(['/profile'], { queryParams: {}, preserveQueryParams: false });
          }
          reject(err);
        });
      } else {
        resolve(profile);
      }
    });
  }

  async saveProfile(model: ProfileModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const prvResource = `${environment.ApiUrl}provider`;
      const error = (err) => {
        Toastr.error('Error guardando el perfil, intente nuevamente');
        reject(err);
      };
      const ok = (data) => {
        const profile = data.json();
        this.profile = profile;
        localStorage.setItem('profile', JSON.stringify(profile));
        Toastr.success('El perfil fue guardado correctamente');
        resolve();
      };
      const add = (data) => {
        const location = data.headers.get('Location');
        this.authHttp.get(location).subscribe(result => {
          const profile = result.json();
          this.updateAuth0Profile(profile.id).then(() => {
            ok(result);
          }).catch((err) => error(err));
        }, error);
      };
      if (model.id) {
        this.authHttp.put(`${prvResource}/${model.id}`, model).subscribe(ok, error);
      } else {
        this.authHttp.post(prvResource, model).subscribe(add, error);
      }
    });
  }

  async updateAuth0Profile(api_id: string) {
    return new Promise((resolve, reject) => {
      const userId = localStorage.getItem('auth0_id');
      const auth0Manage = new Management({
        domain: environment.Auth0Domain,
        token: localStorage.getItem('id_token')
      });
      const userMetadata = { api_id };
      auth0Manage.patchUserMetadata(userId, userMetadata, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public logout() {
    // Remove token from localStorage
    localStorage.clear();
    this.router.navigate(['/home']);
  };

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  saveAvatar(image) {
    this.authHttp.post(`${environment.ApiUrl}provider/profilepic/${this.profile.id}`, { imageBase64: image }).subscribe(data => {
      this.profile.profilePictureUrl = data.json();
      localStorage.setItem('profile', JSON.stringify(this.profile));
    }, err => {
      Toastr.error('Hubo un error guardando el avatar, por favor intenta de nuevo');
    });
  }

  renewAuth() {
    const state = this.randomString(10);
    this.auth0.renewAuth({
      redirectUri: `${window.location.origin}/silent-callback`,
      usePostMessage: true,
      state: state
    }, (err, authResult) => {
      if (err || authResult.state !== state) {
        console.log(err);
        this.login();
      } else {
        this.setSession(authResult);
      }
    });
  }
};
