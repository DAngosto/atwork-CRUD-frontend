import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../shared/services/auth.service';
import { CreateEmployeeRequest } from '../model/requests/create-employee-request';
import { Employee } from '../model/employee';
import { UpdateEmployeeRequest } from '../model/requests/update-employee-request';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  //#region Services
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  //#endregion Services

  //#region Signals
  //#endregion Signals

  //#region Properties
  private backendUrl: string = environment.backendUrl;
  //#endregion Properties

  constructor() {}

  //#region Gets
  public getEmployee(employeeId: string): Observable<Employee> {
    return this.httpClient.get<Employee>(
      `${this.backendUrl}/Employees/?employeeId=${employeeId}`,
    );
  }

  public getUserEmployees(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.backendUrl}/Employees/GetAllFromUser?userId=${this.authService.getUserId()}&page=${page}&size=${size}`,
    );
  }
  //#endregion Gets

  //#region Posts
  public createEmployee(request: CreateEmployeeRequest): Observable<Employee> {
    return this.httpClient.post<Employee>(
      `${this.backendUrl}/Employees`,
      request,
    );
  }

  public deleteEmployees(employeeIds: string[]): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.backendUrl}/Employees/DeleteEmployees`,
      {
        EmployeeIds: employeeIds,
      },
    );
  }
  //#endregion Posts

  //#region Puts
  public updateEmployee(request: UpdateEmployeeRequest): Observable<Employee> {
    return this.httpClient.put<Employee>(
      `${this.backendUrl}/Employees`,
      request,
    );
  }
  //#endregion Puts

  //#region Deletes
  public deleteEmployee(employeeId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this.backendUrl}/Employees?employeeId=${employeeId}`,
    );
  }
  //#endregion Deletes
}
