import { Injectable } from '@angular/core';
import { Auth } from './auth.service';
import { FleetModel } from '../models/fleet.model';
import { AuthHttp } from 'angular2-jwt';
import * as Toastr from 'toastr';

declare var API_URL: string;

@Injectable()
export class FleetService {
  constructor(private auth: Auth, private authHttp: AuthHttp) { }

  add(model: FleetModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${API_URL}provider/${this.auth.profile.id}/fleet`, model).subscribe(data => {
        Toastr.success('Se ha guardado correctamente');
        resolve();
      }, err => {
        Toastr.error('Hubo un error al guardar, intente nuevamente');
        reject();
      });
    });
  }

  update(model: FleetModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${API_URL}provider/${this.auth.profile.id}/fleet/${model.id}`, model).subscribe(data => {
        Toastr.success('Se ha actualizado correctamente');
        resolve();
      }, err => {
        Toastr.error('Hubo un error al guardar, intente nuevamente');
        reject();
      });
    });
  }

  get(id: string): Promise<FleetModel> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${API_URL}provider/${this.auth.profile.id}/fleet/${id}`).subscribe(data => {
        resolve(data.json());
      }, err => {
        if (err.status !== 404) {
          Toastr.error('Hubo un error al intentar obtener la información, intente nuevamente');
        }
        reject();
      });
    });
  }

  search(): Promise<Array<FleetModel>> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${API_URL}provider/${this.auth.profile.id}/fleet/`).subscribe(data => {
        resolve(data.json());
      }, err => {
        if (err.status !== 404) {
          Toastr.error('Hubo un error al intentar obtener la información, intente nuevamente');
        }
        reject();
      });
    });
  }
}
