import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { CLIENT_ID } from '../google-login.config';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class LoadGoogleApiService {
  gauth: any = null;
  loader$: Observable<gapi.auth2.GoogleAuth> = null;
  client_id: string;

  constructor(@Inject(CLIENT_ID) client_id: string) {
    this.client_id = client_id;
   }

  getAuthApi(): Observable<gapi.auth2.GoogleAuth> {
    if (!this.gauth) { // Not finished initialization
      if (!this.loader$) { // Not started to initialize
         this.loader$ = this.createLoader();
      }
      return this.loader$; // Return observable (emits auth API when loaded)
    }

    return Observable.of(this.gauth); // Already loaded
  }

  private createLoader(): Observable<gapi.auth2.GoogleAuth> {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api:client.js';
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    document.body.appendChild(script);

    return Observable.fromEvent(script, 'load')
    .switchMap(e => {
      return Observable.create((observer: Observer<gapi.auth2.GoogleAuth>) => {
        gapi.load('auth2', () => {
          const gauth: gapi.auth2.GoogleAuth = gapi.auth2.init({
            client_id: this.client_id,
            cookie_policy: 'single_host_origin'
          });

          this.gauth = gauth;
          observer.next(gauth);
          observer.complete();
        });
      });
    })
    .catch(error => {
      console.error(error);
      return Observable.throw('Error loading the Google API!');
    });
  }

}
