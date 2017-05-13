import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
    selector: 'app-sidebar-layout',
    templateUrl: './sidebar.layout.html'
})
export class SidebarLayoutComponent {
    constructor(public auth: Auth) { }
}
