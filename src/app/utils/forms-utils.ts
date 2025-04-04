import { FormGroup } from "@angular/forms";

export class FormsUtils {

   static isValidField( form: FormGroup, fieldName: string): boolean | null {
    return  (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched);

    }



}