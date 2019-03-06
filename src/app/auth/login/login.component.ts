import { Router } from '@angular/router';
import { AuthService } from '../../commons/services/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Responsersult } from '../../interfaces/response';
import IUser from '../../interfaces/IUser';
import { GeolocationService } from '../../commons/services/geolocation.service';

@Component({
  selector: 'ae-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = {name: "", password: "", email: "", lat: 0, lng: 0};
  error = "";
  constructor(private ngZone: NgZone, private geolocate: GeolocationService, private enroute: Router,
    private auth: AuthService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Login to SV-Tickets');
    this.geolocate.geolocate().subscribe(
      (coords) => {
        this.user.lat = coords.latitude;
        this.user.lng = coords.longitude;
        console.log(this.user);

      },
    error => console.error(error));
  }

  authToServer() {
    this.auth.login(this.user).subscribe(
      (ok) =>  this.enroute.navigate(['/events']),
      (err) => this.error = err.errorMessage,
      () => console.log('login finished')
    );
  }

  loggedGoogle(user: gapi.auth2.GoogleUser) {
    // Por razones que escapan a mi comprender, algunas veces al hacer login desde google,
    // se solapan varias vistas, como si angular no se diera cuenta de lo que está sucediento,
    // entonces recorde lo que dijiste sobre ngZone, y hice una prueba, y ahora funciona correctamente,

    this.ngZone.run(() => {
    const userExport: { name: string, email: string, avatar: string, externalidG: string } = {
      name: user.getBasicProfile().getName(),
      email: user.getBasicProfile().getEmail(),
      avatar: user.getBasicProfile().getImageUrl(),
      externalidG: user.getBasicProfile().getId()
    };


      this.auth.login(userExport, 'google/').subscribe(
        (ok) =>  this.enroute.navigate(['/events']),
        (err) => this.error = err.errorMessage,
        () => console.log('login finished')
      );
    });
   }

   showError(error: any) {
     console.log(error);
   }

   loggedFacebook(resp: FB.LoginStatusResponse) {
    console.log(resp.authResponse.accessToken);
    }
}
