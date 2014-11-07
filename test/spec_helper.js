jsdom = require('jsdom').jsdom;

require('node-jsx').install();

var document;
var window;
var navigator;

global.document = jsdom('<html><body></body></html>');
global.window = global.document.parentWindow;
global.navigator = global.window.navigator;

module.exports = global;
