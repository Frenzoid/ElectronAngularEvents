import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { UsersService } from '../services/users.service';
import IUser from '../../interfaces/IUser';

@Injectable()
export class UserResolverService {

  constructor(private router: Router, private usersService: UsersService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {

    console.log(route.params['id']);

    const profile = route.params['id'] !== undefined ? route.params['id'] : "me";
      return this.usersService.getUser(route.params['id'])
      .catch(error => {
        console.log(error);
        this.router.navigate(['/events']);
        return Observable.of(null);
      });
  }
}
