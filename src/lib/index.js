import postcss from 'postcss';
import atImport from 'postcss-npm';
import dedupe from 'postcss-deduplicate';
import vars from 'postcss-css-variables';
import inherit from 'postcss-inherit';
import namespace from 'postcss-add-namespace';
import autoprefixer from 'autoprefixer';
import url from 'postcss-url';
import fs from 'fs-extra';
import path from 'path';
import perfectionist from 'perfectionist';

const read = fs.readFileSync;

const converToArray = (thing) => {
  if (!thing) return thing;
  if (Array.isArray(thing)) return thing;
  return [thing];
};

export default function resin(options = {}) {
  const src = options.src || false;
  const inputCSS = options.rawcss || read(src, 'utf8');
  const output = options.output || false;
  const ns = options.namespace || '';
  const browsers = options.browsers || 'last 2 version';
  const urlPrefix = options.url || '';
  const useVars = options.vars || false;
  const useExtend = options.extend || false;
  const sourcemap = options.sourcemap || false;
  const prepend = converToArray(options.prepend) || false;
  const additionalPlugins = options.plugins || false;
  let inline = true;

  if ({}.hasOwnProperty.call(options, 'sourcemapInline')) {
    inline = options.sourcemapInline;
  }

  const importOptions = {};
  if (prepend) {
    importOptions.prepend = prepend;
  }

  const plugins = [atImport(importOptions)];

  if (useVars) {
    plugins.push(vars());
  }
  plugins.push(dedupe());
  if (useExtend) {
    plugins.push(inherit());
  }
  if (namespace) {
    plugins.push(namespace(ns));
  }
  if (urlPrefix) {
    plugins.push(url({ url: (urlString) =>
      `${urlPrefix}${urlString}`,
    }));
  }
  plugins.push(autoprefixer({ browsers }));
  plugins.push(perfectionist({
    indentSize: 2,
    maxAtRuleLength: false,
    maxSelectorLength: 1,
    cascade: false,
  }));

  if (additionalPlugins) {
    plugins.push(...converToArray(additionalPlugins));
  }
  const processOptions = {};
  if (src) {
    processOptions.from = path.resolve(src);
  }
  if (output) {
    processOptions.to = path.resolve(output);
  }
  if (sourcemap) {
    processOptions.map = { inline };
  }

  return postcss(plugins).process(inputCSS, processOptions);
}
