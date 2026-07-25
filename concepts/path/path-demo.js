// The `node:` prefix marks this as a built-in module import unambiguously.
const path = require('node:path');

// __filename/__dirname come from the module wrapper, not the path module itself.
console.log('__filename:', __filename);
console.log('__dirname:', __dirname);

console.log('basename:', path.basename(__filename)); // file name with extension
console.log('extname:', path.extname(__filename)); // just the extension
console.log('isAbsolute:', path.isAbsolute(__filename)); // true for fully-qualified paths

// parse() breaks a path into its parts; format() does the reverse.
const parsed = path.parse(__filename);
console.log('parse:', parsed);
console.log('format:', path.format(parsed));

// join() concatenates segments; resolve() does the same but anchors to an absolute path.
console.log('join:', path.join(__dirname, '..', 'callbacks', 'synchronous.js'));
console.log('resolve:', path.resolve('concepts', 'path', 'path-demo.js'));
