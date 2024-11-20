import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
import { CacheStoraged } from '../interfaces/cache-storage.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiURL: string = 'https://restcountries.com/v3.1';
  public cacheStoraged: CacheStoraged = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { countries: [] },
  };

  constructor(private _httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStoraged));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStorage')) return;
    this.cacheStoraged = JSON.parse(localStorage.getItem('cacheStorage')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this._httpClient.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchByCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${capital}`;
    return this.getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStoraged.byCapital = {
            term: capital,
            countries: countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }
  searchByCountry(countryName: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${countryName}`;
    return this.getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStoraged.byCountry = {
            term: countryName,
            countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }
  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStoraged.byRegion = {
            region,
            countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  countryDetails(code: string): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${code}`;
    return this._httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
}
