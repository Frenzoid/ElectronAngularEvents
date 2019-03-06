import { TestBed, async, inject } from '@angular/core/testing';

import { EventDeactiveEditGuard } from './event-edit-deactivate.guard';

describe('EventDeactiveEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventDeactiveEditGuard]
    });
  });

  it('should ...', inject([EventDeactiveEditGuard], (guard: EventDeactiveEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
