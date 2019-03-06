import IEvent from '../../interfaces/IEvent';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ae-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
@Input() event: IEvent;
@Output() deleted = new EventEmitter<void>();

  constructor() { }
  e: IEvent;

  ngOnInit() {
    this.e = this.event;
  }

  delete() {
    this.deleted.emit();
  }

}
