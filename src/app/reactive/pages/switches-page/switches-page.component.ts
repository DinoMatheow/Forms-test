import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';
@Component({
  selector: 'app-switches-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPageComponent {
private fb = inject(FormBuilder);
formUtils = FormsUtils;



myForm :FormGroup = this.fb.group({
gender: [, [Validators.required]],
wantNotifications: [true],
termAndConditions: [false, Validators.requiredTrue],

});


onSumbit(){
  this.myForm.markAllAsTouched();
 console.log(this.myForm.value);
}

}
