/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AtendeesService } from './atendees.service';

describe('Service: Atendees', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtendeesService]
    });
  });

  it('should ...', inject([AtendeesService], (service: AtendeesService) => {
    expect(service).toBeTruthy();
  }));
});