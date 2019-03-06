import { TestBed, inject } from '@angular/core/testing';

import { PaypalLoadService } from './paypal-load.service';

describe('PaypalLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaypalLoadService]
    });
  });

  it('should be created', inject([PaypalLoadService], (service: PaypalLoadService) => {
    expect(service).toBeTruthy();
  }));
});
