/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import fs from 'fs';
import nixt from 'nixt';
import pkginfo from 'pkginfo';
import appRoot from 'app-root-path';

pkginfo(module, 'version');
const read = fs.readFileSync;

test.before(() => {
  try {
    fs.mkdirSync('./expected/tmp/');
  } catch (e) {
    //
  }
});

test.after.always('cleanup', () => {
  fs.unlinkSync('./expected/tmp/index.css');
  fs.unlinkSync('./expected/tmp/index.css.map');
  fs.rmdirSync('./expected/tmp/');
});

test.cb('should display help', t => {
  nixt()
  .expect((result) => {
    t.true((result.stdout.trim().indexOf('Usage: rsn') >= 0));
  })
  .run('rsn --help')
  .end(t.end);
});

test.cb('should generate correct output', t => {
  nixt()
  .expect((result) => {
    const expected = read('./expected/resin.expected.css', 'utf-8').toString().trim();
    t.is(result.stdout.trim(), expected);
  })
  .run('rsn --namespace \'topcoat\' -u \'img/\' ./fixtures/resin.test.css')
  .end(t.end);
});

test.cb('should generate css with inline sourcemap', t => {
  nixt()
  .expect((result) => {
    t.regex(result.stdout.trim(), new RegExp('/*# sourceMappingURL=data:application/json;'));
  })
  .run('rsn --namespace \'topcoat\' -u \'img/\' -d ./fixtures/resin.test.css')
  .end(t.end);
});

test.cb('should generate css with external sourcemap', t => {
  const output = appRoot.path;
  nixt()
  .expect(() => {
    const expected = read('./expected/tmp/index.css.map', 'utf-8').toString().trim();
    const actual = read('./expected/resin.expected.css.map', 'utf-8').toString().trim();
    t.is(actual, expected);
  })
  .run(`rsn --namespace topcoat -u img/ -d -s --output-path="${output}/test/expected/tmp/index.css"
    ${output}/test/fixtures/resin.test.css`)
  .end(t.end);
});

test.cb('should import local file', t => {
  nixt()
  .expect((result) => {
    const expected = read('./expected/import.expected.css', 'utf-8').toString().trim();
    t.is(result.stdout.trim(), expected);
  })
  .run('rsn --namespace \'topcoat\' -u \'img/\' ./fixtures/import.test.css')
  .end(t.end);
});

test.cb('should prepend an import file', t => {
  nixt()
  .expect((result) => {
    const expected = read('./expected/import.expected.css', 'utf-8').toString().trim();
    t.is(result.stdout.trim(), expected);
  })
  .run(`rsn --namespace 'topcoat' -u 'img/'
  --prepend ['./fixtures/resin.test.css'] ./fixtures/prepend.test.css`)
  .end(t.end);
});

test.cb('should report error when variable not found (and no default is set)', t => {
  nixt()
  .expect((result) => {
    t.regex(result.stdout.trim(), /^Error: Cannot find module/);
  })
  .run('rsn --prepend [\'./does-not-exist.css\'] ./fixtures/prepend.test.css')
  .end(t.end);
});
