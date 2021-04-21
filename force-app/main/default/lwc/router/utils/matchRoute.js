/**
 * Match Route
 * @param {object} router
 * @param {string} router.path
 * @param {string[]} router.parts
 * @param {object} instance
 * @param {string} instance.path
 * @param {string[]} instance.parts
 * @returns {object} { isMatched<Boolean> [, params<object>] }
 */
const matchRoute = (router, instance) => {

    // Dynamic route params
    let params = {};

    if (router.path === instance.path) {
        return { isMatched: true }
    };

    if (router.parts.length !== instance.parts.length) {
        return { isMatched: false };
    }

    let i = 0;
    while (i < router.parts.length) {

        const routerPart = router.parts[i];
        const instancePart = instance.parts[i];

        if (routerPart !== instancePart) {
            if (instancePart.charAt(0) === ':') {
                params = {
                    ...params,
                    [instancePart.slice(1)]: routerPart
                }
            } else {
                return { isMatched: false };
                break;
            }
        }

        i++;
    }

    return {
        isMatched: true,
        params,
    };
}

export default matchRoute;