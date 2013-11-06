
var rework = require('rework'),
    imprt  = require('rework-npm'),
    vars   = require('rework-vars'),
    read   = require('fs').readFileSync,
    css;

    css    = rework(read('./entry.css', 'utf8'))
              .use(imprt())
              .use(vars())
              .use(rework.colors())
              .use(rework.extend())
              .toString();

console.log(css);

