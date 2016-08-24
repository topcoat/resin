/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import fs from 'fs';
import appRoot from 'app-root-path';
import resin from '../src/lib/index.js';

const read = fs.readFileSync;

test('should generate correct output', t => {
  const expected = read('./expected/resin.expected.css', 'utf-8').toString().trim();
  return resin({
    src: './fixtures/resin.test.css',
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
  }).then(result => {
    const actual = result.css.trim();
    t.is(actual, expected);
  });
});

test('should not fail when passed a debug flag', t => {
  const expected = read('./expected/resin.debug.expected.css', 'utf-8').toString().trim();
  return resin({
    src: './fixtures/resin.test.css',
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
    sourcemap: true,
  }).then(result => {
    const actual = result.css.trim();
    t.is(actual, expected);
  });
});

test('should write to output file and use external sourcemap.', t => {
  const expected = read('./expected/resin.expected.css.map', 'utf-8').toString().trim();
  const output = appRoot.path;
  return resin({
    src: `${output}/test/fixtures/resin.test.css`,
    output: `${output}/test/expected/tmp/index.css`,
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
    sourcemap: true,
    sourcemapInline: false,
  }).then(result => {
    const actual = result.map.toString().trim();
    t.is(actual, expected);
  });
});

test('should import local files.', t => {
  const expected = read('./expected/import.expected.css', 'utf-8').toString().trim();
  return resin({
    src: './fixtures/import.test.css',
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
  }).then(result => {
    const actual = result.css.trim();
    t.is(actual, expected);
  });
});
