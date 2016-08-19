import test from 'ava';
import fs from 'fs';
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
