import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header.layout.html'
})
export class HeaderLayoutComponent {
  public profilePic: Observable<any>;
  constructor(public auth: Auth, private imageService: ImageService, private sanitizer: DomSanitizer) {
     this.profilePic = new Observable<any>(observer => {
      this.imageService.get(this.auth.profile.profilePictureUrl).then(img => {
        observer.next(this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(img)));
      });
    });
  }
}
