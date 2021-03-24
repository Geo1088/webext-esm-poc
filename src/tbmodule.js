import {getKey, setKey} from './storage.js';

/** Represents an extension feature module. */
export default class TbModule {
    /**
     * Creates a feature module.
     * @param {object} options
     * @param {string} options.name The module's human-readable name
     * @param {string} options.shortname The module's internal name, used for settings keys and stuff
     * @param {boolean} options.enabledByDefault If false, the module will be disabled on clean installs
     * @param {boolean} options.alwaysEnabled If true, the module cannot be disabled
     * @param {boolean} options.beta If true, the module is only enabled in beta mode
     * @param {boolean} options.dev If true, the module is only enabled in dev mode
     * @param {object} options.settings Settings stuffs
     * @param {Function} [initFunction] Run when the page loads while the module is enabled, the module is passed as `this` and an object mapping setting names to values is the first argument
     */
    constructor ({
        name,
        shortname,
        enabledByDefault = true,
        alwaysEnabled = false,
        beta = false,
        dev = false,
        settings = {},
    } = {}, initFunction) {
        if (!name || !shortname) {
            throw new TypeError('modules must have a name and shortname');
        }
        this.name = name;
        this.shortname = shortname;
        this.enabledByDefault = enabledByDefault;
        this.alwaysEnabled = alwaysEnabled;
        this.beta = beta;
        this.dev = dev;
        this.settings = settings;
        this.initFunction = initFunction;
    }

    /** Calls the module's init function. */
    initialize () {
        if (!this.initFunction) {
            return;
        }
        const settingValues = {};
        for (const settingName of Object.keys(this.settings)) {
            settingValues[settingName] = this.getSetting(settingName);
        }
        this.initFunction.call(this, settingValues);
    }

    // TODO: handle types like maps and lists that aren't represented by JSON primitives in storage functions
 
    /**
     * Returns the value of a setting in this module.
     * @param {string} settingName
     */
    getSetting (settingName) {
        return getKey(`${this.shortname}.${settingName}`);
    }

    /**
     * Sets the value of a setting in this module.
     * @param {string} settingName
     * @param {any} value
     */
    setSetting (settingName, value) {
        return setKey(`${this.shortname}.${settingName}`, value);
    }
}
