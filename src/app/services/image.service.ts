import { Injectable } from '@angular/core';
import { CustomAuthHttp } from './customAuthHttp';

@Injectable()
export class ImageService {
  constructor(private authHttp: CustomAuthHttp) { }


}
