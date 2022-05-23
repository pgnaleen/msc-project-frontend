import {CustomFieldValue} from './custom-field-value';
import {BaseModel} from '@gears-commons/models/base-model';

export class Customizable extends BaseModel{
  customFields: CustomFieldValue[];
  contextAssignmentId: number;
}
