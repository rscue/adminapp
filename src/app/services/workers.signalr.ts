import { Injectable } from '@angular/core';
import { Auth } from './auth.service';
import { LocationModel } from '../models/location.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'signalr';

declare var API_URL: string;

@Injectable()
export class WorkersSignalr {
    private hubConnection: any;
    private _updatedWorkerLocation: BehaviorSubject<{ id: string, location: LocationModel }>
    private _updatedWorkerStatus: BehaviorSubject<{id: string, status: string}>


    constructor(private auth: Auth) {
        this._updatedWorkerLocation = <BehaviorSubject<{ id: string, location: LocationModel }>>new BehaviorSubject({});
        this._updatedWorkerStatus = <BehaviorSubject<{id: string, status: string}>>new BehaviorSubject({});

        //this.hubConnection = $.hubConnection(`${API_URL.slice(0, -1)}`, { qs: `user=${this.auth.auth0User['user_id']}` });
        let workersHubProxy = this.hubConnection.createHubProxy('workersHub');
        workersHubProxy.on('updateWorkerLocation', (id: string, location: LocationModel) => {
            this._updatedWorkerLocation.next({ id: id, location: location });
        });
        workersHubProxy.on('updateWorkerStatus', (id: string, status: string) => {
            this._updatedWorkerStatus.next({id: id, status: status});
        });
    }

    start() {
        this.hubConnection.start({ withCredentials: false });
    }

    stop() {
        this.hubConnection.stop();
    }

    get updateWorkerLocation() {
        return this._updatedWorkerLocation.asObservable();
    }

    get updateWorkerStatus() {
        return this._updatedWorkerStatus.asObservable();
    }
}
