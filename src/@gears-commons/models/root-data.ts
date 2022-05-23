import {ActionMode} from '@gears-commons/types/action-mode';
import {FormHeader} from '@gears-commons/models/form';

export class RootData<T> {
    mode?: ActionMode;
    headers?: FormHeader[];
    data?: T;
}
