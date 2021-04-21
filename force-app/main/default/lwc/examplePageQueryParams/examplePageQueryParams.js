import { LightningElement } from 'lwc';

import { RouterMixin } from 'c/router';

export default class ExamplePageQueryParams extends RouterMixin(LightningElement) {

    get queries() {
        return JSON.stringify(this.routerQueries);
    }
}