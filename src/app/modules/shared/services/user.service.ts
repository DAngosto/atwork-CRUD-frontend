import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../model/user';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
  public getUserData(userId: string): Observable<User> {
    return this.httpClient.get<User>(
      `${this.backendUrl}/Users/?userId=${userId}`,
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
