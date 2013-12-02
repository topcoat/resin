var rework = require('rework'),
    imprt = require('rework-npm'),
    vars = require('rework-vars'),
    color = require('rework-color'),
    namespace = require('rework-namespace'),
    autoprefixer = require('autoprefixer'),
    read = require('fs-extra').readFileSync,
    write = require('fs-extra').writeFileSync,
    exists = require('fs-extra').existsSync;

module.exports = function(options) {
    options = options || {};
    var src = options.src,
        dest = options.dest,
        license = options.license || '',
        ns = options.namespace || '',
        browsers = options.browsers || [],
        regex = new RegExp(license, 'g'),
        output;

    if (!exists(src)) {
        throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
    }

    output = rework(read(src, 'utf8').replace(regex,''))
        .use(imprt())
        .use(vars())
        .use(color())
        .use(rework.colors())
        .use(rework.extend())
        .use(namespace(ns))
        .use(autoprefixer(browsers).rework)
        .toString();

    return output;
};
