import { Component, ViewChild } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { LoginModel } from './login.model';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.css']
})
export class LoginPage {
    loginModel: LoginModel;
    loading: boolean;

    constructor(public auth: Auth, private router: Router) {
        this.loginModel = new LoginModel();

        if (tokenNotExpired()) {
            if (!this.auth.profile) {
                this.loading = true;
                this.auth.getAuth0User().then(() => {
                    let redirectUrl = localStorage.getItem('redirect_url');
                    this.router.navigateByUrl(redirectUrl);
                }).catch(() =>{});
            }
        }
    }

    public login(isValid: boolean) {
        this.loginModel.hasError = false;
        if (isValid) {
            this.loginModel.submitted = true;
            this.auth.login(this.loginModel.email, this.loginModel.password).catch(() => {
                this.loginModel.submitted = false;
                this.loginModel.hasError = true;
            });
        }
    }
}
