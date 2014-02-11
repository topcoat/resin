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
        license = options.license || '',
        ns = options.namespace || '',
        browsers = options.browsers || [],
        urlString = options.url || '',
        useVars = options.vars || true,
        useExtend = options.extend || true,
        debug = options.debug || false,
        output;

    if (!exists(src)) {
        throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
    }

    output = rework(read(src, 'utf8'));
    output.use(imprt());
    if(useVars) {
      output.use(vars());
    }
    if(useExtend) {
      output.use(inherit());
    }
    if(namespace) {
      output.use(namespace(ns));
    }
    if(urlString) {
      output.use(rework.url(function(url) {
        return urlString + url;
      }));
    }
    output.use(autoprefixer(browsers).rework);
    output = output.toString({sourcemap: debug}).replace(/(\/\*\*[\s\S]*?(license)[\s\S]*?\*\/)([\s\t]*(\r\n|\n|\r))/gi, '');

    if(license) {
      output = license + output;
    }

    return output;
};

