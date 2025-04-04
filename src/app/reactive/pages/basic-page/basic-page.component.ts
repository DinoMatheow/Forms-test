import { formatLimitDefinition } from './../../../../../node_modules/ajv-formats/src/limit';
import { reset } from './../../../../../node_modules/@colors/colors/index.d';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';
@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent {


   private fb = inject(FormBuilder);
   formUtils = FormsUtils;

   myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],     //validadeores sincronos -- validadores asincronos
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]


  })

// myForm = new FormGroup({
//     name: new FormControl(''),
//     price: new FormControl(0),
//     inStorage: new FormControl(0)
// })

isValidField(fieldName: string): boolean | null {
return  (this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched);

  }

  getFieldError(fieldName: string): string | null {

  if(!this.myForm.controls[fieldName]) return null;

const errors = this.myForm.controls[fieldName].errors ?? {};

for( const key of Object.keys(errors) ) {

  switch(key) {
    case 'required':
      return 'This field is required';
    case 'minlength':
      return `Minimun value of ${errors['minlength'].requiredLength} characters.`;
    case 'min':
      return `Minimun value of ${errors['min'].min} `;


  }
}
return null;
}

onSave(){

  if(this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }

  console.log(this.myForm.value);

this.myForm.reset({
  price: 0,
  inStorage: 0
})

}}