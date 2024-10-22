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
  private loggedIn: boolean = localStorage.getItem('userToken') !== null;
  private userId: string = localStorage.getItem('userId') ?? '';
  private userRoles: string[] = [];

  private backendUrl: string = environment.backendUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

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

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.userRoles.includes(role));
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }

  getUserId(): string {
    return this.userId;
  }
}
