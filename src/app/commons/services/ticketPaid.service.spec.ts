/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TicketPaidService } from './ticketPaid.service';

describe('Service: TicketPaid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketPaidService]
    });
  });

  it('should ...', inject([TicketPaidService], (service: TicketPaidService) => {
    expect(service).toBeTruthy();
  }));
});