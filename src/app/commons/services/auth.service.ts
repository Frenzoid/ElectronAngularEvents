import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

import { EventEmitter, Injectable } from '@angular/core';
import { AUTHURL } from '../../constants/constants';
import { Responsersult, ResponseEvents } from '../../interfaces/response';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  logged = false;
  $loginEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  register(data) {

    return this.http.post(AUTHURL + 'register/', data)
    .catch((response: HttpErrorResponse) => {console.log(response); return Observable.throw('Error getting confirmation from servers!' +
         `. Server returned code ${response.error}, message was: ${response.message}, server status ${response.status}`); })
    .map((response: Responsersult) => {
      console.log("-OBJETO DE RESPUESTA-");
      console.log(response);
      console.log("---------------------");
      if (response.error) { throw response; }

      localStorage.setItem('token', response.result.token);
      this.logged = true;
      this.$loginEmitter.emit(true);
      console.log("-->LOGGED: " + this.logged);
      return true;
    });
  }



  login(user, section = 'login/'): Observable<boolean> {
    return this.http.post(AUTHURL + section, user)
    .catch((response: HttpErrorResponse) => {console.log(response); return Observable.throw('Error getting confirmation from servers!' +
         `. Server returned code ${response.error}, message was: ${response.message}, server status ${response.status}`); })
    .map((response: Responsersult) => {
      console.log("-OBJETO DE RESPUESTA-");
      console.log(response);
      console.log("---------------------");
      if (response.error) { throw response; }

      localStorage.setItem('token', response.result.token);
      this.logged = true;
      this.$loginEmitter.emit(true);
      console.log("-->LOGGED: " + this.logged);
      return true;
    });
  }

  logout() {
    localStorage.removeItem('token');
    console.log('token removed');
    this.$loginEmitter.emit(false);
    this.logged = false;
  }

  isLogged(): Observable<boolean> {

    console.log('--TOKEN-EN-USO--');
    console.log(localStorage.getItem('token'));
    console.log('--LOGIN--');
    console.log(this.logged);

    if (this.logged && localStorage.getItem('token')) {
      this.$loginEmitter.emit(true);
      return Observable.of(true); }

    if (!this.logged && !localStorage.getItem('token')) {
      this.$loginEmitter.emit(false);
      return Observable.of(false); }

    if (!this.logged && localStorage.getItem('token')) {
      // const options = { headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))};

      return this.http.get(AUTHURL + 'token/')
      .catch((response: HttpErrorResponse) => Observable.throw('Error getting confirmation from server!' +
           `. Server returned code ${response.status}, message was: ${response.message}`))
      .map((response: Responsersult) => {
        console.log("-->OK: " + !response.error);
        console.log("-->ERROR MESG: " + response.errorMessage);
        if (!response.error) {
          this.logged = true;
          this.$loginEmitter.emit(true);
        }

        return !response.error;
      });
    }
  }
}
