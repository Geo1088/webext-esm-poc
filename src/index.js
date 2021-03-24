import '../lib/webextension-polyfill@0.6.0/dist/browser-polyfill.min.js';

import {getKey} from './storage.js';

import Bagel from './modules/bagel.js';

const allModules = [
    Bagel,
]

/**
 * Returns whether the given module is enabled.
 * @param {TbModule} m
 * @returns {boolean}
 */
function moduleEnabled (m) {
    if (m.alwaysEnabled) return true;
    if (!getKey(`${m.shortname}.enabled`)) return false;
    if (m.beta && !getKey('core.beta')) return false;
    if (m.dev && !getKey('core.devmode')) return false;
    return true;
}

// Initialize all enabled modules
for (const m of allModules) {
    if (moduleEnabled(m)) {
        m.initialize();
    }
}
