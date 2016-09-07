/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import fs from 'fs';
import appRoot from 'app-root-path';
import { SourceMapConsumer } from 'source-map';
import csso from 'postcss-csso';
import resin from '../src/lib/index.js';

const read = fs.readFileSync;

test('should generate correct output', t => {
  const expected = read('./expected/resin.expected.css', 'utf-8').toString().trim();
  const sourcePath = './fixtures/resin.test.css';
  return resin({
    css: read(sourcePath, 'utf-8'),
    src: sourcePath,
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
  const sourcePath = './fixtures/resin.test.css';
  return resin({
    css: read(sourcePath, 'utf-8'),
    src: sourcePath,
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
    sourcemap: true,
    sourcemapInline: false,
  }).then(result => {
    const actual = result.map;
    t.truthy(actual);
  });
});

test('should write to output file and use external sourcemap.', t => {
  const expected = read('./expected/resin.expected.css.map', 'utf-8').toString().trim();
  const output = appRoot.path;
  const sourcePath = `${output}/test/fixtures/resin.test.css`;
  return resin({
    css: read(sourcePath, 'utf-8'),
    src: sourcePath,
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
  const sourcePath = './fixtures/import.test.css';
  return resin({
    css: read(sourcePath, 'utf-8'),
    src: sourcePath,
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
  }).then(result => {
    const actual = result.css.trim();
    t.is(actual, expected);
  });
});

test('should generate sourcemap.', t => {
  const output = appRoot.path;
  const sourcePath = `${output}/test/fixtures/resin.test.css`;
  return resin({
    css: read(sourcePath, 'utf-8'),
    src: sourcePath,
    output: `${output}/test/expected/tmp/index.css`,
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
    sourcemap: true,
    sourcemapInline: false,
  }).then(result => {
    const map = new SourceMapConsumer(result.map.toString());
    const pos = map.originalPositionFor({ line: 41, column: 2 });
    const expected = {
      source: '../../fixtures/topcoat-utils.css',
      line: 68,
      column: 2,
      name: null,
    };
    t.deepEqual(pos, expected);
  });
});

test('should prepend imports', t => {
  const expected = read('./expected/import.expected.css', 'utf-8').toString().trim();
  const sourcePath = './fixtures/prepend.test.css';
  return resin({
    css: read(sourcePath, 'utf-8'),
    src: sourcePath,
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
    prepend: './fixtures/resin.test.css',
  }).then(result => {
    const actual = result.css.trim();
    t.is(actual, expected);
  });
});

test('should add additional plugins', t => {
  const expected = read('./expected/import.expected.min.css', 'utf-8').toString().trim();
  const sourcePath = './fixtures/prepend.test.css';
  return resin({
    css: read(sourcePath, 'utf-8'),
    src: sourcePath,
    namespace: 'topcoat',
    vars: true,
    extend: true,
    url: 'img/',
    prepend: ['./fixtures/resin.test.css'],
    plugins: csso(),
  }).then(result => {
    const actual = result.css.trim();
    t.is(actual, expected);
  });
});
