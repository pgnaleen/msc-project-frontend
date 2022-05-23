import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MasterPageHeaderComponent} from './master-page-header/master-page-header.component';
import {GearsCommonsModule} from '@gears-commons/gears-commons.module';
import {SharedModule} from '@shared/shared.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
    declarations: [
        MasterPageHeaderComponent
    ],
    exports: [
        MasterPageHeaderComponent
    ],
    imports: [
        CommonModule,
        GearsCommonsModule,
        SharedModule,
        TranslocoModule
    ]
})
export class MasterCommonsModule {
}
