import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountryService } from '../../services/countries.services';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private _countryService: CountryService) {}

  ngOnInit(): void {
    this.countries = this._countryService.cacheStoraged.byCountry.countries;
    this.initialValue = this._countryService.cacheStoraged.byCountry.term;
  }
  searchByCountry(term: string) {
    this._countryService.searchByCountry(term).subscribe((result) => {
      this.countries = result;
    });
  }
}
