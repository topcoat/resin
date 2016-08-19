import postcss from 'postcss';
import atImport from 'postcss-import';
import dedupe from 'postcss-deduplicate';
import vars from 'postcss-css-variables';
import inherit from 'postcss-inherit';
import inheritParser from 'postcss-inherit-parser';
import namespace from 'postcss-add-namespace';
import autoprefixer from 'autoprefixer';
import url from 'postcss-url';
import fs from 'fs-extra';
import perfectionist from 'perfectionist';

const read = fs.readFileSync;

export default function resin(options = {}) {
  const src = options.src;
  const inputCSS = read(src, 'utf8');
  const ns = options.namespace || '';
  const browsers = options.browsers || 'last 2 version';
  const urlPrefix = options.url || '';
  const useVars = options.vars || false;
  const useExtend = options.extend || false;
  const debug = options.debug || false;

  const plugins = [atImport({ skipDuplicates: false })];

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
    plugins.push(url({url: (urlString) =>
      urlPrefix + urlString
    }));
  }
  plugins.push(autoprefixer({ browsers }));
  plugins.push(perfectionist({
    indentSize: 2,
    maxAtRuleLength: false,
    maxSelectorLength: 1,
    cascade: false,
  }));

  const processOptions = { parser: inheritParser };
  if(debug){
    processOptions.from = options.src;
    processOptions.to = null;
    processOptions.map = { inline: true };
  }

  return postcss(plugins).process(inputCSS, processOptions);
}
