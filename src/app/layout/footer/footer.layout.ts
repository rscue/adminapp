import { Component } from '@angular/core';

@Component({
    selector: 'app-footer-layout',
    templateUrl: './footer.layout.html',
})

export class FooterLayoutComponent {
  public get year() {
    return new Date().getFullYear();
  }
}
