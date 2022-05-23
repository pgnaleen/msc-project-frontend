import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class GearsValidators {

    static threeDecimalPlaces(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null =>
            control.value ?
                new RegExp(/^\s*-?(\d+(\.\d{1,3})?|\.\d{1,3})\s*$/).test(control.value)
                    ? null : {decimal: {valid: false, expectedLength: 3}} : null;
    }

    static imageRequired(file: File): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => file == null ? {required: true} : null;
    }

    static fileType(file: File, allowedExtensions: string[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!file || !allowedExtensions || allowedExtensions.length === 0) {
                return null;
            }

            const fileExt = file.name.split('.').pop();

            const valid = allowedExtensions.includes(fileExt);

            return valid ? null : {
                fileType: {
                    valid: false,
                    expected: allowedExtensions,
                    provided: fileExt
                }
            };
        };
    }

    static fileMaxAllowedSize(file: File, maxAllowedSize: number | null): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!file || !maxAllowedSize || maxAllowedSize === 0) {
                return null;
            }

            const valid = file.size <= maxAllowedSize;

            return valid ? null : {
                fileMaxAllowedSize: {
                    valid: false,
                    expected: maxAllowedSize,
                    provided: file.size
                }
            };
        };
    }

    static telephone(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null =>
            control.value ?
                new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,13}$/im).test(control.value)
                    ? null : {telephone: {valid: false}} : null;
    }

    static email(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null =>
            control.value ?
                new RegExp(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).test(control.value)
                    ? null : {email: {valid: false}} : null;
    }

    static url(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null =>
            control.value ?
                new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi).test(control.value)
                    ? null : {url: {valid: false}} : null;
    }
}
