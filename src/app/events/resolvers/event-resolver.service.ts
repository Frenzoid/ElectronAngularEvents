import { EventService } from '../services/event.service';
import IEvent from '../../interfaces/IEvent';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class EventResolverService implements Resolve<IEvent> {
 constructor(private eventService: EventService, private router: Router) { }

 resolve(route: ActivatedRouteSnapshot): Observable<IEvent> {

  console.log("EVENT RESOLVER-----------------------------------------------");
  return this.eventService.getEvent(route.params['id'])
  .catch(error => {
      console.log(error);
      this.router.navigate(['/events']);
      return Observable.of(null);
  });
 }
}
