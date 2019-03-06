import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class GeolocationService {

constructor() { }

geolocate(): Observable<Coordinates> {
  return new Observable((observer) => {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((pos: Position) => {
        observer.next(pos.coords);
        observer.complete();
      }, (error: PositionError) => {
        observer.error(error);
        observer.complete();
      });
    } else {
      observer.error('Unsupported Browser');
      observer.complete();
    }
  });
}

}
