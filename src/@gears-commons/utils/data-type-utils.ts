import {DataType} from '@gears-commons/models';

export class DataTypeUtils {

  static getHtmlDataType(dataType: DataType): string {
    if (dataType == null) {
      return 'text';
    }

    if (dataType.toLowerCase().startsWith('number')) {
      return 'number';
    }

    return dataType.toLowerCase();
  }

  static getDataTypeLabelKey(dataType: DataType): string {
    if (dataType == null) {
      return 'text';
    }

    if (dataType === 'NUMBER_INTEGER') {
      return 'integerNumber';
    }

    if (dataType === 'NUMBER_DECIMAL') {
      return 'decimalNumber';
    }

    return dataType.toLowerCase();
  }
}
