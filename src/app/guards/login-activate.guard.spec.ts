import { TestBed, async, inject } from '@angular/core/testing';

import { LoginActiveGuard } from './login-activate.guard';

describe('LoginActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginActiveGuard]
    });
  });

  it('should ...', inject([LoginActiveGuard], (guard: LoginActiveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
