import {ResponseMetaData} from './response-meta-data';
import {ErrorResponse} from './error-response';

export class Response<T> {
    static SUCCESS_CODE = 1000;

    static BAD_REQUEST = 4000;
    static NOT_FOUND = 4004;
    static INVALID_DATA_TYPE = 4002;
    static DUPLICATED_ENTRY = 4009;

    static DATA_REMOVING_ERROR = 5300;
    static DATA_SAVING_ERROR = 5100;
    static DATA_RETRIEVING_ERROR = 5200;
    static DATA_MAPPING_ERROR = 5400;

    statusCode: number;
    message: string;
    payload: T;
    errors?: ErrorResponse;
    metadata?: ResponseMetaData;

    get isSuccess(): boolean {
        return this.statusCode === Response.SUCCESS_CODE;
    }
}
