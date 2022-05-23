import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AddButtonComponent} from './components/add-button/add-button.component';
import {GearsCommonsModule} from '@gears-commons/gears-commons.module';
import {TranslocoModule} from '@ngneat/transloco';
import {AssignButtonComponent} from './components/assign-button/assign-button.component';
import {EditButtonComponent} from '@shared/components/edit-button/edit-button.component';
import {OkButtonComponent} from './components/ok-button/ok-button.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AssignComponentComponent} from '@shared/components/assign-component/assign-component.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';

@NgModule({
    declarations: [
        AddButtonComponent,
        AssignButtonComponent,
        EditButtonComponent,
        OkButtonComponent,
        AssignComponentComponent,
        SaveButtonComponent,
        FilterButtonComponent
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        GearsCommonsModule,
        TranslocoModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FuseScrollbarModule,

    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AddButtonComponent,
        AssignButtonComponent,
        EditButtonComponent,
        OkButtonComponent,
        AssignComponentComponent,
        SaveButtonComponent,
        FilterButtonComponent
    ]
})
export class SharedModule {
}
