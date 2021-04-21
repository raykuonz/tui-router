import { LightningElement, api } from 'lwc';

// Utils
import { RouterMixin } from 'c/router';

/**
 * TUI Router - Route
 * @param {string} path
 */
export default class Route extends LightningElement {

    routeState = {};
    show = false; // Show/hide page

    _isAllMatch = false;

    /**
     * Path
     * @param {string} val
     * @return {string}
     */
    @api
    get path() {
        return this.routeState.path;
    }
    set path(val) {
        try {
            if (!val || typeof val !== 'string') {
                new Error('Invalid path name');
            };
            if (val === '*') this._isAllMatch = true;
            // console.log('set path', val);
            this.initRouteState(val);
        } catch (error) {
            console.error('Route set path error', error);
        }
    }

    /**
     * Get State
     * @returns {object}
     */
    @api getState() {
        return this.routeState;
    }

    /**
     * Is All Match
     * @returns {boolean}
     */
    @api isAllMatch() {
        return this._isAllMatch;
    }

    /**
     * Set Show
     * @description Show/hide content
     * @param {boolean} bool
     */
    @api setShow(bool) {
        this.show = !!bool;
    }

    /**
     * Init Router State
     * @param {string} path
     */
    initRouteState(path) {
        let params = {}
        const parts = path.slice(1).split('/').filter((part) => {
            if (part.includes(':')) {
                params[part.slice(1)] = '';
            }
            return !!part;
        });
        this.routeState = {
            path,
            parts,
            params,
        }
    }

}