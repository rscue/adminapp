import { Injectable } from '@angular/core';
import { Auth } from './auth.service';
import { AssignmentsSummaryModel } from '../models/assignmentsSummary.model';
import { AssignmentModel } from '../models/assignment.model';
import { ClientModel } from '../models/client.model';
import { CustomAuthHttp } from './customAuthHttp';
import * as Toastr from 'toastr';
import { environment } from '../../environments/environment';

@Injectable()
export class AssignmentService {
    assignmentsSummary: AssignmentsSummaryModel;

    constructor(private auth: Auth, private authHttp: CustomAuthHttp) { }

    getAssignmentsSummary() {
        this.authHttp.get(`${environment.ApiUrl}provider/${this.auth.profile.id}/assignmentssummary`).subscribe(data => {
            this.assignmentsSummary = data.json();
        }, err => {
            if (err.status !== 404) {
                Toastr.error('Hubo un error al traer la información de las misiones, por favor refresque la pantalla');
            }
        });
    }

    addAssignment(model: AssignmentModel): Promise<any> {
        return new Promise((resolve, reject) => {
            const client: ClientModel = {
                boatModel: model.boatModel,
                engineType: model.engineType,
                hullSize: model.hullSize,
                lastName: model.lastName,
                name: model.name,
                phoneNumber: model.phoneNumber,
                registrationNumber: model.registrationNumber,
                vehicleType: model.vehicleType,
                email: null,
                id: this.guid()
            };
            this.authHttp.post(`${environment.ApiUrl}client`, client).subscribe(data => {
                const assignment = {
                    clientId: client.id,
                    providerId: this.auth.apiId,
                    creationDateTime: new Date(),
                    latitude: model.latitude,
                    longitude: model.longitude,
                    status: 'Assigned',
                    workerId: model.workerId
                };
                this.authHttp.post(`${environment.ApiUrl}assignment`, assignment).subscribe(() => resolve(), err => {
                    Toastr.error('Hubo un error al guardar, intente nuevamente');
                    reject(err);
                });
            }, err => {
                Toastr.error('Hubo un error al guardar, intente nuevamente');
                reject(err);
            });
        });
    }

    guid() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    search(model: any): Promise<Array<AssignmentModel>> {
        let params = '';
        model.statuses.forEach(value => {
            params += `statuses=${value}&`;
        });
        params += `startDateTime=${model.startDateTime.toISOString()}&`;
        params += `endDateTime=${model.endDateTime.toISOString()}`;
        return new Promise((resolve, reject) => {
            this.authHttp.get(`${environment.ApiUrl}assignment/search?${params}`).subscribe(data => {
                resolve(data.json());
            }, err => reject(err));
        });
    }
}
