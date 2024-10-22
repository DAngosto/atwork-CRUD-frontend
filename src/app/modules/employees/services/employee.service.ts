import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../shared/services/auth.service';
import { CreateEmployeeRequest } from '../model/requests/create-employee-request';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private backendUrl: string = environment.backendUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  constructor() {}

  public getUserEmployees(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.backendUrl}/Employees/GetAllFromUser?userId=${this.authService.getUserId()}&page=${page}&size=${size}`,
    );
  }

  public createEmployee(request: CreateEmployeeRequest): Observable<Employee> {
    return this.httpClient.post<Employee>(
      `${this.backendUrl}/Employees`,
      request,
    );
  }
}
