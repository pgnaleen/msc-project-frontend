import {CommonError} from './common-error';
import {FieldError} from './field-error';

export class ErrorResponse {
    commonErrors?: CommonError[];
    fieldErrors?: FieldError[];
}
