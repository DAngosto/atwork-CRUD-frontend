import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseHandlerInterceptor } from './http-response-handler.interceptor';
import { MessageService } from 'primeng/api';

class MockSomeService {}

describe('HttpResponseHandlerInterceptor', () => {
  let interceptor: HttpResponseHandlerInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpResponseHandlerInterceptor,
          multi: true,
        },
        { provide: MockSomeService, useClass: MockSomeService },
        MessageService,
      ],
    });

    interceptor = TestBed.inject(
      HTTP_INTERCEPTORS,
    ) as unknown as HttpResponseHandlerInterceptor;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
