var rework = require('rework'),
    imprt = require('rework-npm'),
    vars = require('rework-vars'),
    inherit = require('rework-inherit'),
    namespace = require('rework-namespace'),
    autoprefixer = require('autoprefixer'),
    read = require('fs-extra').readFileSync,
    exists = require('fs-extra').existsSync;

module.exports = function(options) {
    options = options || {};
    var src = options.src,
        dest = options.dest,
        license = options.license || '',
        ns = options.namespace || '',
        browsers = options.browsers || [],
        debug = options.debug || false,
        output;

    if (!exists(src)) {
        throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
    }

    output = rework(read(src, 'utf8'))
        .use(imprt())
        .use(vars())
        .use(rework.function({
            add: function(a,b) { return a + b; },
            subtract: function(a,b) { return a - b; },
            multiply: function(a,b) { return a * b; },
            divide: function(a,b) { return a / b;},
            floor: Math.floor,
            parseInt: function(a) { return parseInt(a,10); }
        }))
        .use(rework.colors())
        .use(inherit())
        .use(namespace(ns))
        .use(autoprefixer(browsers).rework)
        .toString({sourcemap: debug}).replace(/(\/\*\*[\s\S]*?(license)[\s\S]*?\*\/)([\s\t]*(\r\n|\n|\r))/gi, '');

    return license + output;
};
