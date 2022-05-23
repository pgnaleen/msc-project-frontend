import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnomalyDetectionMasterRoutingModule} from './anomaly-detection-master-routing.module';
import {AnomalyDetectionListComponent} from './anomaly-detection-list/anomaly-detection-list.component';
import {SharedModule} from '@shared/shared.module';
import {TranslocoModule} from '@ngneat/transloco';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { AddViewEditAnomalyDetectionLogComponent } from './add-view-edit-anomaly-detection-log/add-view-edit-anomaly-detection-log.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {GearsCommonsModule} from '@gears-commons/gears-commons.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MasterCommonsModule} from '../master-commons/master-commons.module';


@NgModule({
    declarations: [
        AnomalyDetectionListComponent,
        AddViewEditAnomalyDetectionLogComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        AnomalyDetectionMasterRoutingModule,
        TranslocoModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatPaginatorModule,
        MatDialogModule,
        GearsCommonsModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MasterCommonsModule
    ]
})
export class AnomalyDetectionMasterModule {
}
