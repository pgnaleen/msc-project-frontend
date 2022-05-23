import {Component} from '@angular/core';
import {CommonEvents} from '@gears-commons/utils/common-events';
import {Direction} from '@angular/cdk/bidi/directionality';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    layoutDirection: Direction = 'ltr';

    constructor() {
        window.addEventListener(CommonEvents.LANGUAGE_CHANGED, (event: CustomEvent) => {
            this.layoutDirection = event.detail?.language?.rtl ? 'rtl' : 'ltr';
        });
    }
}
