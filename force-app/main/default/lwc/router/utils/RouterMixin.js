/**
 * Router State
 */
let routerState = {};

/**
 * Router Subscribers
 */
let routerSubscribers = [];

/**
 * Set Router State
 * @param {object} nextState
 */
const setRouterState = (nextState) => {
    routerState = {
        ...routerState,
        ...nextState,
    };
    routerSubscribers.forEach((subscriberCallback) => {
        subscriberCallback(routerState);
    })
}

/**
 * Subscribe Router
 * @param {function} callback
 */
const subscribeRouter = (callback) => {
    const index = routerSubscribers.indexOf(callback);
    if (index >= 0) return;
    routerSubscribers.push(callback);
}

/**
 * Unsubscribe Router
 * @param {function} callback
 */
const unsubscribeRouter = (callback) => {
    const index = routerSubscribers.indexOf(callback);
    if (index < 0) return;
    routerSubscribers = [
        ...routerSubscribers.slice(0, index),
        ...routerSubscribers.slice(index + 1, routerSubscribers.length),
    ];
}

/**
 * Router State Mixin
 * @param {class} Base
 * @returns {class}
 */
const RouterStateMixin = (Base) => class extends Base {

    routerState = routerState; // Current Router State

    /**
     * Update Router State
     * @param {object} routerState
     */
    _updateRouterState = (routerState) => {
        if (this.template.isConnected) {
            // Update subscriber's state
            this.routerState = routerState;
        } else {
            // Unsubscribe subscriber if it's not connected to DOM
            this.disconnectRouter();
        }
    }

    /**
     * Set Router State
     * @param {object} nextState
     */
    setRouterState = (nextState) => {
        setRouterState(nextState);
    }

    /**
     * Connect Router
     */
    connectRouter() {
        subscribeRouter(this._updateRouterState);
    }

    /**
     * Disconnect Router
     */
    disconnectRouter() {
        unsubscribeRouter(this._updateRouterState);
    }
}

/**
 * RouterMixin
 * @param {class} Base
 * @returns {class}
 */
const RouterMixin = (Base) => class extends RouterStateMixin(Base) {
    constructor() {
        super();
        this.connectRouter(); // Connect to Router State
    }

    /**
     * Router Params
     * @returns {object}
     */
    get routerParams() {
        return { ...this.routerState.params };
    }

    /**
     * Router Queries
     * @returns {object}
     */
    get routerQueries() {
        return { ...this.routerState.queries };
    }
}

export default RouterMixin;