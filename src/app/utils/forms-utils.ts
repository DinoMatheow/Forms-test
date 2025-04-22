import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormsUtils {

  //regular expressions
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors){
    for( const key of Object.keys(errors) ) {

      switch(key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Minimun value of ${errors['minlength'].requiredLength} characters.`;
        case 'min':
          return `Minimun value of ${errors['min'].min} `;
          case 'email':
            return 'The email is not valid  ';
          case 'pattern':
            if(errors['pattern'].requiredPattern  === FormsUtils.emailPattern){
             return 'The email is not valid';
            }
      return 'Error of pattern against regular expression';
      default:
        return 'This field is not valid';


      }
    }
    return null;
  }

   static isValidField( form: FormGroup, fieldName: string): boolean | null {
    return  (!!form.controls[fieldName].errors && form.controls[fieldName].touched);

    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
      if(!form.controls[fieldName]) return null;

      const errors = form.controls[fieldName].errors ?? {};

      return FormsUtils.getTextError(errors);

}


static isValidFieldArray(formArray: FormArray, index: number) {
  return formArray.controls[index].errors && formArray.controls[index].touched;
}

static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
  if(formArray.controls.length === 0) return null;

  const errors = formArray.controls[index].errors ?? {};

  return FormsUtils.getTextError(errors);
}

static isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string){
  return (FormGroup: AbstractControl) =>{
 const field1Value = FormGroup.get(fieldOne)?.value;
 const field2Value = FormGroup.get(fieldTwo)?.value;

 return field1Value === field2Value ? null :{passwordsNotEqual: true};

  };
 }





}