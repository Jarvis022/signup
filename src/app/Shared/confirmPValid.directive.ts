import { Validator } from '@angular/forms';

export class confirmPvalidator implements Validator{
    validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
        throw new Error("Method not implemented.");
    }    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }


}