import {DataType, DisplayParameters, Validation} from '@gears-commons/models';

export class FormHeader {
    id: number;
    formId: number;
    key: string;
    label: string;
    dataType: DataType;
    custom: boolean;
    sortOrder: number;
    active: boolean;
    validations: Validation;
    displayParameters: DisplayParameters;
    tenantId?: number;
    widthPercentage?: number;
}
