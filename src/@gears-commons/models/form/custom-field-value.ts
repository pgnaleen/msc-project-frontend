import {FormHeader} from './index';

export interface CustomFieldValue {
  id: number;
  key: string;
  dataType: string;
  value: string;
  header?: FormHeader;
}
