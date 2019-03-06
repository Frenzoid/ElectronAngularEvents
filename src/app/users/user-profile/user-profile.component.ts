import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IUser from '../../interfaces/IUser';

@Component({
  selector: 'ae-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  user: IUser;
  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

}
