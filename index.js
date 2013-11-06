
var rework = require('rework'),
    imprt  = require('rework-npm'),
    vars   = require('rework-vars'),
    read   = require('fs').readFileSync;

module.exports = function(options) {
    options  = options || {};
    var file = options.file,
        css;

    if(!file) {
      throw new Error('You must supply a file to process.');
    }

    css  = rework(read(file, 'utf8'))
              .use(imprt())
              .use(vars())
              .use(rework.colors())
              .use(rework.extend())
              .toString();

console.log(css);
};
