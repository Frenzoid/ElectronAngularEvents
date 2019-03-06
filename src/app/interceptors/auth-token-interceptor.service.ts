// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsersult } from '../interfaces/response';

@Injectable()
export class AuthTokenInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let sendReq = req;

    if (token) {
      sendReq = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      console.log('-Inyectando Token-');
      console.log(localStorage.getItem('token'));
    }

    return next.handle(sendReq).do((resp: HttpResponse<any>) => {
      if (resp instanceof HttpResponse && resp.body.result.token) {
        console.log('-capturand token-');
        console.log(resp.body.result.token);
        localStorage.setItem('token', resp.body.result.token);
      }
    });
  }
}
