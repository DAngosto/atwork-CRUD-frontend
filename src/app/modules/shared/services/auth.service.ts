import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../model/requests/login-request';
import { Login } from '../model/login';
import { RegisterRequest } from '../model/requests/register-request';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //#region Services
  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  //#endregion Services

  //#region Signals
  //#endregion Signals

  //#region Properties
  private backendUrl: string = environment.backendUrl;
  private loggedIn: boolean = localStorage.getItem('userToken') !== null;
  private userId: string = localStorage.getItem('userId') ?? '';
  private userRoles: string[] = [];
  //#endregion Properties

  constructor() {}

  public login(email: string, password: string): void {
    const request = { email: email, password: password } as LoginRequest;
    this.httpClient
      .post<Login>(`${this.backendUrl}/Auth/login`, request)
      .subscribe({
        next: (data: Login) => {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userId', data.userId);
          this.userId = data.userId;
          this.loggedIn = true;
          this.router.navigate(['']);
        },
        error: (e: any) => {
          console.log(e);
        },
      });
  }

  public register(request: RegisterRequest): void {
    this.httpClient
      .post<Register>(`${this.backendUrl}/Auth/register`, request)
      .subscribe({
        next: (data: Register) => {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userId', data.userId);
          this.userId = data.userId;
          this.loggedIn = true;
          this.router.navigate(['']);
        },
        error: (e: any) => {
          console.log(e);
        },
      });
  }

  public logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.userId = '';
    this.userRoles = [];
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  public hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.userRoles.includes(role));
  }

  public getUserRoles(): string[] {
    return this.userRoles;
  }

  public getUserId(): string {
    return this.userId;
  }
}
