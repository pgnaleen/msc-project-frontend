import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {IconLib} from '@gears-commons/types/icon-lib';

@Component({
    selector: 'gears-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {

    @Input()
    placeholder;

    @Input()
    title;

    @Input()
    className = 'fuse-mat-no-subscript fuse-mat-rounded fuse-mat-dense w-full sm:w-72 mt-4 sm:mt-0';

    @Input()
    iconLib: IconLib = 'heroicons_solid';

    @Input()
    icon: string = 'search';

    @Input()
    debounce: number = 300;

    @Input()
    minLength: number = 2;

    @Input()
    htmlDataType: string = 'text';

    @Output()
    searchTextChange: EventEmitter<string> = new EventEmitter<string>();

    searchControl: FormControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor() {
    }

    @Input()
    set initialValue(value: any) {
        if (this.searchControl == null) {
            this.searchControl = new FormControl(value == null ? null : '' + value);
        } else {
            this.searchControl.setValue(value == null ? null : '' + value);
        }
    }

    ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll))
            .subscribe(value => {
                this.searchTextChange.emit(value && value.length >= this.minLength ? value : null);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
