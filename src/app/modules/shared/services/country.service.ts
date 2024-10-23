import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  //#region Services
  private httpClient: HttpClient = inject(HttpClient);
  //#endregion Services

  //#region Signals
  public countries = signal<Country[]>([]);
  public countriesLoading = signal<boolean>(false);
  //#endregion Signals

  //#region Properties
  private backendUrl: string = environment.backendUrl;
  //#endregion Properties

  constructor() {}

  //#region Gets
  public getAllCountries() {
    this.countriesLoading.set(true);
    this.httpClient
      .get<Country[]>(`${this.backendUrl}/Shared/GetAllCountries`)
      .subscribe({
        next: (data: Country[]) => {
          this.countries.set(data);
          this.countriesLoading.set(false);
        },
        error: (e: any) => {
          console.log(e);
          this.countriesLoading.set(false);
        },
      });
  }
  //#endregion Gets

  //#region Posts
  //#endregion Posts

  //#region Puts
  //#endregion Puts

  //#region Deletes
  //#endregion Deletes
}
