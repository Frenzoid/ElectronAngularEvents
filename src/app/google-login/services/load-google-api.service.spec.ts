import { TestBed, inject } from '@angular/core/testing';

import { LoadGoogleApiService } from './load-google-api.service';

describe('LoadGoogleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadGoogleApiService]
    });
  });

  it('should be created', inject([LoadGoogleApiService], (service: LoadGoogleApiService) => {
    expect(service).toBeTruthy();
  }));
});
