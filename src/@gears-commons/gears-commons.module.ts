import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    CustomDataViewComponent,
    DataTableComponent,
    DataViewComponent,
    DateInputComponent,
    IconComponent,
    ImageInputComponent,
    MainFilterComponent,
    NoDataAvailableMessageComponent,
    NumberInputComponent,
    SearchInputComponent,
    SelectInputComponent,
    TextInputComponent
} from '@gears-commons/component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BreadcrumbComponent} from './component/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';
import {PageHeaderComponent} from './component/header/page-header/page-header.component';
import {PageContainerComponent} from './component/page-container/page-container.component';
import {DialogContainerComponent} from './component/dialog/dialog-container/dialog-container.component';
import {DialogHeaderComponent} from './component/dialog/dialog-header/dialog-header.component';
import {DialogContentComponent} from './component/dialog/dialog-content/dialog-content.component';
import {DialogFooterComponent} from './component/dialog/dialog-footer/dialog-footer.component';
import {ButtonComponent} from './component/buttons/button/button.component';
import {ActiveStatusChipComponent} from './component/chips/active-status-chip/active-status-chip.component';
import {MatChipsModule} from '@angular/material/chips';
import {
    AddViewEditMasterHeaderElementsComponent
} from './component/header/add-view-edit-master-header-elements/add-view-edit-master-header-elements.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AssignmentDataTableComponent} from './component/assignment-data-table/assignment-data-table.component';
import {DateTimeUtils} from '@gears-commons/utils/date-time-utils';
import {AlertComponent} from './component/alert/alert.component';
import {FuseAlertModule} from '../@fuse/components/alert';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, MatTooltipModule} from '@angular/material/tooltip';
import {RichTextInputComponent} from './component/inputs/rich-text-input/rich-text-input.component';
import {QuillModule} from 'ngx-quill';
import { DataLabelValueViewItemComponent } from './component/data-label-value-view-item/data-label-value-view-item.component';
import { DataLabelValueViewContainerComponent } from './component/data-label-value-view-container/data-label-value-view-container.component';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: DateTimeUtils.DISPLAY_DATE_FORMAT,
    },
    display: {
        dateInput: DateTimeUtils.DISPLAY_DATE_FORMAT,
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    },
};

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    hideDelay: 0,
    touchendHideDelay: 0,
    showDelay: 500,
    position: 'above'
};

@NgModule({
    declarations: [
        CustomDataViewComponent,
        DataTableComponent,
        DataViewComponent,
        TextInputComponent,
        ImageInputComponent,
        DateInputComponent,
        SelectInputComponent,
        IconComponent,
        SearchInputComponent,
        BreadcrumbComponent,
        PageHeaderComponent,
        PageContainerComponent,
        DialogContainerComponent,
        DialogHeaderComponent,
        DialogContentComponent,
        DialogFooterComponent,
        NoDataAvailableMessageComponent,
        ButtonComponent,
        ActiveStatusChipComponent,
        AddViewEditMasterHeaderElementsComponent,
        AssignmentDataTableComponent,
        MainFilterComponent,
        AlertComponent,
        NumberInputComponent,
        RichTextInputComponent,
        DataLabelValueViewItemComponent,
        DataLabelValueViewContainerComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        TranslocoModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatMenuModule,
        MatPaginatorModule,
        RouterModule,
        MatChipsModule,
        MatSlideToggleModule,
        FuseAlertModule,
        MatTooltipModule,
        QuillModule.forRoot()
    ],
    exports: [
        DataTableComponent,
        TextInputComponent,
        ImageInputComponent,
        DateInputComponent,
        SelectInputComponent,
        IconComponent,
        SearchInputComponent,
        BreadcrumbComponent,
        PageContainerComponent,
        PageHeaderComponent,
        DialogHeaderComponent,
        DialogContentComponent,
        DialogFooterComponent,
        DialogContainerComponent,
        ActiveStatusChipComponent,
        ButtonComponent,
        AddViewEditMasterHeaderElementsComponent,
        AssignmentDataTableComponent,
        NoDataAvailableMessageComponent,
        MainFilterComponent,
        NumberInputComponent,
        RichTextInputComponent,
        DataLabelValueViewItemComponent,
        DataLabelValueViewContainerComponent
    ],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
        {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
    ]
})
export class GearsCommonsModule {
}
