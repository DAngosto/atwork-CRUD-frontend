import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AuthService } from '../services/auth.service';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthenticationGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /login if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow child routes to be activated if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);

    const result = guard.canActivateChild();

    expect(result).toBeTrue();
  });

  it('should redirect child routes to /login if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);

    const result = guard.canActivateChild();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
