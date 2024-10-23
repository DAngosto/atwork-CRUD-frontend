import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs/internal/observable/of';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should add Authorization header if token is present', () => {
    const token = 'mock-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    const httpRequest = new HttpRequest('GET', '/test-url');
    const httpHandler: HttpHandler = {
      handle: jasmine
        .createSpy('handle')
        .and.returnValue(of({} as HttpEvent<any>)),
    };

    interceptor.intercept(httpRequest, httpHandler).subscribe();

    const modifiedRequest = (
      httpHandler.handle as jasmine.Spy
    ).calls.mostRecent().args[0];
    expect(modifiedRequest.headers.get('Authorization')).toBe(
      `Bearer ${token}`,
    );
  });

  it('should not add Authorization header if no token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const httpRequest = new HttpRequest('GET', '/test-url');
    const httpHandler: HttpHandler = {
      handle: jasmine
        .createSpy('handle')
        .and.returnValue(of({} as HttpEvent<any>)),
    };

    interceptor.intercept(httpRequest, httpHandler).subscribe();

    const modifiedRequest = (
      httpHandler.handle as jasmine.Spy
    ).calls.mostRecent().args[0];
    expect(modifiedRequest.headers.has('Authorization')).toBeFalse();
  });
});
