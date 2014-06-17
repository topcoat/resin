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
        contents = options.contents,
        dest = options.dest,
        license = options.license || '',
        ns = options.namespace || '',
        browsers = options.browsers || [],
        urlString = options.url || '',
        debug = options.debug || false,
        plugins = options.use ? (Array.isArray(options.use) ? options.use : [options.use]) : [],
        output;

    if (!contents && !exists(src)) {
        throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
    }

    output = rework(src ? read(src, 'utf8') : contents)
        .use(imprt())
        .use(vars())
        .use(dedupe())
        .use(rework.colors())
        .use(inherit())
        .use(rework.url(function(url) {
          return urlString + url;
        }))
        .use(namespace(ns))
        .use(autoprefixer(browsers).rework);

    plugins.forEach(function(func) {
      output = output.use(func);
    });

    output = output.toString({sourcemap: debug}).replace(/(\/\*\*[\s\S]*?(license)[\s\S]*?\*\/)([\s\t]*(\r\n|\n|\r))/gi, '');

    return license + output;
};
