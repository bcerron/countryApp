import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.services';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private _countryService: CountryService) {
    
  }

  ngOnInit(): void {
    this.countries = this._countryService.cacheStoraged.byCapital.countries;
    this.initialValue = this._countryService.cacheStoraged.byCapital.term;
  }
  searchByCapital(term: string) {
    this.isLoading = true;
    this._countryService.searchByCapital(term).subscribe((result) => {
      this.countries = result;
      this.isLoading = false;
    });
  }
}
