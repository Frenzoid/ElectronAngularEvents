import { TestBed, inject } from '@angular/core/testing';

import { LoadFbApiService } from './load-fb-api.service';

describe('LoadFbApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadFbApiService]
    });
  });

  it('should be created', inject([LoadFbApiService], (service: LoadFbApiService) => {
    expect(service).toBeTruthy();
  }));
});
