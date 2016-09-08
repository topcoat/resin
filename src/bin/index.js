#!/usr/bin/env node
/* eslint-disable no-console */
import program from 'commander';
import pkginfo from 'pkginfo';
import fs from 'fs';
import resin from '../lib/index.js';

pkginfo(module, 'version', 'description');

function list(val) {
  const result = val.replace(/(^(?:"|')?\[)|(](?:"|')?$)/g, '').split(',');
  return result.map((item) => item.trim().replace(/(^(?:"|')?)|((?:"|')?$)/g, ''));
}

program
  .description(module.exports.description)
  .usage('[options] <file>')
  .option('-v, --no-vars', 'Passing this flag will skip using the postcss-css-variables plugin.')
  .option('-e, --no-extend', 'Passing this flag will skip using the postcss-inherit plugin.')
  .option('-n, --namespace <namespace>', 'Namespace to use as a prefix for classes.', '')
  .option('-u, --urlprefix <prefix>', 'String to prepend to urls.', '')
  .option('-b, --browsers <browsers>', 'Browser string to pass to autoprefixer.', 'last 2 version')
  .option('-a, --no-autoprefixer', 'Passing this flag will disable autoprefixer.')
  .option('-d, --debug',
    `Enable sourcemaps, by default will add sourcemaps inline.
    It can also be set to "external" using --sourcemap-type.`)
  .option('-s, --external-sourcemap',
    'Output external sourcemap, must include --debug flag.')
  .option('-o, --output-path [filename]',
    'Where to write out, defaults to stdout if not specified.')
  .option('-p, --prepend <imports>',
    'Imports to prepend to the beginning of the css file before processing', list)
  .parse(process.argv);

const resinOptions = {};

if (program.debug) {
  resinOptions.sourcemap = true;
}

if (program.externalSourcemap) {
  resinOptions.sourcemapInline = false;
}

if (program.vars) {
  resinOptions.vars = true;
}
if (program.extend) {
  resinOptions.extend = true;
}
if (program.namespace) {
  resinOptions.namespace = program.namespace;
}
if (program.urlprefix) {
  resinOptions.url = program.urlprefix;
}
if (program.browsers) {
  resinOptions.browsers = program.browsers;
}
resinOptions.autoprefixer = program.autoprefixer;
if (program.outputPath) {
  resinOptions.output = program.outputPath;
}

if (program.prepend) {
  resinOptions.prepend = program.prepend;
}

resinOptions.src = program.args[0];
resinOptions.css = fs.readFileSync(resinOptions.src, 'utf-8');

resin(resinOptions).then((results) => {
  if (program.outputPath) {
    fs.writeFileSync(program.outputPath, results.css, 'utf8');
    console.log(`File ${program.outputPath} written.`);
    if (program.externalSourcemap) {
      fs.writeFileSync(`${program.outputPath}.map`, results.map, 'utf8');
      console.log(`File ${program.outputPath} written.`);
    }
  } else {
    console.log(results.css);
  }
}).catch(console.log);
