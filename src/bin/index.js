#!/usr/bin/env node

import program from 'commander';
import pkginfo from 'pkginfo';

pkginfo(module, 'version', 'description');

program
  .version(module.exports.version)
  .description(module.exports.description)
  .option('-v, --no-vars', 'Passing this flag will skip using the postcss-css-variables plugin.')
  .option('-e, --no-extend', 'Passing this flag will skip using the postcss-inherit plugin.')
  .option('-n, --namespace [namespace]', 'Namespace to use as a prefix for classes.', '')
  .option('-u, --urlprefix [prefix]', 'String to prepend to urls.', '')
  .option('-b, --browsers [browsers]', 'Browser string to pass to autoprefixer.', 'last 2 version')
  .parse(process.argv);
