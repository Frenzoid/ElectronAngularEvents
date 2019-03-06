import { Component, OnInit } from '@angular/core';
import IUser from '../../interfaces/IUser';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { NgModel } from '@angular/forms/src/directives';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ae-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usrDataErr = '';
  usrCredErr = '';
  usrAvaErr = '';

  usrDataDone = '';
  usrCredDone = '';
  usrAvaDone = '';

  password2 = '';
  avatar = '';
  user: IUser;
  constructor(private route: ActivatedRoute, private userService: UsersService, private enroute: Router) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.user.password = '';
  }

  updateUserData() {
    this.userService.updateUserData(this.user).subscribe((ok: boolean) => {
      if (ok) {
        console.log('ok');
        this.usrDataDone = 'User data changed sucefully';
        this.usrDataErr = '';
      }
    }, (error) => {
      this.usrDataErr = error;
      this.usrDataDone = '';
    },
      () => console.log('submit finished')
    );
  }

  updateUserCreds() {
    this.userService.updateUserCreds(this.user.password, this.password2).subscribe((ok: boolean) => {
      if (ok) {
        console.log('ok');
        this.usrCredDone = 'Credentials changed sucefully';
        this.usrCredErr = '';
      }
    }, (error) => {
      this.usrCredErr = error;
      this.usrCredDone = '';
    },
      () => console.log('submit finished')
    );
  }

  updateUserAvatar() {
    this.userService.updateUserAvatar(this.avatar).subscribe((ok: boolean) => {
      if (ok) {
        console.log('ok');
        this.usrAvaDone = 'Avatar changed sucefully';
        this.user.avatar = this.avatar;
        this.avatar = "";
      }
    }, (error) => {
      this.usrAvaErr = error;
      this.usrAvaDone = '';
    },
      () => console.log('submit finished')
    );
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.avatar = reader.result;
    });
  }

}
