import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardData } from '../model/dashboard-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  //#region Services
  private httpClient: HttpClient = inject(HttpClient);
  //#endregion Services

  //#region Signals
  //#endregion Signals

  //#region Properties
  private backendUrl: string = environment.backendUrl;
  //#endregion Properties

  constructor() {}

  //#region Gets
  public getDashboardData(userId: string): Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(
      `${this.backendUrl}/Dashboard/?userId=${userId}`,
    );
  }
  //#endregion Gets

  //#region Posts
  //#endregion Posts

  //#region Puts
  //#endregion Puts

  //#region Deletes
  //#endregion Deletes
}
