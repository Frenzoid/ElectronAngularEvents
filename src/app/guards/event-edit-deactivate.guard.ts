import { EventAddComponent } from '../events/event-add/event-add.component';
import { EventService } from '../events/services/event.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class EventDeactiveEditGuard implements CanDeactivate<EventAddComponent> {
    constructor(private eventServ: EventService) {}

    public canDeactivate(
        component: EventAddComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean> {
        if (component.done) {
          return Observable.of(true);
        }

        if (!component.cancelled && confirm('Do you want to save changes to the event?')) {
          if (component.newEvent.image.includes("http://") || component.newEvent.image.includes("https://")) {
            const parts = component.newEvent.image.split("/").slice(3);
            component.newEvent.image = parts.join("/");
          }
            return this.eventServ.updateEvent(component.newEvent)
            .catch(error => {
                // alert(error);
                console.error(error);
                return Observable.of(false);
            });
        }

        return Observable.of(true);
    }

    /*
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Save Chnges?',
        body: 'Do you want save before quiting?'
      }
    });

    dialogRef.afterClosed().subscribe(
      resp => { this.response = resp ? 'Yes' : 'No';
      if (!component.cancelled && this.response === 'Yes') {

        return this.eventServ.addEvent(component.newEvent)
          .catch(error => {
            alert(error);
            return Observable.of(false);
          });
      }

      return Observable.of(true);
  });

  return Observable.of(false);*/
}
