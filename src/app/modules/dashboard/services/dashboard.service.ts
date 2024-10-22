import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardData } from '../model/dashboard-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private backendUrl: string = environment.backendUrl;
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  public getDashboardData(userId: string): Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(
      `${this.backendUrl}/Dashboard/?userId=${userId}`,
    );
  }
}
