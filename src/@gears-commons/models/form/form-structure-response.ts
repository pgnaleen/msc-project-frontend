import {FormHeader} from './form-header';

export interface FormStructureResponse {
  id: number;
  descriptor: string;
  name: string;
  group: string;
  status: string;
  headers: FormHeader[];
}
