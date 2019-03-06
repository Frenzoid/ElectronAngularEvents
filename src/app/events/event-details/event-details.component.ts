import { EventService } from '../services/event.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import IEvent from '../../interfaces/IEvent';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendeesService } from '../services/atendees.service';
import { TicketPaidService } from '../../commons/services/ticketPaid.service';
import IUser from '../../interfaces/IUser';
import { SERVER } from '../../constants/constants';

@Component({
  selector: 'ae-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})

export class EventDetailsComponent implements OnInit {
  event: IEvent;
  attendents = [];
  id: number;
  justone = true;
  payedMessage: string;
  paymentCanceledMessage: string;
  amount: number;

  constructor(private attendants: AtendeesService, private enroute: Router,
     private eventService: EventService, private route: ActivatedRoute, private titleService: Title,
    private payment: TicketPaidService) { }

  ngOnInit() {
    this.payedMessage = '';
    this.paymentCanceledMessage = '';
    this.amount = 1;
    this.titleService.setTitle('Event Details');

    this.id = +this.route.snapshot.params['id'];
    this.event = this.route.snapshot.data['event'];

    this.attendants.getAttendants(this.event.id).subscribe(
      atendants => this.attendents = atendants,
      err => console.log(err),
      () => console.log("done loading attendants")
    );

    console.log(this.event);
  }

  // El boton de paypal a veces tarda la vida en renderizarse.
  getPayment(ok: boolean) {

    this.payedMessage = '';
    this.paymentCanceledMessage = '';

    if (ok === true) {
      this.payedMessage = 'Payment correct!';
      console.log("PAID");
      this.payment.purcharse(this.event.id, {quantity: this.amount}).subscribe(
        (done: IUser) => {
          console.log(done);
          const me = this.attendents.filter(attend => attend.id === done.id);
          console.log(me);
          if (me.length === 0) {
            if (!done.avatar.includes('://')) {
              done.avatar = SERVER + "/" + done.avatar;
            }
            this.attendents.push(done);
            console.log(this.attendents);

          }
        },
        (error) => console.log(error)
      );
    } else {
      this.paymentCanceledMessage = 'Payment cancelled';
    }

  }

  deleteEvent() {
    if (confirm('Do you want to delete this event?')) {
      this.eventService.removeEvent(this.id).subscribe(
        ok => { console.log(ok); this.enroute.navigate(['/events']); },
        err => { console.log(err); alert("Can't delete events with selld tickets"); },
        () => console.log('finished deleting')
      );
    }
  }
}
