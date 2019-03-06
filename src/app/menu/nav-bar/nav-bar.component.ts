import { AuthService } from '../../commons/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ae-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private enroute: Router, private auth: AuthService) {}
  title = 'ae';
  showNav;

  logout() {
    this.auth.logout();
    this.enroute.navigate(['/login']);
  }


  public ngOnInit(): void {
    this.auth.isLogged().subscribe(
      (isLogged) => this.showNav = isLogged,
    (err) => console.log(err));

    this.auth.$loginEmitter.subscribe(logged => {this.showNav = logged; });
  }
}
