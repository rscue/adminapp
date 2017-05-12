import {LocationModel } from './location.model';

export class WorkerModel {
    id: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    avatarUri: string;
    submitted: boolean;
    password: string;
    confirmPassword: string;
    location: LocationModel;
    status: string;

    constructor() {
        this.avatarUri = '/img/nobody.jpg';
    }
}