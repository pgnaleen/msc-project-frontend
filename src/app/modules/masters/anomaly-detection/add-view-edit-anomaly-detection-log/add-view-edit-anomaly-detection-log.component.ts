import {Component, OnInit} from '@angular/core';
import {FormHeader} from '@gears-commons/models/form';
import {FormDataUtils} from '@gears-commons/utils/form-data-utils';
import {AnomalyDetectionService} from '@shared/services';
import {BaseViewAddEditPage} from '@gears-commons/utils/generic-view-add-edit-page';
import {ViewAddEditPageServiceWrapper} from '@shared/services/view-add-edit-page-service-wrapper';
import {ActivatedRoute} from '@angular/router';
import {CommonEvents} from '@gears-commons/utils/common-events';
import {AnomalyDetection} from '@shared/models/anomaly-detection';

@Component({
    selector: 'sis-add-view-edit-anomaly-detection',
    templateUrl: './add-view-edit-anomaly-detection-log.component.html'
})
export class AddViewEditAnomalyDetectionLogComponent extends BaseViewAddEditPage<AnomalyDetection, AnomalyDetectionService> implements OnInit {

    constructor(anomalyDetectionService: AnomalyDetectionService,
                private route: ActivatedRoute,
                protected viewAddEditServiceWrapper: ViewAddEditPageServiceWrapper) {
        super(anomalyDetectionService, route, viewAddEditServiceWrapper);
    }

    ngOnInit(): void {
    }

    determineValue(data: any, formHeader: FormHeader): string {

        return this.data[formHeader.key];
    }

    getEmptyDataObject(): AnomalyDetection {
        const uni = new AnomalyDetection();
        uni.id = null;
        return uni;
    }

    getComponent(): string {
        return 'anomalyDetection';
    }

    generateDataObjectToSave(): any {
        return this.generateReq();
    }

    generateDataObjectToUpdate(): any {
        return this.generateReq();
    }

    setContextVariablesToForm(): void {
    }

    generateReq(): FormData {
        const req: AnomalyDetection = this.getRawJsonRequest();

        const reqFormData = FormDataUtils.convertToFormData(req);

        return reqFormData;
    }

    onDataSaved(): void {
        this.viewAddEditServiceWrapper.router.navigate(['../'], {relativeTo: this.route});
        window.dispatchEvent(new Event(CommonEvents.CONTEXT_DATA_CHANGED));
    }

    onDataUpdated(): void {
        this.viewAddEditServiceWrapper.router.navigate(['../../'], {relativeTo: this.route});
        window.dispatchEvent(new Event(CommonEvents.CONTEXT_DATA_CHANGED));
    }

    protected getPageTitleComponent(data: AnomalyDetection): string {
        return data.datasetCode;
    }

    protected getBreadcrumbTitleComponent(data: AnomalyDetection): string {
        return data.datasetCode;
    }
}
