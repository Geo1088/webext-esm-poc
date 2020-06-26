const LOCALSTORAGE_KEY = 'mydata';

// Load data from localstorage
let data = localStorage.getItem(LOCALSTORAGE_KEY);
if (data) {
    data = JSON.parse(data);
} else {
    data = {};
    setKey('bagel.bagelType', 'Plain');
}

/**
 * Gets the value of a storage key.
 * @param {string} key
 * @returns {any}
 */
export function getKey (key) {
    return data[key];
}

/**
 * Sets the value of the given storage key.
 * @param {string} key
 * @param {any} value
 */
export function setKey (key, val) {
    data[key] = val;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}