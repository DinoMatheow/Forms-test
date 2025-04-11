import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';
@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormsUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Dino game', Validators.required],
      ['Devil cry', Validators.required],
    ],
    Validators.minLength(3)
  )

  })

  newFavorite = new FormControl('', [Validators.required]);

  get favoriteGames() {
return this.myForm.get('favoriteGames') as FormArray;
 }

 isValidField(formArray: FormArray, index: number) {
  return formArray.controls[index].errors && formArray.controls[index].touched;

}

addFavorite() {
  if (this.newFavorite.invalid) return;
  const newFavorite = this.newFavorite.value;

  this.favoriteGames.push(this.fb.control(newFavorite, [Validators.required]));

  this.newFavorite.reset();
}
onDeleteFavorite(index: number) {
  this.favoriteGames.removeAt(index);
}

}