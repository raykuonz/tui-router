import { LightningElement } from 'lwc';

import { RouterMixin } from 'c/router';

export default class ExamplePageDynamicRoute extends RouterMixin(LightningElement) {
    get params() {
        return JSON.stringify(this.routerParams);
    }
}