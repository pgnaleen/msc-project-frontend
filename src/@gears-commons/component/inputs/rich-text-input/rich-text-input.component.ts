import {Component, OnInit} from '@angular/core';
import {BaseInputComponent} from '@gears-commons/component/inputs/base-input-component';
import {ContentChange, QuillModules} from 'ngx-quill';

// // import Quill from 'quill';
// import ImageResize from 'quill-image-resize-module';
// import Quill from 'quill';
// Quill.register('modules/imageResize', ImageResize);

@Component({
    selector: 'gears-rich-text-input',
    templateUrl: './rich-text-input.component.html',
    styleUrls: ['./rich-text-input.component.scss']
})
export class RichTextInputComponent extends BaseInputComponent implements OnInit {

    modules: QuillModules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{'header': 1}, {'header': 2}],               // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                [{'direction': 'rtl'}],                         // text direction

                [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                [{'header': [1, 2, 3, 4, 5, 6, false]}],

                [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                [{'font': []}],
                [{'align': []}],

                ['clean'],                                         // remove formatting button

                ['link', 'image', 'video']               // link and image, video
            ]
        }
    };

    ngOnInit(): void {

    }

    contentChanged(contentChange: ContentChange): void {
        if (this.validations?.maxLength && contentChange.text.length - 1 > this.validations.maxLength) {
            this.formGroup.get(this.key).setErrors({
                ...this.formGroup.get(this.key).errors, maxlength: {
                    requiredLength: this.validations.maxLength,
                    actualLength: contentChange.text.length - 1
                }
            });
        }
    }
}
