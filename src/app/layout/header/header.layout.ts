import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
    selector: 'app-header-layout',
    templateUrl: './header.layout.html'
})
export class HeaderLayoutComponent {
    constructor(public auth: Auth) {}
}
