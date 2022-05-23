import {FormHeader} from './form-header';

export interface FormFieldUpdatedRequest {
  formField: FormHeader;
  useCustomLabels: boolean;
  customLabels: any[];
}
