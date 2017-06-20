export class ProfileModel {
  id: string;
  name: string;
  email: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  profilePictureUrl: string;
  submitted: boolean;

  constructor() {
    this.profilePictureUrl = '/assets/img/logo.png';
    this.email = localStorage.getItem('email');
  }
}
