import {Http, HTTP_PROVIDERS}               from '@angular/http';
import {Component, Injectable, provide}     from '@angular/core';
import {TRANSLATE_PROVIDERS, TranslateService,
        TranslatePipe, TranslateLoader,
        TranslateStaticLoader}              from 'ng2-translate/ng2-translate';
import {bootstrap}                          from '@angular/platform-browser-dynamic';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }),
    TranslateService
]);

@Component({
    selector: 'app',
    template: `
        <div>{{ 'HELLO' | translate:{value: param} }}</div>
    `,
    pipes: [TranslatePipe]
})
export class AppComponent {
    param: string = "world";

    constructor(translate: TranslateService) {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}