import { LightningElement, api } from 'lwc';

import { navigateTo } from 'c/router';

export default class ExampleRouteLink extends LightningElement {
    @api to = '';

    handleClick() {
        navigateTo(this.to);
    }
}