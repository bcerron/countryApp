import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/countries.services';
import { Country } from '../../interfaces/countries.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent implements OnInit {
  public countryPage?: Country;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _countriesService: CountryService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ isoCountry }) =>
          this._countriesService.countryDetails(isoCountry)
        )
      )
      .subscribe((country) => {
        if (!country) {
          return this._router.navigateByUrl('');
        }
        this.countryPage = country;
        return;
      });
  }
}
