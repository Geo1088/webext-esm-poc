import TbModule from '../tbmodule.js';

/** A module that slaps a bagel on your page. */
export default new TbModule({
    name: 'Bagel',
    shortname: 'bagel',
    settings: {
        bagelType: {
            title: 'Bagel type',
            type: 'selector',
            values: [
                'Plain',
                'Sesame Seed',
                'Poppy Seed',
                'Onion',
                'Everything',
            ],
            default: 'Plain',
        }
    },
}, async function init ({bagelType}) {
    console.log(chrome, browser);
    let bagelImagePath;
    if (bagelType === 'Plain') {
        bagelImagePath = 'images/plain.png';
    } else if (bagelType === 'Sesame Seed') {
        bagelImagePath = 'images/sesame.png';
    } else if (bagelType === 'Poppy Seed') {
        bagelImagePath = 'images/poppy.png';
    } else if (bagelType === 'Onion') {
        bagelImagePath = 'images/onion.png';
    } else if (bagelType === 'Everything') {
        bagelImagePath = 'images/everything.png';
    }
    console.log(bagelImagePath);

    const bagel = document.createElement('img');
    bagel.setAttribute('src', browser.runtime.getURL(bagelImagePath));
    bagel.setAttribute('style', 'position: fixed; left: calc(50% - 200px); z-index: 2147483647; top: 200px;');
    document.body.append(bagel);
});
