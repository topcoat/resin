var resin = require('..'),
    assert = require('assert'),
    read = require('fs').readFileSync,
    mkdirp = require('mkdirp');

describe('resin', function() {

    before(function() {
        mkdirp.sync('tmp');
    });


    it('should generate correct output', function() {
        resin({
            src: 'test/fixtures/resin.test.css',
            dest: 'tmp/resin.css'
        });

        var actual = read('tmp/resin.css').toString().trim(),
            expected = read('test/expected/resin.expected.css', 'utf-8').toString().trim();
        assert.equal(actual, expected, 'Generated output should match expected file');
    });

    it('should throw error when no input file is supplied', function() {
        assert.throws(function() {
            resin({
                src: '',
                dest: 'tmp/resin.css'
            });
        }, Error);
    });

    it('should import from node_modules', function() {
        resin({
            src: 'test/fixtures/resin.import.test.css',
            dest: 'tmp/resin.import.css'
        });

        var actual = read('tmp/resin.import.css').toString().trim(),
            expected = read('test/expected/resin.import.expected.css', 'utf-8').toString().trim();

        assert.equal(actual, expected, 'Generated output should match expected file');
    });

});
