import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';
import { from } from 'rxjs';
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {

private fb = inject(FormBuilder);
formUtils = FormsUtils;

myForm: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
  email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
  username: ['', [Validators.required, Validators.pattern(this.formUtils.notOnlySpacesPattern)]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', [Validators.required]],
},{
  validators:[
this.formUtils.isFieldOneEqualFieldTwo('password', 'confirmPassword')
  ]
}


);


// isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string){
//  return (FormGroup: AbstractControl) =>{
// const field1Value = FormGroup.get(fieldOne)?.value;
// const field2Value = FormGroup.get(fieldTwo)?.value;

// return field1Value === field2Value ? null :{passwordsNotEqual: true};

//  };
// }

onSumbit(){
  this.myForm.markAllAsTouched();
  console.log(this.myForm.value);
}

 }
