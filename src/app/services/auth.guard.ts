import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';
import { ProfilePage } from '../pages/profile/profile.page';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: Auth, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.authenticated()) {
            return true;
        } else if (this.auth.auth0User && next.component == ProfilePage) {
            return true;
        } else {
            localStorage.setItem('redirect_url', state.url);
            this.router.navigate(['login']);
            return false;
        }
    }
}