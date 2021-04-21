import { LightningElement } from 'lwc';

// Utils
import { ROUTER_EVENTS } from 'c/router';

/**
 * TUI Router - Switch
 */
export default class Switch extends LightningElement {

    /**
     * Handle Slot Change
     * @param {object} event
     */
    handleSlotChange(event) {
        this.dispatchEvent(new CustomEvent(ROUTER_EVENTS.ROUTES_CONNECTED, {
            bubbles: true,
            composed: true,
            detail: {
                routes: event.target.assignedElements(),
            }
        }))
    }
}