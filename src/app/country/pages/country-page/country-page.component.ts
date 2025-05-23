import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { JsonPipe } from '@angular/common';
import { CountryList } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<CountryList[]>([]);
  borders = signal<CountryList[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanup)=> {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanup(()=> {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChanged(){
    return this.myForm.get('region')!.valueChanges.pipe(
      tap(()=> this.myForm.get('country')!.setValue('')),
      tap(()=> this.myForm.get('border')!.setValue('')),
      tap(()=> {
          this.borders.set([]);
          this.countriesByRegion.set([]);
      }),
      switchMap((region)=> this.countryService.getCountryByRegion(region!))
    )
    .subscribe((countries)=> {
      this.countriesByRegion.set(countries);
    });
  }

  onCountryChanged(){
    return this.myForm.get('country')!.valueChanges.pipe(
      tap(()=> this.myForm.get('border')!.setValue('')),
      filter((value)=> value!.length > 0),
      switchMap((alphaCode)=>
        this.countryService.getCountryByAlphaCode(alphaCode!)
      ),
      switchMap((country)=> this.countryService.getCountryByBorder(country.borders))

    )
    .subscribe((borders)=> {
      this.borders.set(borders);
    });
  }
}





