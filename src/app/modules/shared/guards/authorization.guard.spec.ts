import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['hasAnyRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthorizationGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthorizationGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow navigation if user has the required roles', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: ['admin', 'user'] };

    authService.hasAnyRole.and.returnValue(true);

    const result = guard.canActivate(route);

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /unauthorized if user does not have required roles', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: ['admin'] };

    authService.hasAnyRole.and.returnValue(false);

    const result = guard.canActivate(route);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });
});
