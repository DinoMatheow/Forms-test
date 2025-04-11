import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
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

  get favoriteGames() {
return this.myForm.get('favoriteGames') as FormArray;
 }

 isValidField(formArray: FormArray, index: number) {
  return formArray.controls[index].errors && formArray.controls[index].touched;

}
}