import {
    Translation,
    TRANSLOCO_CONFIG,
    TRANSLOCO_LOADER,
    translocoConfig,
    TranslocoModule,
    TranslocoService
} from '@ngneat/transloco';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {environment} from 'environments/environment';
import {TranslocoHttpLoader} from 'app/core/transloco/transloco.http-loader';
import {TranslationHandler} from './translation-handler';

@NgModule({
    exports: [
        TranslocoModule
    ],
    providers: [
        {
            // Provide the default Transloco configuration
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                defaultLang: TranslationHandler.getCurrentLanguage()?.code || TranslationHandler.DEFAULT_LANGUAGE,
                fallbackLang: TranslationHandler.DEFAULT_LANGUAGE,
                reRenderOnLangChange: true,
                prodMode: environment.production
            })
        },
        {
            // Provide the default Transloco loader
            provide: TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader
        },
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide: APP_INITIALIZER,
            deps: [TranslocoService],
            useFactory: (translocoService: TranslocoService): any => (): Promise<Translation> => {
                const defaultLang = translocoService.getDefaultLang();
                translocoService.setActiveLang(defaultLang);
                return translocoService.load(defaultLang).toPromise();
            },
            multi: true
        }
    ]
})
export class TranslocoCoreModule {
}
