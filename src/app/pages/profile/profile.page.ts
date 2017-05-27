import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProfileModel } from '../../models/profile.model';
import { Auth } from '../../services/auth.service';
import 'select2';
import { Router } from '@angular/router';
import { AvatarModalPageComponent } from '../avatar/avatar.modal';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePageComponent implements AfterViewInit {
  public profile: ProfileModel;
  public states: [{ code: string, name: string }];
  @ViewChild('avatarModal') modal: AvatarModalPageComponent;
  @ViewChild('logoImg') logoImg: ElementRef;
  shouldSaveImage: boolean;

  constructor(private auth: Auth, private router: Router) {
    this.profile = this.auth.profile ? this.auth.profile : new ProfileModel();
    this.setupStates();
  }

  ngAfterViewInit() {
    $('#state').select2({
      placeholder: 'Seleccione una provincia'
    }).on('select2:select', (e) => {
      this.profile.state = e['params'].data.id;
    }).val(this.profile.state).trigger('change');
  }

  save(isValid: boolean) {
    if (isValid) {
      this.profile.submitted = true;
      this.auth.saveProfile(this.profile).then(() => {
        if (this.shouldSaveImage) {
         this.auth.saveAvatar(this.logoImg.nativeElement.src);
        }
        this.profile.submitted = false;
        this.router.navigate(['/home']);
      }).catch(() => { this.profile.submitted = false; });
    }
  }

  setupStates() {
    this.states = [
      { code: 'B', name: 'Buenos Aires' },
      { code: 'K', name: 'Catamarca' },
      { code: 'H', name: 'Chaco' },
      { code: 'U', name: 'Chubut' },
      { code: 'C', name: 'Ciudad Autónoma de Buenos Aires' },
      { code: 'X', name: 'Córdoba' },
      { code: 'W', name: 'Corrients' },
      { code: 'E', name: 'Entre Ríos' },
      { code: 'P', name: 'Formosa' },
      { code: 'Y', name: 'Jujuy' },
      { code: 'L', name: 'La Pampa' },
      { code: 'F', name: 'La Rioja' },
      { code: 'M', name: 'Mendoza' },
      { code: 'N', name: 'Misiones' },
      { code: 'Q', name: 'Neuquén' },
      { code: 'R', name: 'Río Negro' },
      { code: 'A', name: 'Salta' },
      { code: 'J', name: 'San Juan' },
      { code: 'D', name: 'San Luis' },
      { code: 'Z', name: 'Santa Cruz' },
      { code: 'S', name: 'Santa Fe' },
      { code: 'G', name: 'Santiago del Estero' },
      { code: 'V', name: 'Tierra del Fuego' },
      { code: 'T', name: 'Tucumán' }
    ];
  }

  changeLogo(image) {
    this.logoImg.nativeElement.src = image;
    if (!this.profile.id) {
      this.shouldSaveImage = true;
    } else {
      this.auth.saveAvatar(image);
    }
  }
}
