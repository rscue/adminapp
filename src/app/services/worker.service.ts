import { Injectable } from '@angular/core';
import { Auth } from './auth.service';
import { WorkerModel } from '../models/worker.model';
import * as Toastr from 'toastr';
import { environment } from '../../environments/environment';
import { CustomAuthHttp } from './customAuthHttp';

declare var Auth0;

@Injectable()
export class WorkerService {
  auth0: any;

  constructor(private auth: Auth, private authHttp: CustomAuthHttp) {
  }

  add(model: WorkerModel): Promise<WorkerModel> {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${environment.ApiUrl}provider/${this.auth.profile.id}/worker`, model).subscribe(data => {
        Toastr.success('Se ha guardado correctamente');
        resolve(data.json());
      }, err => {
        if (err.text() === 'The user already exists.') {
          reject('EMAIL_EXISTS');
        } else {
          Toastr.error('Hubo un error al guardar, intente nuevamente');
          reject();
        }
      });
    });
  }

  update(model: WorkerModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${environment.ApiUrl}provider/${this.auth.profile.id}/worker/${model.id}`, model).subscribe(data => {
        Toastr.success('Se ha actualizado correctamente');
        resolve();
      }, err => {
        Toastr.error('Hubo un error al guardar, intente nuevamente');
        reject();
      });
    });
  }

  get(id: string): Promise<WorkerModel> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${environment.ApiUrl}provider/${this.auth.profile.id}/worker/${id}`).subscribe(data => {
        resolve(data.json());
      }, err => {
        if (err.status !== 404) {
          Toastr.error('Hubo un error al intentar obtener la información, intente nuevamente');
        }
        reject();
      });
    });
  }

  search(status?: Array<string>): Promise<Array<WorkerModel>> {
    let query = '';
    if (status) {
      status.forEach(value => {
        query += `status=${value}`;
      });
    }
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${environment.ApiUrl}provider/${this.auth.profile.id}/worker?${query}`).subscribe(data => {
        resolve(data.json());
      }, err => {
        if (err.status !== 404) {
          Toastr.error('Hubo un error al intentar obtener la información, intente nuevamente');
        }
        reject();
      });
    });
  }

  saveAvatar(image, id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${environment.ApiUrl}provider/${this.auth.profile.id}/worker/profilepic/${id}`,
        { imageBase64: image }).subscribe(data => {
          Toastr.success('Imágen actualizada');
          resolve(data.json());
        }, err => {
          Toastr.error('Hubo un error guardando el avatar, por favor intenta de nuevo');
          reject();
        });
    });
  }
}
