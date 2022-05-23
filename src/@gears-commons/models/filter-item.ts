export class FilterItem {
    id?: any;
    field?: string;
    label?: string;
    title?: string;
    type?: 'text' | 'number' | 'dropdown';
    options?: any[];
    displayField?: string;
    valueField?: string;
    readOnly?: boolean;
    translatable?: boolean;
    valueFieldType?: 'boolean' | 'string' | 'number';
    lookup?: boolean;

    public static activeStatus(): FilterItem {
        return {
            label: 'label.status',
            field: 'activeStatus',
            type: 'dropdown',
            displayField: 'label',
            valueField: 'value',
            valueFieldType: 'boolean',
            translatable: true,
            options: [
                {label: 'label.active', value: true},
                {label: 'label.inactive', value: false}
            ]
        };
    }
}
