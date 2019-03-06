import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import IEvent from '../../interfaces/IEvent';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { ElectronService } from '../../commons/services/electron.service';

@Component({
  selector: 'ae-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.css']
})

export class EventsShowComponent implements OnInit {
  events: IEvent[] = [];
  filterSearch = '';
  eventRoute: string[];
  requestRoute: string;

  constructor(private eventService: EventService, private titleService: Title,
    private router: Router, private electronService: ElectronService, private ngZone: NgZone) { }

  ngOnInit() {
    this.titleService.setTitle('Event list | Electron Angular Events');

    // Vamos a dar provecho a que las rutas de la app son identicas a las rutas de los recursos.
    this.eventRoute = this.router.url.split("/");
    this.eventRoute.splice(0, 2);
    console.log(this.eventRoute);
    this.requestRoute = this.eventRoute.join("/");

    this.eventService.getEvents(this.requestRoute).subscribe(
      events => { this.events = events, this.loadCreateBackUpListener(); },
      (error: string) => console.log(error),
      () => console.log('Events loading finished!')
    );

    this.electronService.loadBackUp().subscribe(
      events => {
        console.log(events);
        this.ngZone.run(() => { this.events = events; });
      }
    );

    this.electronService.reloadEvents().subscribe(
      () => {
        console.log("reloading events...");
        this.eventService.getEvents(this.requestRoute).subscribe(
          events => { this.events = events, this.loadCreateBackUpListener(); },
          (error: string) => console.log(error),
          () => console.log('Events loading finished!')
        );
      }
    );
  }

  deleteEvent(index) {
    // alert(index);
    if (confirm('Do you want to delete this event?')) {
      this.eventService.removeEvent(this.events[index].id).subscribe(
        ok => this.events.splice(index, 1),
        err => { console.log(err); alert("Can't delete events with selld tickets"); },
        () => console.log('finished deleting')
      );
    }
  }

  orderDate() {
    this.events.sort((a, b) => {
      return (<number>(new Date(<Date>a.date)).getTime()) - (<number>(new Date(<Date>b.date)).getTime());
    });
  }

  orderPrice() {
    this.events.sort((a, b) => {
      return a.price - b.price;
    });
  }

  loadCreateBackUpListener() {
    this.electronService.createBackUp(this.events).subscribe(
      done => {
        console.log(done);
        done ? alert("Backup done.") : alert("Something gone wrong while creating the backup.");
      },
      error => alert(error)
    );
  }
}
