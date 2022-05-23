import {TranslocoService} from '@ngneat/transloco';
import {MatPaginatorIntl} from '@angular/material/paginator';

export class PaginatorIntl extends MatPaginatorIntl {

    constructor(private readonly translate: TranslocoService) {
        super();

        translate.events$.subscribe(value => {
            this.initLabels();
        });

        translate.langChanges$.subscribe(value => {
            this.initLabels();
        });
    }

    initLabels(): void {
        this.itemsPerPageLabel = this.translate.translate('material.pagination.itemsPerPage') + ':';
        this.nextPageLabel = this.translate.translate('material.pagination.nextPage');
        this.previousPageLabel = this.translate.translate('material.pagination.previousPage');
        this.firstPageLabel = this.translate.translate('material.pagination.firstPage');
        this.lastPageLabel = this.translate.translate('material.pagination.lastPage');
        this.changes.next();
    }

    getPaginatorIntl(): MatPaginatorIntl {
        this.initLabels();
        this.getRangeLabel = this.getRangeLabel.bind(this);
        return this;
    }

    getRangeLabel = (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
            return this.translate.translate('material.pagination.rangePageLabel1', {length});
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translate.translate('material.pagination.rangePageLabel2', {startIndex: startIndex + 1, endIndex, length});
    };
}
