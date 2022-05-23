import {IconLib} from '@gears-commons/types/icon-lib';

export class MenuItem {
    action: string;
    label?: string;
    icon?: string;
    iconLib?: IconLib;
    iconClass?: string;
    bgClass?: string;

    public static delete(): MenuItem {
        return {
            action: 'delete', label: 'delete', icon: 'trash-2', iconLib: 'feather',
            bgClass: 'bg-warn-100', iconClass: 'text-warn'
        };
    }

    public static view(): MenuItem {
        return {action: 'view', label: 'view', icon: 'eye', iconLib: 'feather'};
    }
}
