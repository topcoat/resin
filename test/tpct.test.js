var tpct = require('..'),
    assert = require('assert'),
    read = require('fs').readFileSync;

describe('tpct', function() {
    it('should generate correct output', function() {
        tpct({
            src: 'test/fixtures/tpct.test.css',
            dest: 'tmp/tpct.css'
        });

        var actual = read('tmp/tpct.css'),
            expected = read('test/expected/tpct.expected.css', 'utf-8').toString();
        assert(actual, expected, 'Generated output should match expected file');
    });

    it('should throw error when no input file is supplied', function() {
        assert.throws(function() {
            tpct({
                src: '',
                dest: 'tmp/tpct.css'
            });
        }, Error);
    });

    it('should import from node_modules', function() {
        tpct({
            src: 'test/fixtures/tpct.import.test.css',
            dest: 'tmp/tpct.import.css'
        });

        var actual = read('tmp/tpct.import.css'),
            expected = read('test/expected/tpct.import.expected.css', 'utf-8').toString();
        assert(actual, expected, 'Generated output should match expected file');
    });
});
