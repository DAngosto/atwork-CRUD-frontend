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
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzdhNzM2Yi0yNmE5LTQxMDAtYTkzNi04Y2E5ODc5ODU3ZjMiLCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiYXVkIjoiYWNjb3VudCIsImlzcyI6IkF0d29yayIsImV4cCI6MTcyOTc2NTQyNCwiaWF0IjoxNzI5NzYxODI0LCJuYmYiOjE3Mjk3NjE4MjR9.wCJWGLU37avTdlrYwRI8QJYtAOWa3oN9i5cpavQTUfg';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    const httpRequest = new HttpRequest('GET', '/Shared/Countries');
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

    const httpRequest = new HttpRequest('GET', '/Shared/Countries');
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
