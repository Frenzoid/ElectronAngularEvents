import { Component, OnInit, Input } from '@angular/core';
import IUser from '../../interfaces/IUser';

@Component({
  selector: 'ae-user-attend-card',
  templateUrl: './user-attend-card.component.html',
  styleUrls: ['./user-attend-card.component.css']
})
export class UserAttendCardComponent implements OnInit {

  constructor() { }
  @Input() user: IUser;
  ngOnInit() {
  }
}
