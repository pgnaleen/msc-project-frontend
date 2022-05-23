import {Customizable} from '@gears-commons/models';

export class StructureMaster extends Customizable {
    businessEntity?: string;
    name?: string;
    shortName?: string;
    code?: string;
    referenceId?: number;
    activeStatus?: boolean;
}
