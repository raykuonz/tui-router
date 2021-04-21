/**
 * Get Path Parts
 * @param {string} path
 * @returns {string[]}
 * @example
 * getPathParts('/page/subpage/subsubpage') -> ['page', 'subpage', 'subsubpage']
 */
const getPathParts = (path) => {
    if (path.charAt(0) === '#')  {
        if (path.charAt(1) === '/') {
            path = path.slice(2);
        } else {
            path = path.slice(1);
        }
    } else if (path.charAt(0) === '/') {
        path = path.slice(1);
    }
    return path.split('/').filter((part) => !!part);
}

export default getPathParts;