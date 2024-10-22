import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../model/user';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl: string = environment.backendUrl;
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  public getUserData(userId: string): Observable<User> {
    return this.httpClient.get<User>(
      `${this.backendUrl}/Users/?userId=${userId}`,
    );
  }
}
