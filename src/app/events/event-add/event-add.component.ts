import { NgModel } from '@angular/forms/src/directives';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import IEvent from '../../interfaces/IEvent';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ae-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  constructor(private eventService: EventService, private titleService: Title,
    private enroute: Router, private route: ActivatedRoute) { }
  minDate = new Date();
  cancelled = false;
  editing: string;
  errors = '';
  done: boolean;
  newEvent: IEvent = {
    title: '',
    image: '',
    date: '',
    description: '',
    price: 0,
    address: '',
    lng: 0,
    lat: 0
  };

  ngOnInit() {
    this.done = false;
    this.editing = "submit";
    this.titleService.setTitle('Add Event');
    console.log(this.route.snapshot.params);
    if (this.route.snapshot.params['id'] !== undefined) {
      this.titleService.setTitle('Edit Event');
      this.newEvent = this.route.snapshot.data['event'];

      let month: string | number = new Date(<string>this.newEvent.date).getMonth();
      month++;
      if (month.toString().length === 1) { month = "0" + month; }

      let day: string | number = new Date(<string>this.newEvent.date).getDate();
      if (day.toString().length === 1) { day = "0" + day; }

      this.newEvent.date = new Date(<string>this.newEvent.date).getFullYear()
        + "-" + month + "-" + day;

      this.editing = "save";
    }
    console.log(this.newEvent);
  }

  submitToServer() {
    this.done = true;
    if (this.route.snapshot.params['id'] === undefined) {
      // this.newEvent.date = new Date(<string>this.newEvent.date);
      this.eventService.addEvent(this.newEvent).subscribe((ok: boolean) => {
        if (ok) { console.log('ok'); this.enroute.navigate(['/events']); }
      }, (error) => this.errors = error,
        () => console.log('submit finished')
      );
    } else {
      if (this.newEvent.image.includes("://")) {
        const parts = this.newEvent.image.split("/").slice(3);
        this.newEvent.image = parts.join("/");
      }

      this.eventService.updateEvent(this.newEvent).subscribe((ok: boolean) => {
        if (ok) { console.log('ok'); this.enroute.navigate(['/events']); }
      }, (error) => this.errors = error,
        () => console.log('submit finished')
      );
    }
  }

  changePosition(pos: google.maps.LatLng) {
    this.newEvent.lat = pos.lat();
    this.newEvent.lng = pos.lng();
    console.log(this.newEvent);
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newEvent.image = reader.result;
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

  cancelAddProd() {
    this.cancelled = true;
    this.enroute.navigate(['/events']);
  }
}
