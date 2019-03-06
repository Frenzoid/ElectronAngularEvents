import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../commons/services/auth.service';
import IUser from '../../interfaces/IUser';
import { GeolocationService } from '../../commons/services/geolocation.service';

@Component({
  selector: 'ae-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private geolocate: GeolocationService, private enroute: Router, private auth: AuthService, private titleService: Title) { }

  user: IUser = {
    name : "",
    email : "",
    email2 : "",
    password : "",
    avatar : "",
    lat: 0,
    lng: 0
  };

  error = "";

  ngOnInit() {
    this.titleService.setTitle('Resgister to SV-Tickets');
    this.geolocate.geolocate().subscribe(
      (coords) => {
        this.user.lat = coords.latitude;
        this.user.lng = coords.longitude;
      });
  }

  register() {
    this.auth.register(this.user).subscribe(
      (ok) =>  this.enroute.navigate(['/events']),
      (err) => this.error = err.errorMessage,
      () => console.log('register finished')
    );
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.user.avatar = reader.result;
    });
  }

}
