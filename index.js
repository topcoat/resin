var rework = require('rework'),
    imprt = require('rework-npm'),
    vars = require('rework-vars'),
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
        output;

    if (!exists(src)) {
        throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
    }

    output = rework(read(src, 'utf8'))
        .use(imprt())
        .use(vars())
        .use(rework.colors())
        .use(rework.extend())
        .use(namespace(ns))
        .use(autoprefixer(browsers).rework)
        .toString().replace(/(\/\*[\s\S]*?(license)[\s\S]*?\*\/)([\s\t]*(\r\n|\n|\r))/gi, '');

    return license + output;
};
