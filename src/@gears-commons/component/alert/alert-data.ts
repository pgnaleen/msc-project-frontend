import {IconLib} from '@gears-commons/types/icon-lib';
import {FuseAlertType} from '../../../@fuse/components/alert';

export interface AlertData {
    title?: string;
    message?: string;
    icon?: string;
    iconLib?: IconLib;
    type?: FuseAlertType;
}
