'use strict';

// Firefox doesn't support `import()` in content scripts. We can load our
// extension's module-based code by manually creating a `<script type="module">`
// and setting its `src` to the entrypoint of our code, but that method means
// that the code is no longer in the extension context and doesn't have
// access to necessary `browser` APIs.
// Relevant Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1536094
// More information: https://stackoverflow.com/q/48104433

import(browser.extension.getURL('src/index.js')).catch(console.error);

// Firefox-compatible method if `browser` APIs aren't needed:
// const script = document.createElement('script');
// script.setAttribute('type', 'module');
// script.setAttribute('src', browser.extension.getURL('src/index.js'));
// document.documentElement.append(script);
