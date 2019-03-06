/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserResolverService } from './user-resolver.service';

describe('Service: UserResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserResolverService]
    });
  });

  it('should ...', inject([UserResolverService], (service: UserResolverService) => {
    expect(service).toBeTruthy();
  }));
});