import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
    selector: 'sidebar-layout',
    templateUrl: './sidebar.layout.html'
})
export class SidebarLayout {
    constructor(public auth: Auth) { }
}
