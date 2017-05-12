import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ProfileModel } from '../models/profile.model';
import * as Toastr from 'toastr';
import { environment } from '../../environments/environment';

declare var Auth0;

@Injectable()
export class Auth {
  auth0: any;
  auth0User: Object;
  profile: ProfileModel;

  constructor(private router: Router, private authHttp: AuthHttp) {
    this.auth0 = new Auth0({ domain: environment.Auth0Domain, clientID: environment.Auth0ClientId, callbackURL: `${window.location.origin}/login` });

    let result = this.auth0.parseHash(window.location.hash);
    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
    }
  }

  public login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth0.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: email,
        password: password,
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  getAuth0User(): Promise<ProfileModel> {
    return new Promise((resolve, reject) => {
      let auth0User = JSON.parse(localStorage.getItem('auth0User'));
      if (!auth0User) {
        let idToken = localStorage.getItem('id_token');
        if (idToken) {
          this.auth0.getProfile(idToken, (err, profile) => {
            localStorage.setItem('auth0User', JSON.stringify(profile));
            this.auth0User = profile;
            this.getProfile().then((profile) => resolve(profile)).catch((err) => reject(err));
          });
        }
      } else {
        this.auth0User = auth0User;
        this.getProfile().then((profile) => resolve(profile)).catch((err) => reject(err));
      }
    });
  }

  getProfile(): Promise<ProfileModel> {
    return new Promise((resolve, reject) => {
      let profile = JSON.parse(localStorage.getItem('profile'));
      if (!profile) {
        this.authHttp.get(`${environment.ApiUrl}provider/${this.auth0User['user_id']}`).subscribe(data => {
          localStorage.setItem('profile', JSON.stringify(data.json()));
          this.profile = data.json();
          resolve(this.profile);
        }, err => {
          this.router.navigate(['profile'], { queryParams: {}, preserveQueryParams: false });
          reject(err);
        });
      } else {
        this.profile = profile;
        resolve(this.profile);
      }
    });
  }

  saveProfile(profile: ProfileModel): Promise<any> {
    return new Promise((resolve, reject) => {
      profile.id = this.auth0User['user_id'];
      this.authHttp.post(`${environment.ApiUrl}provider`, profile).subscribe(data => {
        this.profile = data.json();
        localStorage.setItem('profile', JSON.stringify(data.json()));
        Toastr.success('El perfil fue guardado correctamente');
        resolve();
      }, err => {
        Toastr.error('Error guardando el perfil, intente nuevamente');
        reject(err);
      });
    });
  }

  public logout() {
    // Remove token from localStorage
    localStorage.clear();
    this.router.navigate(['login']);
  };

  public authenticated() {
    return tokenNotExpired() && this.profile;
  };

  saveAvatar(image) {
    this.authHttp.post(`${environment.ApiUrl}provider/profilepic/${this.profile.id}`, { imageBase64: image }).subscribe(data => {
      this.profile.avatarUri = data.json();
      localStorage.setItem('profile', JSON.stringify(this.profile));
    }, err => {
      Toastr.error('Hubo un error guardando el avatar, por favor intenta de nuevo');
    });
  }
};
