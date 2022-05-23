import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'app-log-anomaly-detection'},
    {
        path: 'app-log-anomaly-detection',
        loadChildren: (): Promise<any> => import('app/modules/masters/anomaly-detection/anomaly-detection-master.module').then(m => m.AnomalyDetectionMasterModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MastersRoutingModule {
}
