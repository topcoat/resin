var rework = require('rework'),
    imprt = require('rework-npm'),
    dedupe = require('rework-deduplicate'),
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
        urlString = options.url || '',
        debug = options.debug || false,
        output;

    if (!exists(src)) {
        throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
    }

    output = rework(read(src, 'utf8'))
        .use(imprt())
        .use(vars())
        .use(dedupe())
        .use(rework.colors())
        .use(inherit())
        .use(rework.url(function(url) {
          return urlString + url;
        }))
        .use(namespace(ns))
        .use(autoprefixer(browsers).rework)
        .toString({sourcemap: debug}).replace(/(\/\*\*[\s\S]*?(license)[\s\S]*?\*\/)([\s\t]*(\r\n|\n|\r))/gi, '');

    return license + output;
};
