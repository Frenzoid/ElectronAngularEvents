import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { GeolocationService } from './services/geolocation.service';
import { TicketPaidService } from './services/ticketPaid.service';
import { ElectronService } from './services/electron.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  ],
  providers: [
    AuthService,
    GeolocationService,
    TicketPaidService,
    ElectronService
  ],
  declarations: []
})
export class CommonsModule { }
