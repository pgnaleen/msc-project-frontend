import {FormHeader} from './form/form-header';
import {ActionMode} from '@gears-commons/types/action-mode';

export interface DialogData {
  mode: ActionMode;
  headers?: FormHeader[];
  data?: any;
}
