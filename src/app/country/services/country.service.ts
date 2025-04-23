  import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryList } from '../interfaces/country.interfaces';
import { combineLatest, Observable, of } from 'rxjs';
  @Injectable({providedIn: 'root'})
  export class CountryService {

    private baseUrl = 'https://restcountries.com/v3.1';
    http = inject(HttpClient);


    private _region = [
      'Africa',
      'Americas',
      'Asia',
      'Europe',
      'Oceania'
    ]

    get regions(): string[]{
      return [...this._region];
    }

    getCountryByRegion(region: string): Observable<CountryList[]>
    {
      if(!region) return of([]);

      console.log(region);

      const url = `${this.baseUrl}/region/${region}?fields=name,borders,cca3`;
      return this.http.get<CountryList[]>(url);
    }

    getCountryByAlphaCode(code: string): Observable<CountryList>
    {

      const url = `${this.baseUrl}/alpha/${code}?fields=name,borders,cca3`;
      return this.http.get<CountryList>(url);
    }

    getCountryByBorder(borders: string[]): Observable<CountryList[]>{
        if (!borders || borders.length === 0) return of ([])

      const countriesRequest: Observable<CountryList>[] = [];
     borders.forEach(code => {
        const request = this.getCountryByAlphaCode(code);
        countriesRequest.push(request);
    })

       return combineLatest(countriesRequest);
  }

}