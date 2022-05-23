import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {take} from 'rxjs';
import {TranslocoService} from '@ngneat/transloco';
import {FuseNavigationService, FuseVerticalNavigationComponent} from '@fuse/components/navigation';
import {TranslationHandler} from '../../../core/transloco/translation-handler';
import {LanguageService} from '@gears-commons/services/language-service';
import {SupportedLanguage} from '@gears-commons/models';
import {CommonEvents} from '@gears-commons/utils/common-events';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: SupportedLanguage[];
    activeLang: SupportedLanguage;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService,
        private languageService: LanguageService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.languageService.getSupportedLanguages().subscribe(response => {
            this.availableLangs = response.payload;

            const availableLangs = this.availableLangs.map(lang => ({id: lang.code, label: lang.name}));
            this._translocoService.setAvailableLangs(availableLangs);
            const currentLanguage = TranslationHandler.getCurrentLanguage();

            if (currentLanguage != null) {
                this.setupLang(currentLanguage.code);
                this._translocoService.setActiveLang(currentLanguage.code);
            } else {
                const browserLanguage = TranslationHandler.getBrowserLanguage();
                this.setupLang(browserLanguage);
                this._translocoService.setActiveLang(browserLanguage);
                TranslationHandler.setCurrentLanguage(this.activeLang);
            }

            this._translocoService.langChanges$.subscribe(activeLang => {
                this.setupLang(activeLang);
                this._updateNavigation(activeLang);
            });
        });

        this._translocoService.events$.subscribe(activeLang => {
            this.setupLang(activeLang?.payload?.langName);
        });
    }

    setupLang(activeLang: string): void {
        this.activeLang = this.availableLangs.find(value => value.code.toLowerCase() === activeLang.toLowerCase());
        window.dispatchEvent(new CustomEvent(CommonEvents.LANGUAGE_CHANGED, {detail: {language: this.activeLang}}));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: SupportedLanguage): void {
        // Set the active lang
        this._translocoService.setActiveLang(lang.code);
        TranslationHandler.setCurrentLanguage(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the Project dashboard item and update its title
        const projectDashboardItem = this._fuseNavigationService.getItem('dashboards.project', navigation);
        if (projectDashboardItem) {
            this._translocoService.selectTranslate('Project').pipe(take(1))
                .subscribe(translation => {

                    // Set the title
                    projectDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the Analytics dashboard item and update its title
        const analyticsDashboardItem = this._fuseNavigationService.getItem('dashboards.analytics', navigation);
        if (analyticsDashboardItem) {
            this._translocoService.selectTranslate('Analytics').pipe(take(1))
                .subscribe(translation => {

                    // Set the title
                    analyticsDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
    }
}
