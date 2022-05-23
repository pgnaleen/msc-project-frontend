import {FormHeader} from './form-header';

export interface FormUpdateRequest {
  fields: FormHeader[];
  removeIds: number[];
  customLabels: any[];
}
