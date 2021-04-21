/**
 * Get Queries
 * @param {string} path
 * @returns {object}
 * @example
 * getQueries('/page?foo=bar&hello=world) -> { foo: 'bar', hello: 'world' }
 */
const getQueries = (path) => {
    const matched = [ ...path.matchAll(/(\?|\&)([^=]+)\=([^&]+)/g)];

    let queries = {};

    if (matched && matched.length > 0) {
        matched.forEach((match) => {
            const key = match[2];
            const value = match[3];
            queries[key] = value;
        })
    }

    return queries;
}

export default getQueries;