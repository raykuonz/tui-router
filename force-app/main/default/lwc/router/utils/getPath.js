/**
 * Get Path
 * @param {string} srcPath
 * @returns {string}
 * @example
 * getPath('') -> '/'
 * getPath('#/page') -> '/page'
 * getPath('#/page?foo=bar') -> '/page'
 */
const getPath = (srcPath) => {

    let path = srcPath.includes('?') ? srcPath.split('?')[0] : srcPath;

    if (!path) return '/';

    if (path.charAt(0) === '#') return path.slice(1);

    return path;
}

export default getPath;