import { FormArray, FormGroup } from "@angular/forms";

export class FormsUtils {

  //regular expressions

   static isValidField( form: FormGroup, fieldName: string): boolean | null {
    return  (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched);

    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
      if(!form.controls[fieldName]) return null;

      const errors = form.controls[fieldName].errors ?? {};

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


static isValidFieldArray(formArray: FormArray, index: number) {
  return formArray.controls[index].errors && formArray.controls[index].touched;
}

static getFieldErrorInArray(FormArray: FormArray, index: number): string | null {
  if(!FormArray.controls[index]) return null;

  const errors = FormArray.controls[index].errors ?? {};

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





}