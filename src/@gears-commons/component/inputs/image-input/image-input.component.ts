import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Validators} from '@angular/forms';
import {GearsValidators} from '@gears-commons/validators';
import {TranslocoService} from '@ngneat/transloco';
import {BaseInputComponent} from '@gears-commons/component/inputs/base-input-component';
import {CommonEvents} from '@gears-commons/utils/common-events';

@Component({
    selector: 'gears-image-input',
    templateUrl: './image-input.component.html',
    styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent extends BaseInputComponent implements OnInit {

    @Output()
    imageSelected: EventEmitter<File> = new EventEmitter<File>();

    file: File;

    preview = 'assets/images/placeholders/image_placeholder.jpg';

    constructor(private translocoService: TranslocoService) {
        super();

        window.addEventListener(CommonEvents.LANGUAGE_CHANGED, (event: CustomEvent) => {
            if (this.formGroup != null) {
                const valid = this.formGroup.get(this.key).errors == null;
                this.setImageName(!valid, this.file);
            }
        });
    }

    ngOnInit(): void {
        this.initFormControl(this.file);
    }

    initFormControl(file?: File): boolean {
        this.setImageName(false, file);

        this.formGroup.get(this.key).clearValidators();

        if (!this.readOnly) {
            if (this.validations && this.validations.required) {
                this.formGroup.get(this.key).addValidators(GearsValidators.imageRequired(file));
                this.formGroup.get(this.key).addValidators(Validators.required);
            }

            if (this.validations && this.validations.allowedExtensions && this.validations.allowedExtensions.length > 0) {
                this.formGroup.get(this.key).addValidators(GearsValidators.fileType(file, this.validations.allowedExtensions));
            }

            if (this.validations && this.validations.maxLength && this.validations.maxLength > 0) {
                this.formGroup.get(this.key).addValidators(GearsValidators.fileMaxAllowedSize(file, this.validations.maxLength));
            }
        }

        this.formGroup.get(this.key).updateValueAndValidity();

        const valid = this.formGroup.get(this.key).errors == null;
        this.setImageName(!valid, file);
        return valid;
    }

    setImageName(errors: boolean, file?: File): void {
        let text = this.translocoService.translate('form.image.clickIconToSelectImg');

        if (this.readOnly) {
            text = file ? file.name : this.translocoService.translate('form.image.noImgAvailable');
        } else {
            text = !errors ? file ? file.name : text : text;
        }

        this.formGroup.get(this.key).setValue(text);
    }

    onFileSelected(event): void {
        // reportProgress
        const file: File = event.target.files[0];

        if (file) {
            const valid = this.initFormControl(file);

            if (!valid) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (e: any): void => {
                this.preview = e.target.result;
            };

            reader.readAsDataURL(file);

            this.file = file;
            this.imageSelected.emit(this.file);
        }
    }
}

