import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
    selector: 'header-layout',
    templateUrl: './header.layout.html'
})
export class HeaderLayout {
    constructor(public auth: Auth) {}
}
