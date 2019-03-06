import { TestBed, inject } from '@angular/core/testing';

import { EventResolverService } from './event-resolver.service';

describe('EventResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventResolverService]
    });
  });

  it('should be created', inject([EventResolverService], (service: EventResolverService) => {
    expect(service).toBeTruthy();
  }));
});
