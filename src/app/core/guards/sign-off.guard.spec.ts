import { TestBed, async, inject } from '@angular/core/testing';

import { SignOffGuard } from './sign-off.guard';

describe('SignOffGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignOffGuard]
    });
  });

  it('should ...', inject([SignOffGuard], (guard: SignOffGuard) => {
    expect(guard).toBeTruthy();
  }));
});
