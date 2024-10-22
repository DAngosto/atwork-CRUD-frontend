import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private backendUrl: string = environment.backendUrl;
  private httpClient: HttpClient = inject(HttpClient);

  public countries = signal<Country[]>([]);
  public countriesLoading = signal<boolean>(false);

  constructor() {}

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
}
