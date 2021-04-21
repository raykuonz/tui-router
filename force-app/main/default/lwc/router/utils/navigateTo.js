/**
 * Navigate To
 * @description Update window location hash
 * @param {string} path
 */
const navigateTo = (path) => {
    if (!path || typeof path !== 'string') return;
    window.location.hash = path === '/' ? '' : path;
}

export default navigateTo;