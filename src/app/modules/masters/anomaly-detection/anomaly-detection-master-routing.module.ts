import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnomalyDetectionListComponent} from './anomaly-detection-list/anomaly-detection-list.component';
import {AddViewEditAnomalyDetectionLogComponent} from './add-view-edit-anomaly-detection-log/add-view-edit-anomaly-detection-log.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AnomalyDetectionListComponent
    },
    {
        path: ':mode',
        component: AddViewEditAnomalyDetectionLogComponent
    },
    {
        path: ':mode/:id',
        component: AddViewEditAnomalyDetectionLogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnomalyDetectionMasterRoutingModule {
}
