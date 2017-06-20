import { Injectable } from '@angular/core';
import { Headers, ResponseContentType } from '@angular/http';
import { CustomAuthHttp } from './customAuthHttp';

@Injectable()
export class ImageService {
  constructor(private authHttp: CustomAuthHttp) { }

  public update(url: string, blob: Blob) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Content-Type', 'raw');
      this.authHttp.put(url, blob, { headers: headers }).subscribe(() => resolve(), err => reject(err));
    });
  }

  public get(url: string) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Content-Type', 'raw');
      this.authHttp.get(url, { headers: headers, responseType: ResponseContentType.Blob }).subscribe(result => {
        const blob = result.blob();
        resolve(blob);
      }, err => reject(err));
    });
  }
}
