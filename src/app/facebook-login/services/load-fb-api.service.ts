import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Inject, Injectable } from '@angular/core';
import { FB_CONFIG, FBConfig } from '../facebook-login.config';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class LoadFbApiService {
  private app_id: string;
  private version: string;
  private isLoaded = false;
  private loader$: Observable<void> = null;

  constructor(@Inject(FB_CONFIG) fb_config: FBConfig) {
    this.app_id = fb_config.app_id;
    this.version = fb_config.version;
  }

  loadApi(): Observable<void> {
    if (!this.isLoaded) {
      if (!this.loader$) {
        this.loader$ = this.loadScript();
      }
      return this.loader$;
    }

    return Observable.of(null);
  }

  login(scopes: string): Observable<FB.LoginStatusResponse> {
    return this.isLogged()
      .catch(response => {
        // Observable.create didn't compile...¿?
        return new Observable((observer: Observer<FB.LoginStatusResponse>) => {
          FB.login(respLogin => {
            if (respLogin.status === 'connected') {
              observer.next(respLogin);
            } else {
              observer.error(respLogin);
            }
            observer.complete();
          }, { scope : scopes });
        });
      });
  }

  isLogged(): Observable<FB.LoginStatusResponse> {
    return Observable.create((observer: Observer<FB.LoginStatusResponse>) => {
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          observer.next(response);
        } else {
          observer.error(response);
        }
        observer.complete();
      });
    });
  }

  private loadScript(): Observable<void> {
    return Observable.create((observer: Observer<void>) => {
      window.fbAsyncInit = () => {
        FB.init({
          appId: this.app_id,
          xfbml: true,
          version: this.version
        });
        this.isLoaded = true;
        observer.next(null);
        observer.complete();
      };

      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/es_ES/sdk.js';
      script.setAttribute('async', '');
      script.setAttribute('defer', '');
      document.body.appendChild(script);
    });
  }
}
