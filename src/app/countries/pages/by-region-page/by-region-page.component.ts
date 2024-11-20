import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountryService } from '../../services/countries.services';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css',
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private _countryService: CountryService) {}

  ngOnInit(): void {
    this.countries = this._countryService.cacheStoraged.byRegion.countries;
    this.selectedRegion = this._countryService.cacheStoraged.byRegion.region;
  }
  searchByRegion(region: Region) {
    this.selectedRegion = region;
    this._countryService.searchByRegion(region).subscribe((result) => {
      this.countries = result;
    });
  }
}
