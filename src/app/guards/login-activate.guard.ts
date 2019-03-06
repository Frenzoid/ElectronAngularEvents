// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../commons/services/auth.service';
import { ElectronService } from '../commons/services/electron.service';
@Injectable()
export class LoginActiveGuard implements CanActivate {

  constructor(private auth: AuthService, private enroute: Router, private electronService: ElectronService) {}

  canActivate(): Observable<boolean> {

    return this.auth.isLogged()
    .catch(
      (error: string) =>  { console.log('GUARD LOGIN CATCH!!: ' + error); return Observable.of(false); })
    .map((logged: boolean) => {
      console.log('GUARD LOGIN: ' + logged);

      if (logged) {
          this.electronService.setNormalMenu();
         return logged;
      } else if (!logged) {
        this.electronService.setLoginMenu();
        this.enroute.navigate(['/login']);
        return !logged;
      }
    });
  }
}
