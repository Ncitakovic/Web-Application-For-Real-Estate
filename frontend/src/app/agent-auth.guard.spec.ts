import { TestBed } from '@angular/core/testing';

import { AgentAuthGuard } from './agent-auth.guard';

describe('AgentAuthGuard', () => {
  let guard: AgentAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AgentAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
