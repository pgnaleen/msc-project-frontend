import {Component, OnInit} from '@angular/core';
import {BaseMasterListPage} from '../../master-commons/base-master-list-page';
import {AnomalyDetectionService} from '@shared/services';
import {MasterServiceWrapper} from '@shared/services/master-service-wrapper';
import {CommonEvents} from '@gears-commons/utils/common-events';
import {AnomalyDetectionFilter} from '@shared/models/anomaly-detection-filter';
import {AnomalyDetection} from '@shared/models/anomaly-detection';
import {FilterItem} from '@gears-commons/models/filter-item';

@Component({
    selector: 'sis-anomaly-detection-list',
    templateUrl: './anomaly-detection-list.component.html'
})
export class AnomalyDetectionListComponent extends BaseMasterListPage<AnomalyDetection, AnomalyDetectionFilter> implements OnInit {

    constructor(private anomalyDetectionService: AnomalyDetectionService,
                protected masterServiceWrapper: MasterServiceWrapper) {
        super(anomalyDetectionService, masterServiceWrapper);
    }

    ngOnInit(): void {

    }

    setContextVariablesToFilter(): void {
    }

    initFilterItems(): void {
        this.filterItems = [
        ];
    }

    public onAddButtonClicked(): void {
        this.executeAddNewAction();
    }

    protected getComponent(): string {
        return 'anomalyDetection';
    }

    protected getAddViewEditPath(): string {
        return '/masters/app-log-anomaly-detection' ;
    }

    protected onDataDeleted(deletedData: any): void {
        window.dispatchEvent(new Event(CommonEvents.CONTEXT_DATA_CHANGED));
    }

}
