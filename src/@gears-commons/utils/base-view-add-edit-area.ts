import {translate} from '@ngneat/transloco';
import {CustomFieldValue, Customizable, FieldError, FormHeader, Response} from '@gears-commons/models';
import {BaseCrudService} from '@gears-commons/services';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {GearsValidators} from '@gears-commons/validators';
import {GearsAlertService} from '@gears-commons/services/gears-alert.service';
import {RootData} from '@gears-commons/models/root-data';
import {ActionMode} from '@gears-commons/types/action-mode';

export abstract class BaseViewAddEditArea<T extends Customizable, S extends BaseCrudService<T>> {

    title = '';
    headersMap: { [key: string]: FormHeader } = {};

    data: T = this.getEmptyDataObject();
    readOnly = true;

    public formGroup: FormGroup;

    rootData: RootData<T> = {};

    protected constructor(private _crudService: S, public _gearsAlertService: GearsAlertService) {
    }

    get activeStatus(): boolean {
        return this.formGroup && this.formGroup.get('activeStatus') && this.formGroup.get('activeStatus').value;
    }

    set activeStatus(status: boolean) {
        this.formGroup.get('activeStatus') && this.formGroup.get('activeStatus').setValue(status);
    }

    onRootDataInit(rootData: RootData<T>): void {
        this.rootData = rootData;

        this.initView();
        this.initCustomFields();
        this.initForm();
    }


    initCustomFields(): void {
        this.rootData.headers.filter(v => v.custom).forEach(header => {
            const emptyValue = this.rootData.mode === 'VIEW' ? '-' : '';
            const customFieldValue = this.data?.customFields.find(value => value.key === header.key);
            if (customFieldValue == null) {
                this.data?.customFields.push({
                    id: 0,
                    key: header.key,
                    dataType: header.dataType,
                    value: emptyValue,
                    header
                });
            } else {
                customFieldValue.header = header;
            }
        });

        this.data.customFields = this.data?.customFields?.sort((a, b) =>
            (a.header?.sortOrder == null ? 0 : a.header?.sortOrder) -
            (b.header?.sortOrder == null ? 0 : b.header?.sortOrder));
    }

    initForm(): void {
        this.headersMap = {};
        this.rootData.headers?.forEach(value => this.headersMap[value.key] = value);

        this.formGroup = new FormGroup({});
        this.formGroup.addControl('id', new FormControl(this.data.id || 0));
        this.setContextVariablesToForm();
        this.onFormGroupInit(this.formGroup);

        this.rootData.headers.forEach(formHeader => {
            this.formGroup.addControl(formHeader.key, new FormControl(this.determineValue(this.data, formHeader), this.createValidators(formHeader)));
        });
    }


    setContextVariablesToForm(): void {
    }

    onFormGroupInit(formGroup: FormGroup): void {

    }

    createValidators(formHeader: FormHeader): ValidatorFn[] {
        const validators = [];

        if (this.rootData.mode === 'VIEW') {
            return validators;
        }

        if (formHeader.dataType === 'EMAIL') {
            validators.push(GearsValidators.email());
        }

        if (formHeader.dataType === 'URL') {
            validators.push(GearsValidators.url());
        }

        if (formHeader.dataType === 'NUMBER_DECIMAL') {
            validators.push(GearsValidators.threeDecimalPlaces());
        }

        if (formHeader.dataType === 'TELEPHONE') {
            validators.push(GearsValidators.telephone());
        }

        if (!formHeader.validations) {
            return validators;
        }

        if (formHeader.validations.required) {
            validators.push(Validators.required);
        }

        if (formHeader.dataType !== 'IMAGE' && formHeader.dataType !== 'TEXT_RICH' && formHeader.validations.minLength && formHeader.validations.minLength > -1) {
            validators.push(Validators.minLength(formHeader.validations.minLength));
        }

        if (formHeader.dataType !== 'IMAGE' && formHeader.dataType !== 'TEXT_RICH' && formHeader.validations.maxLength && formHeader.validations.maxLength > 0) {
            validators.push(Validators.maxLength(formHeader.validations.maxLength));
        }

        return validators;
    }

    getVisibleFields(): CustomFieldValue[] {
        return this.data?.customFields.filter(value => value.header?.active);
    }

    createSaveRequest(): Observable<Response<T>> {
        return this._crudService.create(this.generateDataObjectToSave());
    }

    createUpdateRequest(): Observable<Response<T>> {
        return this._crudService.update(this.data.id, this.generateDataObjectToUpdate());
    }

    save(): void {
        if (!this.isValidToCreate()) {
            return;
        }

        this.createSaveRequest().subscribe({
            next: response => {
                this.data = response.payload;
                this._gearsAlertService.showSaveSuccessAlert(this.getComponent());
                this.onDataSaved();
            }, error: error => {
                this._gearsAlertService.onError(error, this.getComponent());
                this.handleValidationErrors(error.error.errors?.fieldErrors);
            }
        });
    }

    handleValidationErrors(fieldErrors: FieldError[]): void {
        if (fieldErrors == null || fieldErrors.length === 0) {
            return;
        }

        fieldErrors.forEach(fieldError => {
            this.formGroup.get(fieldError.field)
                .setErrors({
                    api: {
                        code: fieldError.code,
                        value: fieldError.value,
                        message: fieldError.message
                    }
                });
        });
    }

    update(): void {
        if (!this.isValidToUpdate()) {
            return;
        }

        this.createUpdateRequest().subscribe({
            next: response => {
                this.data = response.payload;
                this._gearsAlertService.showUpdateSuccessAlert(this.getComponent());
                this.onDataUpdated();
            }, error: error => {
                this._gearsAlertService.onError(error, this.getComponent());
                this.handleValidationErrors(error.error.errors?.fieldErrors);
            }
        });
    }

    submitButtonCLicked(): void {
        if (this.rootData.mode === 'ADD') {
            this.save();
        } else if (this.rootData.mode === 'EDIT') {
            this.update();
        }
    }

    protected getRawJsonRequest(): T {
        return  this.formGroup.getRawValue() as T;
    }

    protected getCrudService(): BaseCrudService<T> {
        return this._crudService;
    }

    protected isValidToCreate(): boolean {
        this.formGroup.markAllAsTouched();
        return this.formGroup.valid;
    }

    protected isValidToUpdate(): boolean {
        this.formGroup.markAllAsTouched();
        return this.formGroup.valid;
    }

    protected generatePageTitle(mode: ActionMode, data: T): string {
        if (this.rootData.mode === 'VIEW') {
            return translate('title.page.viewComponent', {component: this.getPageTitleComponent(data)});
        } else if (this.rootData.mode === 'ADD') {
            return translate('title.page.addComponent', {component: translate('component.' + this.getComponent())});
        } else if (this.rootData.mode === 'EDIT') {
            return translate('title.page.editComponent', {component: this.getPageTitleComponent(data)});
        }
    }

    abstract initView(): void;

    abstract onDataSaved(): void;

    abstract onDataUpdated(): void;

    abstract determineValue(data: any, formHeader: FormHeader): string;

    abstract generateDataObjectToSave(): any;

    abstract generateDataObjectToUpdate(): any;

    abstract getComponent(): string;

    abstract getEmptyDataObject(): T;

    abstract onDismissButtonClicked(): void;

    protected abstract getPageTitleComponent(data: T): string;
}
