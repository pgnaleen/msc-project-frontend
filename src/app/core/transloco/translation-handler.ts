import {SupportedLanguage} from '@gears-commons/models';

export class TranslationHandler {
    public static DEFAULT_LANGUAGE = 'EN';

    static getCurrentLanguage(): SupportedLanguage {
        const currentLanguage = localStorage.getItem('langObj');
        return currentLanguage != null ? JSON.parse(currentLanguage) as SupportedLanguage : null;
    }

    static setCurrentLanguage(language: SupportedLanguage): void {
        localStorage.setItem('langObj', JSON.stringify(language));
    }

    static getBrowserLanguage(): string {
        const browserLang = navigator.language != null ? navigator.language : TranslationHandler.DEFAULT_LANGUAGE;
        return (browserLang.split('-')[0]).toUpperCase();
    }
}
