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
        browsers = options.browsers || 'last 2 version',
        urlString = options.url || '',
        useVars = options.vars || false,
        useExtend = options.extend || false,
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
    output.use(dedupe());
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
      if(exists(license)) {
        output = read(license) + output;
      } else {
        throw new Error("Sorry, I couldn't find the license file. Make sure you supply a valid path.");
      }
    }

    return output;
};

