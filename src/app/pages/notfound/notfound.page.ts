import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var loading_screen: any;

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html'
})

export class NotFoundPageComponent {
  constructor(private router: Router) {
    $(() => loading_screen.finish());
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        $(() => {
          document.body.classList.add('sidebar-collapse');
          $['AdminLTE'].layout.fix();
        });
      }
    });
  }
}
