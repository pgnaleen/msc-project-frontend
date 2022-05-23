/* eslint-disable */
import {Response} from '@gears-commons/models/response/response';
import {SupportedLanguage} from '@gears-commons/models';

export const langs: Response<SupportedLanguage[]> = {
    statusCode: Response.SUCCESS_CODE,
    message: 'Success',
    isSuccess: true,
    payload: [
        {
            name: 'English',
            code: 'EN',
            rtl: false,
            level: 1
        },
        {
            name: 'සිංහල',
            code: 'සිං',
            rtl: false,
            level: 2
        },
        {
            name: 'தமிழ்',
            code: 'த',
            rtl: false,
            level: 3
        }
    ]
};
