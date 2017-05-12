export class ProfileModel {
    id: string;
    name: string;
    email: string;
    address: string;
    zipCode: string;
    city: string;
    state: string;
    avatarUri: string;
    submitted: boolean;

    constructor() {
        this.avatarUri = '/img/logo.png';
    }
}