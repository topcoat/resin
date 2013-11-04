
var rework = require('rework'),
    imprt  = require('rework-import'),
    vars   = require('rework-vars'),
    read   = require('fs').readFileSync,
    css    = rework(read('node_modules/topcoat-button/src/topcoat-button.css', 'utf8'))
              .use(imprt('./node_modules'))
              .use(rework.extend())
              .toString();

console.log(css);

