import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {FuseFullscreenModule} from '@fuse/components/fullscreen';
import {FuseLoadingBarModule} from '@fuse/components/loading-bar';
import {FuseNavigationModule} from '@fuse/components/navigation';
import {LanguagesModule} from 'app/layout/common/languages/languages.module';
import {UserModule} from 'app/layout/common/user/user.module';
import {SharedModule} from '@shared/shared.module';
import {DenseLayoutComponent} from 'app/layout/dense/dense.component';
import {CoreModule} from '../../core/core.module';

@NgModule({
    declarations: [
        DenseLayoutComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseFullscreenModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        LanguagesModule,
        UserModule,
        SharedModule,
        CoreModule
    ],
    exports: [
        DenseLayoutComponent
    ]
})
export class DenseLayoutModule {
}
