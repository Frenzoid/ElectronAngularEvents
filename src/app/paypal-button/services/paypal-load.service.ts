import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';

@Injectable()
export class PaypalLoadService {
  loaded = false;
  loading$: Observable<void> = null;

  constructor() { }

  loadPaypal(): Observable<void> {
    if (!this.loaded) {
      if (!this.loading$) {
        const script = document.createElement('script');
        script.src = 'https://www.paypalobjects.com/api/checkout.js';
        script.setAttribute('async', '');
        script.setAttribute('defer', '');
        script.setAttribute('data-version-4', '');
        document.body.appendChild(script);

        this.loading$ = Observable.fromEvent(script, 'load');
      }

      return this.loading$;
    }

    return Observable.of(null);
  }

}
