import { Injectable } from '@angular/core';
import { Auth } from './auth.service';
import { AssignmentsSummaryModel } from '../models/assignmentsSummary.model';
import { AssignmentModel } from '../models/assignment.model';
import { ClientModel } from '../models/client.model';
import { AuthHttp } from 'angular2-jwt';
import * as Toastr from 'toastr';

declare var API_URL: string;

@Injectable()
export class AssignmentService {
    assignmentsSummary: AssignmentsSummaryModel;

    constructor(private auth: Auth, private authHttp: AuthHttp) { }

    getAssignmentsSummary() {
        this.authHttp.get(`${API_URL}provider/${this.auth.profile.id}/assignmentssummary`).subscribe(data => {
            this.assignmentsSummary = data.json();
        }, err => {
            if (err.status !== 404) {
                Toastr.error('Hubo un error al traer la información de las misiones, por favor refresque la pantalla');
            }
        })
    }

    addAssignment(model: AssignmentModel): Promise<any> {
        return new Promise((resolve, reject) => {
            let client: ClientModel = {
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
            this.authHttp.post(`${API_URL}client`, client).subscribe(data => {
                let assignment = {
                    clientId: client.id,
                    providerId: this.auth.auth0User['user_id'],
                    creationDateTime: new Date(),
                    latitude: model.latitude,
                    longitude: model.longitude,
                    status: 'Assigned',
                    workerId: model.workerId
                };
                this.authHttp.post(`${API_URL}assignment`, assignment).subscribe(() => resolve(), err => {
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
            this.authHttp.get(`${API_URL}assignment/search?${params}`).subscribe(data => {
                resolve(data.json());
            }, err => reject(err));
        });
    }
}
