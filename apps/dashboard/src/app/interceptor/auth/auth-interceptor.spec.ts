import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    interceptor = new AuthInterceptor();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
