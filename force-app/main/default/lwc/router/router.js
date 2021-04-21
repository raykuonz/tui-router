import { LightningElement } from 'lwc';

// Utils
import { getPath, getPathParts, getQueries, matchRoute, navigateTo, RouterMixin } from './utils/index';
import ROUTER_EVENTS from './constants/events';

// Export Utils
export { ROUTER_EVENTS, RouterMixin, navigateTo };

/**
 * TUI Router
 */
export default class Router extends RouterMixin(LightningElement) {

    // All route instance on the app
    routes = [];

    /**
     * Handle Hash Change
     * @description Handler for window.location.hash change event
     */
    handleHashChange = () => {

        const hashedPath = window.location.hash;
        const path = getPath(hashedPath);
        const parts = getPathParts(path);
        const queries = getQueries(hashedPath);

        this.setRouterState({
            path,
            parts,
            queries: {
                ...queries,
            }
        })

        this.notifyRoutes();
    }

    /**
     * Notify Routes
     * @description Notify all route instance when url changed and update the showing state
     */
    notifyRoutes() {

        let firstRouteMatched = false;
        let allMatchRoute = null; // All match route for fallback

        this.routes.forEach((route) => {

            if (!allMatchRoute && route.isAllMatch()) {
                allMatchRoute = route;
            }

            if (firstRouteMatched) {
                // Hide all the rest of the route instance after first route matched
                route.setShow(false);
                return;
            }

            // Check if the route instance is matched with the current url
            const { isMatched, params } = matchRoute(this.routerState, route.getState());

            if (isMatched) {
                firstRouteMatched = true;
                route.setShow(true);

                if (params) {
                    // Set the params state if the route has dynamic params
                    this.setRouterState({
                        params
                    })
                }
            } else {
                route.setShow(false);
            }
        });

        if (!firstRouteMatched && allMatchRoute) {
            // Show the fallback route if no match
            allMatchRoute.setShow(true);
        }
    }

    /**
     * Handle Routes Connected
     * @param {LWCComponents} event.target.detail.routes
     */
    handleRoutesConnected = ({ detail: { routes } }) => {
        this.routes = routes;
        this.notifyRoutes();
    }

    connectedCallback() {
        this.handleHashChange();
        window.addEventListener('hashchange', this.handleHashChange);
        this.template.addEventListener(ROUTER_EVENTS.ROUTES_CONNECTED, this.handleRoutesConnected);
    }
}