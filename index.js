var rework = require('rework'),
    imprt = require('rework-npm'),
    vars = require('rework-vars'),
    autoprefixer = require('autoprefixer'),
    read = require('fs-extra').readFileSync,
    write = require('fs-extra').writeFileSync;

module.exports = function(options) {
    options = options || {};
    var src = options.src,
        dest = options.dest,
        browsers = options.browsers || [],
        output;

    if (!src) {
        throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
    }

    output = rework(read(src, 'utf8'))
        .use(imprt())
        .use(vars())
        .use(rework.colors())
        .use(rework.extend())
        .use(autoprefixer(browsers).rework)
        .toString();

    write(dest, output);
};
