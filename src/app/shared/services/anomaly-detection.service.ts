import {Injectable} from '@angular/core';
import {BaseCrudService} from '@gears-commons/services';
import {HttpClient} from '@angular/common/http';
import {AnomalyDetection} from '@shared/models/anomaly-detection';

@Injectable({
    providedIn: 'root'
})
export class AnomalyDetectionService extends BaseCrudService<AnomalyDetection> {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    getContextPath(): string {
        return 'anomaly-detections';
    }
}
