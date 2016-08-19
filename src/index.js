import postcss from 'postcss';
import atImport from 'postcss-import';
import dedupe from 'postcss-deduplicate';
import vars from 'postcss-css-variables';
import inherit from 'postcss-inherit';
import namespace from 'postcss-add-namespace';
import autoprefixer from 'autoprefixer';
import url from 'postcss-url';
import fs from 'fs-extra';
import perfectionist from 'perfectionist';

const read = fs.readFileSync;
const exists = fs.existsSync;

export default function resin(options = {}) {
  const src = options.src;
  const inputCSS = read(src, 'utf8');
  // const license = options.license || '';
  const ns = options.namespace || '';
  const browsers = options.browsers || 'last 2 version';
  const urlPrefix = options.url || '';
  const useVars = options.vars || false;
  const useExtend = options.extend || false;
  // const debug = options.debug || false;

  if (!exists(src)) {
    throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
  }
  // const plugins = [];
  const plugins = [atImport({ skipDuplicates: false })];

    // output = rework(read(src, 'utf8'));
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
    plugins.push(url((urlString) =>
      urlPrefix + urlString
    ));
  }
  plugins.push(autoprefixer({ browsers }));
  plugins.push(perfectionist({ indentSize: 2, maxAtRuleLength: false, maxSelectorLength: 1 }));

  return postcss(plugins).process(inputCSS);
}
